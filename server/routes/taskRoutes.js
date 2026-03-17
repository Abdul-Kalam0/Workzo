import express from "express";
import {
  createTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from "../controllers/taskControllers.js";

const router = express.Router();

router.post("/tasks", createTask);
router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);
router.put("/taska/:id", updateTaskById);
router.delete("/tasks/:id", deleteTaskById);

export default router;
