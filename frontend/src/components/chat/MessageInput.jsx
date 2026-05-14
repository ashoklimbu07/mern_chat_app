import { Send } from "lucide-react";

export default function MessageInput({ input, onChange, onSubmit }) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            onSubmit(e);
        }
    };

    return (
        <form
            onSubmit={onSubmit}
            className="px-5 py-4 bg-white border-t border-gray-100 flex items-center gap-3"
        >
            <input
                type="text"
                value={input}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-white transition"
            />
            <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-indigo-500 text-white hover:bg-indigo-600 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-indigo-200 flex-shrink-0"
            >
                <Send size={16} />
            </button>
        </form>
    );
}
