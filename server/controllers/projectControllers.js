import ProjectModel from "../models/Project.js";

export const createProject = async (req, res) => {
  const { name, description } = req.body;
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
    const projects = await ProjectModel.find();
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
