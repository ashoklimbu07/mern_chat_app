import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Alert from "../components/Alert";

export default function Login() {
    const navigate = useNavigate();
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

            localStorage.setItem("token", data.token);
            navigate("/chat");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
                        <p className="text-sm text-gray-500 mt-1">Log in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Alert message={error} type="error" />

                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                        />
                        <InputField
                            label="Password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Your password"
                            required
                        />

                        <Button type="submit" variant="primary" disabled={loading} className="w-full justify-center">
                            {loading ? "Logging in..." : "Log In"}
                        </Button>
                    </form>

                    <p className="mt-5 text-center text-sm text-gray-500">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="text-indigo-500 font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
