import Message from "../models/message.model.js";
import { getReceiverSocketId, getIO } from "../socket/socket.js";

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
        }).sort({ createdAt: 1 });

        res.status(200).json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST /api/messages/:userId — send a message to :userId
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const { userId: receiverId } = req.params;
        const { text, optimisticId } = req.body;

        if (!text || !text.trim()) {
            return res
                .status(400)
                .json({ success: false, message: "Message text is required." });
        }

        const message = await Message.create({
            senderId,
            receiverId,
            text: text.trim(),
        });

        // push to receiver in real-time
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            getIO().to(receiverSocketId).emit("receiveMessage", message);
        }

        res.status(201).json({ success: true, message, optimisticId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// PUT /api/messages/:id — edit own message
export const editMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res
                .status(400)
                .json({ success: false, message: "Message text is required." });
        }

        const message = await Message.findById(id);
        if (!message) {
            return res
                .status(404)
                .json({ success: false, message: "Message not found." });
        }

        // only the sender can edit
        if (message.senderId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only edit your own messages.",
            });
        }

        message.text = text.trim();
        message.edited = true;
        await message.save();

        // notify the other party in real-time
        const receiverSocketId = getReceiverSocketId(
            message.receiverId.toString()
        );
        if (receiverSocketId) {
            getIO().to(receiverSocketId).emit("messageEdited", message);
        }

        res.status(200).json({ success: true, message });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE /api/messages/:id — delete own message
export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const message = await Message.findById(id);
        if (!message) {
            return res
                .status(404)
                .json({ success: false, message: "Message not found." });
        }

        // only the sender can delete
        if (message.senderId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own messages.",
            });
        }

        const receiverId = message.receiverId.toString();
        await message.deleteOne();

        // notify the other party in real-time
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            getIO().to(receiverSocketId).emit("messageDeleted", { _id: id });
        }

        res.status(200).json({ success: true, message: "Message deleted." });
    } catch (error) {
        // handle invalid ObjectId (e.g. optimistic temp IDs)
        if (error.name === "CastError") {
            return res
                .status(400)
                .json({ success: false, message: "Invalid message ID." });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};
