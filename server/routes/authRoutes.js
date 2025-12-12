import express from "express";
import { login, logout, registerUser } from "../controllers/authControlles.js";

const router = express.Router();

//signup
router.post("/signup", registerUser);

//login
router.post("/login", login);

//logout
router.post("/logout", logout);

export default router;
