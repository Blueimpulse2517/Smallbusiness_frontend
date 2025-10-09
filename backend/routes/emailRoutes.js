import express from "express";
import { handleSubmit } from "../controllers/emailControllers.js";

const router = express.Router();

router.post("/handleSubmit", handleSubmit);

export default router;
