import { Server } from "socket.io";

// maps userId (string) → socketId
const userSocketMap = {};
let _io = null;

export const getIO = () => _io;
export const getReceiverSocketId = (userId) => userSocketMap[userId];

export const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        },
    });

    _io = io;

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            userSocketMap[userId] = socket.id;
            console.log(`User connected: ${userId} → socket ${socket.id}`);
        }

        // broadcast updated online users list to everyone
        io.emit("onlineUsers", Object.keys(userSocketMap));

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
