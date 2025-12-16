import TagModel from "../models/Tag.js";

export const createTag = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Invalid tag.",
      });
    }

    const newTag = new TagModel.create({ name: name.trim() });
    return res.status(201).json({
      success: true,
      message: "Tag created successfully.",
      data: newTag,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await TagModel.find();
    if (tags.length < 1) {
      return res.status(404).json({
        success: false,
        mesage: "No tags found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All tags fetched successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};
