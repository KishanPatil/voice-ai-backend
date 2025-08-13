import express from "express";
import multer from "multer";
import { processAudio } from "../controllers/voiceController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // store in memory

router.post("/voice", upload.single("audio"), processAudio);

export default router;
