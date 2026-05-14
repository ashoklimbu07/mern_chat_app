import { Router } from "express";
import {
    getMessages,
    sendMessage,
    editMessage,
    deleteMessage,
} from "../controllers/message.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = Router();

// GET /api/messages/:userId — get conversation history
router.get("/:userId", protectRoute, getMessages);

// POST /api/messages/:userId — send a message
router.post("/:userId", protectRoute, sendMessage);

// PUT /api/messages/:id — edit own message
router.put("/:id", protectRoute, editMessage);

// DELETE /api/messages/:id — delete own message
router.delete("/:id", protectRoute, deleteMessage);

export default router;
