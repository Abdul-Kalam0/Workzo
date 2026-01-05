import mongoose from "mongoose";
import TeamModel from "../models/Team.js";

export const createTeam = async (req, res) => {
  const { name, description } = req.body;
  try {
    if (!name || typeof name !== "string" || name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Invalid team name.",
      });
    }

    if (!description || typeof description !== "string") {
      return res.status(400).json({
        success: false,
        message: "Team description is required.",
      });
    }

    const newTeams = await TeamModel.create({
      name: name.trim(),
      description: description.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Team created successfully.",
      team: newTeams,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await TeamModel.find();
    if (teams.length < 1) {
      return res.status(404).json({
        success: false,
        message: "No team is found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "List of teams.",
      teams,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const deleteTeamById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id",
      });
    }

    const team = await TeamModel.findByIdAndDelete(id);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Team deleted successfully",
      team,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
