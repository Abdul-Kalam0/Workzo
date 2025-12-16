import express from "express";
import { createTag, getAllTags } from "../controllers/tagControllers.js";

const router = express.Router();

//create Tags
router.post("/tags", createTag);

//get all tags
router.get("/tags", getAllTags);

export default router;
