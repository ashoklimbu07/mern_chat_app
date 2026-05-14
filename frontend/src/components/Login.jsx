import { useState } from "react";

export default function Login({ onSwitch }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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

            // store token and redirect / update state as needed
            localStorage.setItem("token", data.token);
            alert(`Welcome back! Logged in as ${data.user.email}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
                    <p className="text-sm text-gray-500 mt-1">Log in to your account</p>
                </div>

                {/* Error alert */}
                {error && (
                    <div className="mb-4 px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            placeholder="Your password"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                {/* Switch to signup */}
                <p className="mt-5 text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <button
                        onClick={onSwitch}
                        className="text-indigo-500 font-medium hover:underline"
                    >
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
}
