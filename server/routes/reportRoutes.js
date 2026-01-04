import express from "express";
import {
  getTasksCompletedLastWeek,
  getTotalPendingWork,
  getClosedTasksGrouped,
} from "../controllers/reportControllers.js";

const router = express.Router();

/* Reports */
router.get("/last-week", getTasksCompletedLastWeek);
router.get("/pending", getTotalPendingWork);
router.get("/closed-tasks", getClosedTasksGrouped);

export default router;
