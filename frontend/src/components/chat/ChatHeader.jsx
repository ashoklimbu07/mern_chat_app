import { Phone, Video, MoreVertical } from "lucide-react";

export default function ChatHeader({ user, isOnline }) {
    return (
        <div className="flex items-center justify-between px-6 py-3.5 bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white flex items-center justify-center text-sm font-bold uppercase shadow-md">
                        {user.email[0]}
                    </div>
                    {isOnline && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
                    )}
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-800">{user.email}</p>
                    <p className={`text-xs font-medium ${isOnline ? "text-emerald-500" : "text-gray-400"}`}>
                        {isOnline ? "● Active now" : "○ Offline"}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-1">
                <button className="p-2 rounded-xl text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 transition">
                    <Phone size={17} />
                </button>
                <button className="p-2 rounded-xl text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 transition">
                    <Video size={17} />
                </button>
                <button className="p-2 rounded-xl text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 transition">
                    <MoreVertical size={17} />
                </button>
            </div>
        </div>
    );
}
