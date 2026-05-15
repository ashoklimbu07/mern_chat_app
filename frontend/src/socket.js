import { io } from "socket.io-client";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// userId is injected via socket.io.opts.query before connect (see Chat.jsx)
const socket = io(BACKEND_URL, {
  autoConnect: false,
});

export default socket;
