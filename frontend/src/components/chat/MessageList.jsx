import { useEffect, useRef } from "react";

export default function MessageList({ messages, myId }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Group messages to collapse consecutive same-sender bubbles
    return (
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-1"
            style={{ background: "linear-gradient(180deg, #f8faff 0%, #f1f4fd 100%)" }}>
            {messages.map((msg, i) => {
                const isMine = msg.senderId === myId || msg.senderId?._id === myId;
                const prevMsg = messages[i - 1];
                const prevIsMine = prevMsg
                    ? prevMsg.senderId === myId || prevMsg.senderId?._id === myId
                    : null;
                const isFirst = prevIsMine !== isMine;

                return (
                    <div
                        key={msg._id}
                        className={`flex ${isMine ? "justify-end" : "justify-start"} ${isFirst ? "mt-3" : "mt-0.5"}`}
                    >
                        {/* Avatar for received messages, only on first in group */}
                        {!isMine && (
                            <div className={`w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white flex items-center justify-center text-xs font-bold uppercase flex-shrink-0 mr-2 self-end mb-0.5 ${isFirst ? "opacity-100" : "opacity-0"}`}>
                                {String(msg.senderId?._id || msg.senderId || "?")[0]?.toUpperCase() || "?"}
                            </div>
                        )}

                        <div className={`max-w-sm ${isMine ? "items-end" : "items-start"} flex flex-col`}>
                            <div className={`px-4 py-2.5 text-sm leading-relaxed shadow-sm
                                ${isMine
                                    ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-2xl rounded-br-md shadow-indigo-200"
                                    : "bg-white text-gray-800 rounded-2xl rounded-bl-md border border-gray-100"
                                }`}>
                                <p>{msg.text}</p>
                            </div>
                            <p className={`text-[10px] mt-1 px-1 ${isMine ? "text-gray-400" : "text-gray-400"}`}>
                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                        </div>
                    </div>
                );
            })}
            <div ref={bottomRef} />
        </div>
    );
}
