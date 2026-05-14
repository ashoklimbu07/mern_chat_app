import { io } from "socket.io-client";

// Read the logged-in user's ID from localStorage
// The token payload isn't decoded here — instead we store userId separately on login
const userId = localStorage.getItem("userId");

const socket = io("http://localhost:3000", {
  query: { userId },
  autoConnect: false, // connect manually after login
});

export default socket;
