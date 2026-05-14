import { useState } from "react";

export default function Signup({ onSwitch }) {
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

        if (form.password !== form.confirm) {
            return setError("Passwords do not match.");
        }
        if (form.password.length < 6) {
            return setError("Password must be at least 6 characters.");
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form.email, password: form.password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Signup failed.");
            setSuccess("Account created! You can now log in.");
            setForm({ email: "", password: "", confirm: "" });
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
                    <h2 className="text-2xl font-bold text-gray-800">Create an account</h2>
                    <p className="text-sm text-gray-500 mt-1">Sign up to start chatting</p>
                </div>

                {/* Alerts */}
                {error && (
                    <div className="mb-4 px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 px-4 py-2 rounded-lg bg-green-50 text-green-600 text-sm border border-green-200">
                        {success}
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
                            placeholder="Min. 6 characters"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirm"
                            value={form.confirm}
                            onChange={handleChange}
                            required
                            placeholder="Repeat your password"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                {/* Switch to login */}
                <p className="mt-5 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <button
                        onClick={onSwitch}
                        className="text-indigo-500 font-medium hover:underline"
                    >
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
}
