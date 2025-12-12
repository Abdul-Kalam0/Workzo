import express from "express";
import { login, registerUser } from "../controllers/authControlles.js";

const router = express.Router();

//signup
router.post("/signup", registerUser);

//login
router.post("/login", login);

export default router;
