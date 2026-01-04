import express from "express";
import { createTeam, getAllTeams } from "../controllers/teamRoutes.js";

const router = express.Router();

//create teams
router.post("/teams", createTeam);

//get all teams
router.get("/teams", getAllTeams);

export default router;
