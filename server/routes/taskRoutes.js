import express, { Router } from "express";
import {
  createTask,
  deleteTaskById,
  getAllTasks,
  updateTaskById,
} from "../controllers/taskControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//create task
router.post("/tasks", verifyToken, createTask);

//get all tasks by query
router.get("/tasks", verifyToken, getAllTasks);

//update task by id
router.put("/tasks/:id", verifyToken, updateTaskById);

//delete task by id
router.delete("/tasks/:id", verifyToken, deleteTaskById);

export default router;
