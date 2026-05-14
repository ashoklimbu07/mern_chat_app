import { Link } from "react-router-dom";
import { Zap, ShieldCheck, Layers } from "lucide-react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

const features = [
    { icon: Zap, title: "Real-time", desc: "Messages delivered instantly with no delay." },
    { icon: ShieldCheck, title: "Secure", desc: "Passwords hashed, JWT-protected sessions." },
    { icon: Layers, title: "Simple UI", desc: "Clean, distraction-free chat experience." },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            {/* Hero */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4 gap-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg">
                    <img src="/chat-icon.png" alt="MerChat" className="w-10 h-10 object-contain" />
                </div>

                <h1 className="text-4xl font-bold text-gray-800 max-w-lg leading-tight">
                    Chat with anyone, <span className="text-indigo-500">instantly</span>
                </h1>

                <p className="text-gray-500 text-base max-w-md">
                    MerChat is a simple, fast real-time messaging app. Sign up for free and start chatting in seconds.
                </p>

                <div className="flex gap-3 mt-2">
                    <Link to="/signup">
                        <Button variant="primary" className="px-8 py-3 text-base">Get Started</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="outline" className="px-8 py-3 text-base">Log In</Button>
                    </Link>
                </div>
            </main>

            {/* Features */}
            <section className="py-16 px-6 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    {features.map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                                <Icon className="text-indigo-500" size={24} />
                            </div>
                            <h3 className="font-semibold text-gray-800">{title}</h3>
                            <p className="text-sm text-gray-500">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="text-center py-4 text-xs text-gray-400 border-t border-gray-100">
                © {new Date().getFullYear()} harishankarlimbu
            </footer>
        </div>
    );
}
