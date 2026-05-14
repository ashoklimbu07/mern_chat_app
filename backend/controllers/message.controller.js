import Message from "../models/message.model.js";

// GET /api/messages/:userId — fetch conversation between logged-in user and :userId
export const getMessages = async (req, res) => {
    try {
        const myId = req.user._id;
        const { userId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userId },
                { senderId: userId, receiverId: myId },
            ],
        }).sort({ createdAt: 1 }); // oldest first

        res.status(200).json({
            success: true,
            messages,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// POST /api/messages/:userId — send a message to :userId
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const { userId: receiverId } = req.params;
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message text is required.",
            });
        }

        const message = await Message.create({
            senderId,
            receiverId,
            text: text.trim(),
        });

        res.status(201).json({
            success: true,
            message,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
