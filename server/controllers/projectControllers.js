import mongoose from "mongoose";
import ProjectModel from "../models/Project.js";

export const createProject = async (req, res) => {
  const { name, description, status } = req.body;
  try {
    if (!name || typeof name !== "string" || name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Invalid project name.",
      });
    }

    if (!description || typeof description !== "string") {
      return res.status(400).json({
        success: false,
        message: "Project description is required.",
      });
    }

    const newProject = await ProjectModel.create({
      name: name.trim(),
      description: description.trim(),
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project: newProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.find().sort({ createdAt: -1 });
    if (projects.length < 1) {
      return res.status(404).json({
        success: false,
        message: "No project is found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "List of projects.",
      projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const project = await ProjectModel.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project fetched successfully.",
      project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const updateProjectById = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const updateData = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: `Project with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const deletedProject = await ProjectModel.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
      deletedProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};
