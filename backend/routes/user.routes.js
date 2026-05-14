import { Router } from "express";
import {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/user.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = Router();

// public route no token required
router.get("/", protectRoute, getUsers);
router.get("/:id", getUserById);

//protected jwt token required
router.put("/:id", protectRoute, updateUser);
router.delete("/:id", protectRoute, deleteUser);

export default router;
