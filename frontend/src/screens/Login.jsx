import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form.email, password: form.password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Login failed.");
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user.id);
            localStorage.setItem("userEmail", data.user.email);
            navigate("/chat");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex">
            {/* Left branding panel */}
            <div className="hidden lg:flex flex-col justify-center items-center flex-1 px-12 border-r border-gray-800">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center mb-6 shadow-2xl shadow-indigo-500/30 overflow-hidden">
                    <img src="/chat-icon.png" alt="MerChat" className="w-10 h-10 object-contain" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-3">MerChat</h1>
                <p className="text-gray-400 text-lg text-center max-w-xs">
                    Real-time messaging, built simple and fast.
                </p>
            </div>

            {/* Right form panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    {/* Card */}
                    <div className="bg-gray-800 rounded-3xl border border-gray-700/50 shadow-2xl p-8">
                        <div className="mb-7">
                            <h2 className="text-2xl font-bold text-white">Welcome back</h2>
                            <p className="text-sm text-gray-400 mt-1">Sign in to continue</p>
                        </div>

                        {error && (
                            <div className="mb-4 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Email</label>
                                <div className="relative">
                                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-700/50 border border-gray-600/50 text-sm text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Password</label>
                                <div className="relative">
                                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Your password"
                                        required
                                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-700/50 border border-gray-600/50 text-sm text-gray-200 placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                                    >
                                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-600 active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-60 mt-1"
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-gray-500">
                            Don&apos;t have an account?{" "}
                            <Link to="/signup" className="text-indigo-400 font-semibold hover:text-indigo-300 transition">
                                Sign up free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
