import { Server } from "socket.io";

// maps userId (string) → socketId
const userSocketMap = {};

export const getReceiverSocketId = (userId) => userSocketMap[userId];

export const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap[userId] = socket.id;
            console.log(`User connected: ${userId} → socket ${socket.id}`);
        }

        // broadcast updated online users list to everyone
        io.emit("onlineUsers", Object.keys(userSocketMap));

        // handle incoming message
        socket.on("sendMessage", async ({ receiverId, text, senderId }) => {
            const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("receiveMessage", {
                    senderId,
                    receiverId,
                    text,
                    createdAt: new Date().toISOString(),
                });
            }
        });

        socket.on("disconnect", () => {
            if (userId) {
                delete userSocketMap[userId];
                console.log(`User disconnected: ${userId}`);
            }
            io.emit("onlineUsers", Object.keys(userSocketMap));
        });
    });

    return io;
};
