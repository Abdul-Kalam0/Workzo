import mongoose, { model } from "mongoose";
// Tag Schema
const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // Tag names must be unique
});

export default model("Tag", tagSchema);
