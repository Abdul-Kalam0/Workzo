import express from "express";
import { createTag, getAllTags } from "../controllers/tagControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//create Tags
router.post("/tags",, verifyToken, createTag);

//get all tags
router.get("/tags",verifyToken, getAllTags);

export default router;
