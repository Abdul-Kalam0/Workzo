import express, { Router } from "express";
import {
  createTask,
  deleteTaskById,
  getAllTasksByQuery,
  updateTaskById,
} from "../controllers/taskControllers.js";

const router = express.Router();

//create task
router.post("/tasks", createTask);

//get all tasks by query
router.get("/tasks", getAllTasksByQuery);

//update task by id
router.put("/tasks/:id", updateTaskById);

//delete task by id
router.delete("/tasks/:id", deleteTaskById);

export default router;
