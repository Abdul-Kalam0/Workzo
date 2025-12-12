import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

import authRoutes from "./routes/authRoutes.js";

//EXPRESS MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//USER MIDDLEWARES
app.use("/auth", authRoutes);

export default app;
