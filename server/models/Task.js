import mongoose from "mongoose";

// Task Schema
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },

  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  }, // Refers to Project model

  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  }, // Refers to Team model

  owners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ], // Refers to User model (task owners)

  tags: [{ type: String }], // Array of tags

  timeToComplete: {
    type: Number,
    required: true,
  }, // Days to complete task

  status: {
    type: String,
    enum: ["In Progress", "Completed"],
    default: "In Progress",
  }, // Task status

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Automatically update updatedAt whenever document is saved
taskSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Task", taskSchema);
