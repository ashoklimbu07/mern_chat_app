import { Router } from "express";
import { getUsers, getUserById } from "../controllers/user.controller.js";

const router = Router();

// GET /api/users - get all users (email only)
router.get("/", getUsers);

// GET /api/users/:id - get user by id
router.get("/:id", getUserById);

export default router;
