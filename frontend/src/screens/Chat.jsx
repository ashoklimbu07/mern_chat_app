import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

export default function Chat() {
    const navigate = useNavigate();

    useEffect(() => {
        // connect socket when chat screen mounts
        socket.connect();

        socket.on("onlineUsers", (users) => {
            console.log("Online users:", users);
        });

        return () => {
            // disconnect when leaving the chat screen
            socket.disconnect();
        };
    }, []);

    const handleLogout = () => {
        socket.disconnect();
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <p className="text-gray-500 text-sm">Chat page</p>
            <button onClick={handleLogout} className="mt-4 text-xs text-red-400 hover:text-red-600">
                Logout
            </button>
        </div>
    );
}
