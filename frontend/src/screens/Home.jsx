import { Link } from "react-router-dom";
import { Zap, ShieldCheck, MessageSquare } from "lucide-react";

const features = [
    { icon: Zap, title: "Real-time", desc: "Messages delivered instantly with Socket.IO." },
    { icon: ShieldCheck, title: "Secure", desc: "Passwords hashed, JWT-protected sessions." },
    { icon: MessageSquare, title: "Simple UI", desc: "Clean, distraction-free chat experience." },
];

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-900">
            {/* Navbar */}
            <nav className="w-full px-8 py-5 flex items-center justify-between border-b border-gray-800">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 overflow-hidden">
                        <img src="/chat-icon.png" alt="MerChat" className="w-6 h-6 object-contain" />
                    </div>
                    <span className="text-white font-bold text-lg tracking-tight">MerChat</span>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        to="/login"
                        className="px-4 py-2 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-gray-800 font-medium transition"
                    >
                        Log In
                    </Link>
                    <Link
                        to="/signup"
                        className="px-4 py-2 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 active:scale-95 transition-all shadow-lg shadow-indigo-500/30"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-8 py-16">
                <div className="w-20 h-20 rounded-3xl bg-indigo-500 flex items-center justify-center shadow-2xl shadow-indigo-500/30 overflow-hidden">
                    <img src="/chat-icon.png" alt="MerChat" className="w-13 h-13 object-contain" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl font-extrabold text-white max-w-xl leading-tight">
                        Chat with anyone,{" "}
                        <span className="text-indigo-400">instantly</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                        MerChat is a fast, real-time messaging app. Sign up free and start chatting in seconds.
                    </p>
                </div>

                <div className="flex gap-3">
                    <Link
                        to="/signup"
                        className="px-7 py-3 rounded-2xl bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-600 active:scale-95 transition-all shadow-xl shadow-indigo-500/30"
                    >
                        Get Started Free
                    </Link>
                    <Link
                        to="/login"
                        className="px-7 py-3 rounded-2xl bg-gray-800 text-gray-300 font-semibold text-sm border border-gray-700 hover:bg-gray-700 hover:text-white active:scale-95 transition-all"
                    >
                        Log In
                    </Link>
                </div>
            </main>

            {/* Features */}
            <section className="pb-16 px-6">
                <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {features.map(({ icon: Icon, title, desc }) => (
                        <div
                            key={title}
                            className="flex flex-col items-center gap-3 bg-gray-800 rounded-2xl px-5 py-6 border border-gray-700/50 text-center"
                        >
                            <div className="w-11 h-11 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                                <Icon className="text-indigo-400" size={22} />
                            </div>
                            <h3 className="font-bold text-white">{title}</h3>
                            <p className="text-sm text-gray-400">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="text-center py-5 text-xs text-gray-600 border-t border-gray-800">
                © {new Date().getFullYear()} harishankarlimbu · MerChat
            </footer>
        </div>
    );
}
