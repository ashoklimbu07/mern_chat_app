export default function ChatHeader({ user, isOnline }) {
    return (
        <div className="flex items-center gap-3 px-6 py-4 bg-white border-b border-gray-200">
            <div className="w-8 h-8 rounded-full bg-indigo-400 text-white flex items-center justify-center text-sm font-semibold uppercase">
                {user.email[0]}
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-800">{user.email}</p>
                <p className="text-xs text-gray-400">{isOnline ? "Online" : "Offline"}</p>
            </div>
        </div>
    );
}
