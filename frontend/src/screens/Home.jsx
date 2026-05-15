import { Link } from "react-router-dom";
import { Zap, ShieldCheck, Pencil, Search } from "lucide-react";

const features = [
    { icon: Zap, title: "Real-time", desc: "Messages delivered instantly via Socket.IO." },
    { icon: ShieldCheck, title: "Secure", desc: "Passwords hashed, JWT-protected sessions." },
    { icon: Pencil, title: "Edit & Delete", desc: "Fix typos or remove messages anytime." },
    { icon: Search, title: "Search Contacts", desc: "Find any user instantly by email." },
];

export default function Home() {
    return (
        <div className="h-screen flex flex-col bg-gray-900 overflow-hidden">
            <style>{`
                @keyframes wiggle {
                    0%, 100% { transform: rotate(0deg); }
                    20%       { transform: rotate(-8deg); }
                    40%       { transform: rotate(8deg); }
                    60%       { transform: rotate(-5deg); }
                    80%       { transform: rotate(5deg); }
                }
                .feature-card:hover .feature-icon {
                    animation: wiggle 0.5s ease;
                }
            `}</style>

            {/* Navbar */}
            <nav className="w-full px-8 py-4 flex items-center justify-between border-b border-gray-800">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-indigo-500 flex items-center justify-center overflow-hidden shadow-lg shadow-indigo-500/30">
                        <img src="/chat-icon.png" alt="MerChat" className="w-5 h-5 object-contain" />
                    </div>
                    <span className="text-white font-bold text-base tracking-tight">MerChat</span>
                </div>
                <div className="flex items-center gap-3">
                    <Link to="/login" className="px-3 py-1.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-gray-800 font-medium transition">
                        Log In
                    </Link>
                    <Link to="/signup" className="px-3 py-1.5 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 active:scale-95 transition-all shadow-lg shadow-indigo-500/30">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero + Features — fills remaining height evenly */}
            <div className="flex-1 flex flex-col items-center justify-evenly px-6 py-8">

                {/* Hero */}
                <div className="flex flex-col items-center text-center gap-5">
                    <div className="w-20 h-20 rounded-3xl bg-indigo-500 flex items-center justify-center shadow-2xl shadow-indigo-500/30 overflow-hidden">
                        <img src="/chat-icon.png" alt="MerChat" className="w-14 h-14 object-contain" />
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-5xl font-extrabold text-white leading-tight">
                            Chat with anyone,{" "}
                            <span className="text-indigo-400">instantly</span>
                        </h1>
                        <p className="text-gray-400 text-base max-w-md mx-auto leading-relaxed">
                            MerChat is a fast, real-time messaging app. Sign up free and start chatting in seconds.
                        </p>
                    </div>
                    <div className="flex gap-4 mt-1">
                        <Link to="/signup" className="px-8 py-3 rounded-2xl bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-600 active:scale-95 transition-all shadow-xl shadow-indigo-500/30">
                            Get Started Free
                        </Link>
                        <Link to="/login" className="px-8 py-3 rounded-2xl bg-gray-800 text-gray-300 font-semibold text-sm border border-gray-700 hover:bg-gray-700 hover:text-white active:scale-95 transition-all">
                            Log In
                        </Link>
                    </div>
                </div>

                {/* Feature cards */}
                <div className="w-full max-w-3xl grid grid-cols-4 gap-5">
                    {features.map(({ icon: Icon, title, desc }) => (
                        <div
                            key={title}
                            className="feature-card flex flex-col items-center gap-3 bg-gray-800/70 rounded-2xl px-4 py-6 border border-gray-700/40 text-center cursor-default hover:border-indigo-500/40 hover:bg-gray-800 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10"
                        >
                            <div className="feature-icon w-11 h-11 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                                <Icon className="text-indigo-400" size={22} />
                            </div>
                            <h3 className="font-bold text-white text-sm">{title}</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>

            </div>

            {/* Footer */}
            <footer className="text-center py-3 text-xs text-gray-600 border-t border-gray-800 flex items-center justify-center gap-2">
                © {new Date().getFullYear()} harishankarlimbu ·
                <a
                    href="https://github.com/ashoklimbu07/mern_chat_app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gray-500 hover:text-white transition-colors"
                    title="GitHub"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    MerChat
                </a>
            </footer>
        </div>
    );
}
