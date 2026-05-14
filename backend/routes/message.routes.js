import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = Router();

// GET /api/messages/:userId — get conversation history
router.get("/:userId", protectRoute, getMessages);

// POST /api/messages/:userId — send a message
router.post("/:userId", protectRoute, sendMessage);

export default router;
