import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";

// GET /api/users — get all users except the logged-in user
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } }).select(
            "-password"
        );
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET /api/users/:id — get user by id
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// PUT /api/users/:id — update user (only the logged-in user can update themselves)
export const updateUser = async (req, res) => {
    try {
        // Authorization check — users can only update their own profile
        if (req.params.id !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own profile.",
            });
        }

        const { email, password } = req.body;
        const updates = {};

        if (email) {
            // check if new email is already taken by someone else
            const existing = await User.findOne({ email });
            if (existing && existing._id.toString() !== req.params.id) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use.",
                });
            }
            updates.email = email;
        }

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: "Password must be at least 6 characters.",
                });
            }
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true } // return the updated document
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "User updated successfully.",
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE /api/users/:id — delete user (only the logged-in user can delete themselves)
export const deleteUser = async (req, res) => {
    try {
        // Authorization check — users can only delete their own account
        if (req.params.id !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own account.",
            });
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET /api/users/stats — total user count and total message count
export const getStats = async (req, res) => {
    try {
        const [totalUsers, totalMessages] = await Promise.all([
            User.countDocuments(),
            Message.countDocuments(),
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalMessages,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
