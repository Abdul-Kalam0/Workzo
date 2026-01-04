import express, { Router } from "express";
import {
  createTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from "../controllers/taskControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//create task
router.post("/tasks", verifyToken, createTask);

//get all tasks by query
router.get("/tasks", getAllTasks);

//get task by id
router.get("/tasks/:id", getTaskById);

//update task by id
router.put("/tasks/:id", verifyToken, updateTaskById);

//delete task by id
router.delete("/tasks/:id", verifyToken, deleteTaskById);

export default router;
