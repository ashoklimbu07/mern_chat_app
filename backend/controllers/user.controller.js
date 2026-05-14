import User from "../models/user.model.js";

// GET /api/users - get all users (only email)
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("email -_id"); // only get email
        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET /api/users/:id - get user by id
export const getUserById = async (req, res) => {

    try {
        const userid= req.params.id
        const user = await User.findById(userid).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
