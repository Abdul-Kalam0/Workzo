import express from "express";
import {
  createTeam,
  deleteTeamById,
  getAllTeams,
} from "../controllers/teamRoutes.js";

const router = express.Router();

//create teams
router.post("/teams", createTeam);

//get all teams
router.get("/teams", getAllTeams);

//delete team
router.delete("/teams/:id", deleteTeamById);

export default router;
