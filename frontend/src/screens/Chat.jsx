import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import Sidebar from "../components/chat/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";
import { MessageSquareDashed } from "lucide-react";

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
    const [stats, setStats] = useState(null);

    // fetch stats once on mount
    useEffect(() => {
        if (!token) return;
        fetch("/api/users/stats", { headers: { Authorization: `Bearer ${token}` } })
            .then((r) => r.json())
            .then((data) => { if (data.success) setStats(data.stats); });
    }, [token]);

    // socket setup
    useEffect(() => {
        socket.connect();
        socket.on("onlineUsers", setOnlineUsers);
        socket.on("receiveMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
            // increment total count when we receive a message from someone else
            setStats((s) => s ? { ...s, totalMessages: s.totalMessages + 1 } : s);
        });
        socket.on("messageEdited", (updated) =>
            setMessages((prev) => prev.map((m) => (m._id === updated._id ? updated : m)))
        );
        socket.on("messageDeleted", ({ _id }) => {
            setMessages((prev) => prev.filter((m) => m._id !== _id));
            setStats((s) => s ? { ...s, totalMessages: Math.max(0, s.totalMessages - 1) } : s);
        });
        return () => {
            socket.off("onlineUsers");
            socket.off("receiveMessage");
            socket.off("messageEdited");
            socket.off("messageDeleted");
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
        const optimisticId = Date.now();
        setInput("");

        // optimistic update with a temp ID
        setMessages((prev) => [...prev, {
            _id: optimisticId,
            senderId: myId,
            receiverId: activeUser._id,
            text,
            createdAt: new Date().toISOString(),
        }]);

        // increment total message count immediately
        setStats((s) => s ? { ...s, totalMessages: s.totalMessages + 1 } : s);

        const res = await fetch(`/api/messages/${activeUser._id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ text, optimisticId }),
        });
        const data = await res.json();

        // replace the optimistic entry with the real saved message
        if (data.success) {
            setMessages((prev) =>
                prev.map((m) => (m._id === optimisticId ? data.message : m))
            );
        } else {
            // roll back count if save failed
            setStats((s) => s ? { ...s, totalMessages: Math.max(0, s.totalMessages - 1) } : s);
        }
    };

    const handleEdit = async (msgId, newText) => {
        const res = await fetch(`/api/messages/${msgId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ text: newText }),
        });
        const data = await res.json();
        if (data.success) {
            setMessages((prev) => prev.map((m) => (m._id === msgId ? data.message : m)));
        }
    };

    const handleDelete = async (msgId) => {
        const res = await fetch(`/api/messages/${msgId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
            setMessages((prev) => prev.filter((m) => m._id !== msgId));
            setStats((s) => s ? { ...s, totalMessages: Math.max(0, s.totalMessages - 1) } : s);
        }
    };

    const handleLogout = () => {
        socket.disconnect();
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        navigate("/login");
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <Sidebar
                users={users}
                activeUser={activeUser}
                onlineUsers={onlineUsers}
                onSelect={setActiveUser}
                onLogout={handleLogout}
                myEmail={myEmail}
                stats={stats}
            />

            <div className="flex-1 flex flex-col min-w-0">
                {activeUser ? (
                    <>
                        <ChatHeader
                            user={activeUser}
                            isOnline={onlineUsers.includes(activeUser._id)}
                        />
                        <MessageList
                            messages={messages}
                            myId={myId}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                        <MessageInput
                            input={input}
                            onChange={(e) => setInput(e.target.value)}
                            onSubmit={handleSend}
                        />
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4"
                        style={{ background: "linear-gradient(180deg, #f8faff 0%, #f1f4fd 100%)" }}>
                        <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
                            <MessageSquareDashed size={32} className="text-indigo-400" />
                        </div>
                        <div className="text-center">
                            <p className="text-gray-700 font-semibold">No conversation selected</p>
                            <p className="text-sm text-gray-400 mt-1">Pick someone from the sidebar to start chatting</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
