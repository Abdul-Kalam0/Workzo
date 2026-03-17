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

app.use(
  cors({
    origin: "https://workzo-ak-001.vercel.app",
    credentials: true,
  }),
);

// 3️⃣ Body & cookies
app.use(express.json());
app.use(cookieParser());

// 4️⃣ Routes
app.use("/auth", authRoutes);
app.use("/", taskRoutes);
app.use("/", projectRoutes);
app.use("/", teamRoutes);
app.use("/", tagRoutes);
app.use("/report", reportRoutes);

export default app;
