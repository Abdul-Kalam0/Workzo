import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

//EXPRESS MIDDLEWARES
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//USER MIDDLEWARES
app.use("/auth", authRoutes);

//TASK MIDDLEWARES
app.use("/", taskRoutes);

//PROJECT MIDDLEWARES
app.use("/", projectRoutes);

//TEAM MIDDLEWARES
app.use("/", teamRoutes);

//TAG MIDDLEWARES
app.use("/", tagRoutes);

export default app;
