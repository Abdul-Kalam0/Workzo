import express from "express";
import {
  createProject,
  getAllProjects,
} from "../controllers/projectControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//create a new task
router.post("/projects", verifyToken, createProject);

//get all projects
router.get("/projects", verifyToken, getAllProjects);

export default router;
