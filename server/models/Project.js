import mongoose from "mongoose";

// Project Schema
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // Project names must be unique
  description: { type: String, required: true },

  status: {
    type: String,
    enum: ["In Progress", "Completed"],
    default: "In Progress",
  }, // Task status
  // Optional field for project details
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Project", projectSchema);
