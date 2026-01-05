import express from "express";
import {
  createProject,
  deleteProjectById,
  getAllProjects,
  getProjectById,
  updateProjectById,
} from "../controllers/projectControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//create a new task
router.post("/projects", createProject);

//get all projects
router.get("/projects", getAllProjects);

//get project by id
router.get("/projects/:id", getProjectById);

//update project by id
router.put("/projects/:id", updateProjectById);

//delete project by id
router.delete("/projects/:id", deleteProjectById);

export default router;
