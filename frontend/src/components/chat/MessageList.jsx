import { useEffect, useRef } from "react";

export default function MessageList({ messages, myId }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-2">
            {messages.map((msg) => {
                const isMine = msg.senderId === myId || msg.senderId?._id === myId;
                return (
                    <div key={msg._id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${isMine ? "bg-indigo-500 text-white rounded-br-sm" : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"}`}>
                            <p>{msg.text}</p>
                            <p className={`text-xs mt-1 ${isMine ? "text-indigo-200" : "text-gray-400"}`}>
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
