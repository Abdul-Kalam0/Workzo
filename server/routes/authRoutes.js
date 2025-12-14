import express from "express";
import {
  login,
  logout,
  profile,
  registerUser,
} from "../controllers/authControlles.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//signup
router.post("/signup", registerUser);

//login
router.post("/login", login);

//logout
router.post("/logout", logout);

//User
router.get("/me", verifyToken, profile);

export default router;
