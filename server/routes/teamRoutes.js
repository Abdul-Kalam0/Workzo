import express from "express";
import { createTeam, getAllTeams } from "../controllers/teamRoutes.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//create teams
router.post("/teams", verifyToken, createTeam);

//get all teams
router.get("/teams", verifyToken, getAllTeams);

export default router;
