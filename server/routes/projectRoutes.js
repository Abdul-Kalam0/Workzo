import express from "express";
import {
  createProject,
  deleteProjectById,
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

//delete project by id
router.delete("/projects/:id", deleteProjectById);

export default router;
