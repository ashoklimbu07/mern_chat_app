import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import Button from "../components/Button";
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

            setSuccess("Account created! Redirecting to login...");
            setTimeout(() => navigate("/login"), 1500);
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
                        <h2 className="text-2xl font-bold text-gray-800">Create an account</h2>
                        <p className="text-sm text-gray-500 mt-1">Sign up to start chatting</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Alert message={error} type="error" />
                        <Alert message={success} type="success" />

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
                            placeholder="Min. 6 characters"
                            required
                        />
                        <InputField
                            label="Confirm Password"
                            name="confirm"
                            type="password"
                            value={form.confirm}
                            onChange={handleChange}
                            placeholder="Repeat your password"
                            required
                        />

                        <Button type="submit" variant="primary" disabled={loading} className="w-full justify-center">
                            {loading ? "Creating account..." : "Sign Up"}
                        </Button>
                    </form>

                    <p className="mt-5 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-500 font-medium hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
