import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
} from "../controllers/projectControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//create a new task
router.post("/projects", verifyToken, createProject);

//get all projects
router.get("/projects", getAllProjects);

//get project by id
router.get("/projects/:id", getProjectById);

export default router;
