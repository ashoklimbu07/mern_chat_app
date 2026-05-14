import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectMongoDb } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// start server after DB connects
connectMongoDb().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
