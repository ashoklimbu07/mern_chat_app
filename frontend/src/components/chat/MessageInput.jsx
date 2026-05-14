export default function MessageInput({ input, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="px-6 py-4 bg-white border-t border-gray-200 flex gap-3">
            <input
                type="text"
                value={input}
                onChange={onChange}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 rounded-full border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
            />
            <button
                type="submit"
                disabled={!input.trim()}
                className="px-5 py-2.5 bg-indigo-500 text-white text-sm font-medium rounded-full hover:bg-indigo-600 transition disabled:opacity-40"
            >
                Send
            </button>
        </form>
    );
}
