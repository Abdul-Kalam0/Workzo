import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const fields = {
      name: "Name is required.",
      email: "Email is required.",
      password: "Password is required.",
    };

    const missingFields = Object.keys(fields).filter((key) => !req.body[key]);
    // console.log(missingFields);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Input.",
        errors: missingFields.map((k) => fields[k]),
      });
    }

    if (name && email && password) {
      //Name validation
      if (typeof name !== "string" || name.length < 4) {
        return res.status(400).json({
          success: false,
          message: "Invalid name. Name must be at least 4 characters.",
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (typeof email !== "string" || !emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format.",
        });
      }

      //Password validation
      if (typeof password !== "string" || password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 8 characters long.",
        });
      }
    }

    //checking for duplicacy
    const existingUser = await UserModel.findOne({ email: email.trim() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exist. Try another email.",
        existingUser,
      });
    }

    //creating password hash
    const passwordHash = await bcrypt.hash(password, 10);

    //creating new user
    const newUser = await UserModel({
      name: name.trim(),
      email: email.trim(),
      password: passwordHash,
    });

    await newUser.save();

    //sending response
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.user,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    //Password validation
    if (!password || typeof password !== "string" || password.length < 8) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    //Find user from the db.
    const user = await UserModel.findOne({ email: email.trim() });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    //matching hash password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    //Generating JWT Token
    const tokenPayload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: "7d",
    });

    //Store token in httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "loggin successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the authentication cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const profile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      messgae: "Profile fetched succesfully.",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};
