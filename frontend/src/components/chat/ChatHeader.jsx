export default function ChatHeader({ user, isOnline }) {
    return (
        <div className="flex items-center px-6 py-3.5 bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm">
            <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white flex items-center justify-center text-sm font-bold uppercase shadow-md">
                    {user.email[0]}
                </div>
                {isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
                )}
            </div>
            <div className="ml-3">
                <p className="text-sm font-semibold text-gray-800">{user.email}</p>
                <p className={`text-xs font-medium ${isOnline ? "text-emerald-500" : "text-gray-400"}`}>
                    {isOnline ? "● Active now" : "○ Offline"}
                </p>
            </div>
        </div>
    );
}
