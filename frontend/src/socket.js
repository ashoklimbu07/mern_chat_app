import { io } from "socket.io-client";

const userId = localStorage.getItem("userId");

// In production the frontend calls the Render backend URL via env var
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const socket = io(BACKEND_URL, {
  query: { userId },
  autoConnect: false,
});

export default socket;
