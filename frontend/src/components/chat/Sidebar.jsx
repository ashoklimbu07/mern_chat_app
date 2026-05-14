import { useEffect, useState } from "react";
import { Users, MessageSquare, LogOut } from "lucide-react";

export default function Sidebar({ users, activeUser, onlineUsers, onSelect, onLogout, myEmail }) {
    const [stats, setStats] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;
        fetch("/api/users/stats", { headers: { Authorization: `Bearer ${token}` } })
            .then((r) => r.json())
            .then((data) => { if (data.success) setStats(data.stats); });
    }, [token]);

    return (
        <div className="w-72 bg-gray-900 flex flex-col h-full">
            {/* Header */}
            <div className="px-5 pt-6 pb-4">
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <MessageSquare size={16} className="text-white" />
                    </div>
                    <span className="text-white font-bold text-lg tracking-tight">MerChat</span>
                </div>

                {/* Stats cards */}
                {stats && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-gray-800 rounded-xl px-3 py-2.5 border border-gray-700/50">
                            <div className="flex items-center gap-1.5 mb-1">
                                <Users size={12} className="text-indigo-400" />
                                <span className="text-xs text-gray-400 font-medium">Users</span>
                            </div>
                            <p className="text-xl font-bold text-white">{stats.totalUsers}</p>
                        </div>
                        <div className="bg-gray-800 rounded-xl px-3 py-2.5 border border-gray-700/50">
                            <div className="flex items-center gap-1.5 mb-1">
                                <MessageSquare size={12} className="text-indigo-400" />
                                <span className="text-xs text-gray-400 font-medium">Messages</span>
                            </div>
                            <p className="text-xl font-bold text-white">{stats.totalMessages}</p>
                        </div>
                    </div>
                )}

                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contacts</p>
            </div>

            {/* User list */}
            <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-0.5">
                {users.length === 0 && (
                    <p className="text-xs text-gray-500 text-center mt-8">No other users yet</p>
                )}
                {users.map((user) => {
                    const isOnline = onlineUsers.includes(user._id);
                    const isActive = activeUser?._id === user._id;
                    return (
                        <button
                            key={user._id}
                            onClick={() => onSelect(user)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left group
                                ${isActive
                                    ? "bg-indigo-600 shadow-lg shadow-indigo-500/20"
                                    : "hover:bg-gray-800"
                                }`}
                        >
                            <div className="relative flex-shrink-0">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold uppercase
                                    ${isActive ? "bg-indigo-400 text-white" : "bg-gray-700 text-gray-300"}`}>
                                    {user.email[0]}
                                </div>
                                {isOnline && (
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-gray-900 shadow-sm" />
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className={`text-sm font-medium truncate ${isActive ? "text-white" : "text-gray-300"}`}>
                                    {user.email}
                                </p>
                                <p className={`text-xs ${isOnline ? "text-emerald-400" : "text-gray-500"}`}>
                                    {isOnline ? "Online" : "Offline"}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Footer — logged-in user */}
            {myEmail && (
                <div className="px-3 py-3 border-t border-gray-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-sm font-bold uppercase flex-shrink-0 shadow-md">
                        {myEmail[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">Signed in as</p>
                        <p className="text-xs text-gray-300 font-medium truncate">{myEmail}</p>
                    </div>
                    <button
                        onClick={onLogout}
                        title="Logout"
                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition flex-shrink-0"
                    >
                        <LogOut size={15} />
                    </button>
                </div>
            )}
        </div>
    );
}
