import mongoose from "mongoose";
// Team Schema
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // Team names must be unique
  description: { type: String, required: true },
  // Optional description for the team
});

export default mongoose.model("Team", teamSchema);
