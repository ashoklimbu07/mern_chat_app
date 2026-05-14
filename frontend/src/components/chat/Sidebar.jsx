export default function Sidebar({ users, activeUser, onlineUsers, onSelect, onLogout, myEmail }) {
    return (
        <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
                <h1 className="text-lg font-bold text-indigo-600">Chats</h1>
            </div>

            <div className="flex-1 overflow-y-auto">
                {users.length === 0 && (
                    <p className="text-xs text-gray-400 text-center mt-8">No other users yet</p>
                )}
                {users.map((user) => {
                    const isOnline = onlineUsers.includes(user._id);
                    const isActive = activeUser?._id === user._id;
                    return (
                        <button
                            key={user._id}
                            onClick={() => onSelect(user)}
                            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-left ${isActive ? "bg-indigo-50" : ""}`}
                        >
                            <div className="relative flex-shrink-0">
                                <div className="w-9 h-9 rounded-full bg-indigo-400 text-white flex items-center justify-center text-sm font-semibold uppercase">
                                    {user.email[0]}
                                </div>
                                {isOnline && (
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
                                )}
                            </div>
                            <span className="text-sm text-gray-700 truncate">{user.email}</span>
                        </button>
                    );
                })}
            </div>

            {/* Logged-in user footer */}
            {myEmail && (
                <div className="px-4 py-3 border-t border-gray-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-semibold uppercase flex-shrink-0">
                        {myEmail[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-400">Logged in as</p>
                        <p className="text-sm text-gray-700 font-medium truncate">{myEmail}</p>
                    </div>
                    <button
                        onClick={onLogout}
                        title="Logout"
                        className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition flex-shrink-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                        </svg>
                        <span className="text-xs font-medium">Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
}
