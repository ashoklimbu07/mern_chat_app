import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Pencil, Trash2, Check, X } from "lucide-react";

function MessageBubble({ msg, isMine, isFirst, onEdit, onDelete }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editText, setEditText] = useState(msg.text);
    const menuRef = useRef(null);
    const inputRef = useRef(null);

    // sync editText if msg.text changes externally
    useEffect(() => {
        setEditText(msg.text);
    }, [msg.text]);

    // close menu on outside click
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // focus + move cursor to end when editing starts
    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
            const len = inputRef.current.value.length;
            inputRef.current.setSelectionRange(len, len);
        }
    }, [editing]);

    const submitEdit = () => {
        if (editText.trim() && editText.trim() !== msg.text) {
            onEdit(msg._id, editText.trim());
        }
        setEditing(false);
        setMenuOpen(false);
    };

    const cancelEdit = () => {
        setEditText(msg.text);
        setEditing(false);
        setMenuOpen(false);
    };

    return (
        <div className={`flex flex-col ${isMine ? "items-end" : "items-start"} ${isFirst ? "mt-3" : "mt-0.5"}`}>
            <div className={`flex ${isMine ? "justify-end" : "justify-start"} w-full`}>
                {/* Avatar for received messages */}
                {!isMine && (
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white flex items-center justify-center text-xs font-bold uppercase flex-shrink-0 mr-2 self-end mb-0.5 ${isFirst ? "opacity-100" : "opacity-0"}`}>
                        {String(msg.senderId?._id || msg.senderId || "?")[0]?.toUpperCase() || "?"}
                    </div>
                )}

                <div className="max-w-sm flex flex-col">
                    {/* Bubble */}
                    <div className={`relative group px-4 py-2.5 text-sm leading-relaxed shadow-sm
                        ${isMine
                            ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-2xl rounded-br-md shadow-indigo-200"
                            : "bg-white text-gray-800 rounded-2xl rounded-bl-md border border-gray-100"
                        }`}>

                        {/* Three-dot button — top-right corner, own messages only */}
                        {isMine && !editing && (
                            <div className="absolute -top-2 -right-2" ref={menuRef}>
                                <button
                                    onClick={() => setMenuOpen((o) => !o)}
                                    className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-gray-400 hover:text-indigo-500 hover:border-indigo-200 transition opacity-0 group-hover:opacity-100"
                                >
                                    <MoreHorizontal size={13} />
                                </button>

                                {menuOpen && (
                                    <div className="absolute right-0 top-7 w-32 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                                        <button
                                            onClick={() => { setEditing(true); setMenuOpen(false); }}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-indigo-50 transition"
                                        >
                                            <Pencil size={13} className="text-indigo-400" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => { onDelete(msg._id); setMenuOpen(false); }}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition"
                                        >
                                            <Trash2 size={13} />
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        <p>{msg.text}</p>
                    </div>

                    {/* Timestamp + edited badge */}
                    <div className="flex items-center gap-1.5 mt-1 px-1">
                        <p className="text-[10px] text-gray-400">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                        {msg.edited && (
                            <span className="text-[10px] text-gray-400 italic">· edited</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit bar — appears below the bubble when editing */}
            {editing && (
                <div className="mt-1.5 w-full max-w-sm">
                    <div className="flex items-center gap-2 bg-white border border-indigo-300 rounded-2xl px-3 py-2 shadow-md shadow-indigo-100">
                        <Pencil size={13} className="text-indigo-400 flex-shrink-0" />
                        <input
                            ref={inputRef}
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") submitEdit();
                                if (e.key === "Escape") cancelEdit();
                            }}
                            className="flex-1 text-sm text-gray-800 outline-none bg-transparent min-w-0"
                        />
                        <button
                            onClick={submitEdit}
                            disabled={!editText.trim()}
                            className="w-7 h-7 flex items-center justify-center rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 active:scale-95 transition disabled:opacity-40 flex-shrink-0"
                        >
                            <Check size={13} />
                        </button>
                        <button
                            onClick={cancelEdit}
                            className="w-7 h-7 flex items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 active:scale-95 transition flex-shrink-0"
                        >
                            <X size={13} />
                        </button>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1 px-1">Enter to save · Esc to cancel</p>
                </div>
            )}
        </div>
    );
}

export default function MessageList({ messages, myId, onEdit, onDelete }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div
            className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-1"
            style={{ background: "linear-gradient(180deg, #f8faff 0%, #f1f4fd 100%)" }}
        >
            {messages.map((msg, i) => {
                const isMine = msg.senderId === myId || msg.senderId?._id === myId;
                const prevMsg = messages[i - 1];
                const prevIsMine = prevMsg
                    ? prevMsg.senderId === myId || prevMsg.senderId?._id === myId
                    : null;
                const isFirst = prevIsMine !== isMine;

                return (
                    <MessageBubble
                        key={msg._id}
                        msg={msg}
                        isMine={isMine}
                        isFirst={isFirst}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                );
            })}
            <div ref={bottomRef} />
        </div>
    );
}
