import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

//EXPRESS MIDDLEWARES
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use(cookieParser());

//USER MIDDLEWARE
app.use("/auth", authRoutes);

//TASK MIDDLEWARE
app.use("/", taskRoutes);

//PROJECT MIDDLEWARE
app.use("/", projectRoutes);

//TEAM MIDDLEWARE
app.use("/", teamRoutes);

//TAG MIDDLEWARE
app.use("/", tagRoutes);

//REPORT MIDDLEWARE
app.use("/report", reportRoutes);

export default app;
