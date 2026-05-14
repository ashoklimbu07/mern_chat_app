import { Link } from "react-router-dom";
import { Zap, ShieldCheck, MessageSquare } from "lucide-react";

const features = [
    { icon: Zap, title: "Real-time", desc: "Messages delivered instantly with Socket.IO." },
    { icon: ShieldCheck, title: "Secure", desc: "Passwords hashed, JWT-protected sessions." },
    { icon: MessageSquare, title: "Simple UI", desc: "Clean, distraction-free chat experience." },
];

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
            {/* Navbar */}
            <nav className="w-full px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                        <MessageSquare size={16} className="text-white" />
                    </div>
                    <span className="text-white font-bold text-lg tracking-tight">MerChat</span>
                </div>
                <div className="flex items-center gap-3">
                    <Link to="/login" className="text-sm text-white/80 hover:text-white font-medium transition">
                        Log In
                    </Link>
                    <Link
                        to="/signup"
                        className="px-4 py-2 rounded-xl bg-white text-indigo-600 text-sm font-semibold hover:bg-white/90 transition shadow-lg"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-8 py-16">
                <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center shadow-2xl border border-white/30">
                    <img src="/chat-icon.png" alt="MerChat" className="w-12 h-12 object-contain" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl font-extrabold text-white max-w-xl leading-tight">
                        Chat with anyone,{" "}
                        <span className="text-yellow-300">instantly</span>
                    </h1>
                    <p className="text-white/70 text-lg max-w-md mx-auto">
                        MerChat is a fast, real-time messaging app. Sign up free and start chatting in seconds.
                    </p>
                </div>

                <div className="flex gap-3">
                    <Link
                        to="/signup"
                        className="px-7 py-3 rounded-2xl bg-white text-indigo-600 font-bold text-sm hover:bg-white/90 active:scale-95 transition-all shadow-xl"
                    >
                        Get Started Free
                    </Link>
                    <Link
                        to="/login"
                        className="px-7 py-3 rounded-2xl bg-white/15 backdrop-blur text-white font-semibold text-sm border border-white/30 hover:bg-white/25 active:scale-95 transition-all"
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
                            className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur rounded-2xl px-5 py-6 border border-white/20 text-center"
                        >
                            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                                <Icon className="text-white" size={22} />
                            </div>
                            <h3 className="font-bold text-white">{title}</h3>
                            <p className="text-sm text-white/60">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="text-center py-5 text-xs text-white/40 border-t border-white/10">
                © {new Date().getFullYear()} harishankarlimbu · MerChat
            </footer>
        </div>
    );
}
