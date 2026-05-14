import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import Sidebar from "../components/chat/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";

export default function Chat() {
    const navigate = useNavigate();
    const myId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const myEmail = localStorage.getItem("userEmail");

    const [users, setUsers] = useState([]);
    const [activeUser, setActiveUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [onlineUsers, setOnlineUsers] = useState([]);

    // socket setup
    useEffect(() => {
        socket.connect();
        socket.on("onlineUsers", setOnlineUsers);
        socket.on("receiveMessage", (msg) => setMessages((prev) => [...prev, msg]));
        return () => {
            socket.off("onlineUsers");
            socket.off("receiveMessage");
            socket.disconnect();
        };
    }, []);

    // fetch user list
    useEffect(() => {
        fetch("/api/users", { headers: { Authorization: `Bearer ${token}` } })
            .then((r) => r.json())
            .then((data) => { if (data.success) setUsers(data.users); });
    }, [token]);

    // fetch message history on contact change
    useEffect(() => {
        if (!activeUser) return;
        fetch(`/api/messages/${activeUser._id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((r) => r.json())
            .then((data) => { if (data.success) setMessages(data.messages); });
    }, [activeUser, token]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || !activeUser) return;

        const text = input.trim();
        setInput("");

        // optimistic update
        setMessages((prev) => [...prev, {
            _id: Date.now(),
            senderId: myId,
            receiverId: activeUser._id,
            text,
            createdAt: new Date().toISOString(),
        }]);

        await fetch(`/api/messages/${activeUser._id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ text }),
        });
    };

    const handleLogout = () => {
        socket.disconnect();
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        navigate("/login");
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar
                users={users}
                activeUser={activeUser}
                onlineUsers={onlineUsers}
                onSelect={setActiveUser}
                onLogout={handleLogout}
                myEmail={myEmail}
            />

            <div className="flex-1 flex flex-col">
                {activeUser ? (
                    <>
                        <ChatHeader
                            user={activeUser}
                            isOnline={onlineUsers.includes(activeUser._id)}
                        />
                        <MessageList messages={messages} myId={myId} />
                        <MessageInput
                            input={input}
                            onChange={(e) => setInput(e.target.value)}
                            onSubmit={handleSend}
                        />
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-sm">Select a user to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
}
