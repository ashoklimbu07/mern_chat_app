import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, Mail, Lock, CheckCircle } from "lucide-react";
import Alert from "../components/Alert";

export default function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "", confirm: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (form.password !== form.confirm) return setError("Passwords do not match.");
        if (form.password.length < 6) return setError("Password must be at least 6 characters.");
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form.email, password: form.password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Signup failed.");
            setSuccess("Account created! Redirecting...");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
            {/* Left panel */}
            <div className="hidden lg:flex flex-col justify-center items-center flex-1 px-12 text-white">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-6 shadow-xl">
                    <MessageSquare size={32} className="text-white" />
                </div>
                <h1 className="text-4xl font-bold mb-3">MerChat</h1>
                <p className="text-white/70 text-lg text-center max-w-xs">
                    Join thousands of users chatting in real-time.
                </p>
            </div>

            {/* Right panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
                    <div className="mb-7">
                        <h2 className="text-2xl font-bold text-gray-900">Create account</h2>
                        <p className="text-sm text-gray-500 mt-1">Free forever, no credit card needed</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Alert message={error} type="error" />
                        {success && (
                            <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
                                <CheckCircle size={15} />
                                {success}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
                            <div className="relative">
                                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-white transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Password</label>
                            <div className="relative">
                                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Min. 6 characters"
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-white transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Confirm Password</label>
                            <div className="relative">
                                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    name="confirm"
                                    type="password"
                                    value={form.confirm}
                                    onChange={handleChange}
                                    placeholder="Repeat your password"
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-white transition"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-indigo-200 disabled:opacity-60 mt-1"
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
