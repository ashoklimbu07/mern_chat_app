import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// protectRoute, verifies the JWT token sent in the Authorization header
// Client must send:  Authorization: Bearer <token>

const protectRoute = async (req, res, next) => {
    try {
        // 1. Extract token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
        }

        const token = authHeader.split(" ")[1]; // "Bearer <token>" → "<token>"

        // 2. Verify token, throws if expired or tampered
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Check user still exists in DB
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists.",
            });
        }

        // 4. Attach user to request so controllers can use it
        req.user = user;

        next(); // move to the actual route handler
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired. Please login again.",
            });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token.",
            });
        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export default protectRoute;
