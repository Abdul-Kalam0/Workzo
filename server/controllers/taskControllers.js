import mongoose from "mongoose";
import TaskModel from "../models/Task.js";

export const createTask = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "Request body is required",
    });
  }
  const { name, project, team, owners, tags, timeToComplete, status } =
    req.body;
  try {
    if (!name || !project || !team || !owners || !timeToComplete) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const newTask = new TaskModel({
      name,
      project,
      team,
      owners,
      tags,
      timeToComplete,
      status,
    });

    await newTask.save();

    return res.status(201).json({
      success: true,
      message: "Task Created successfully!",
      task: newTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAllTasks = async (req, res) => {
  const { team, owner, tags, project, status } = req.query;

  try {
    const filter = {};

    if (team) filter.team = team;
    if (project) filter.project = project;
    if (status) filter.status = status;

    if (owner) {
      const ownerArray = owner.split(",");
      filter.owners =
        ownerArray.length === 1 ? ownerArray[0] : { $in: ownerArray };
    }

    if (tags) {
      const tagsArray = Array.isArray(tags)
        ? tags
        : tags.split(",").map((t) => t.trim());

      filter.tags = { $in: tagsArray };
    }

    const tasks = await TaskModel.find(filter)
      .populate("project", "name")
      .populate("team", "name")
      .populate("owners", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully.",
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateTaskById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: `Task with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const deletedTask = await TaskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task Id is not present!" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Task deleted successfully!", taskData });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
