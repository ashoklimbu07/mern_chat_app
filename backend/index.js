import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import cors from "cors";
import { connectMongoDb } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { initSocket } from "./socket/socket.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app); // wrap express with http server for socket.io

// middlewares
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());

// health check — used by cron-job.org to keep Render from sleeping
app.get("/health", (req, res) => res.json({ status: "ok" }));

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// attach socket.io to the http server
initSocket(server);

// start server after DB connects
connectMongoDb().then(() => {
    server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
