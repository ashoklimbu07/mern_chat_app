import { Link, useLocation } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
    const { pathname } = useLocation();

    return (
        <nav className="w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-indigo-600 tracking-tight">
                MerChat
            </Link>

            {/* Nav links */}
            <div className="flex items-center gap-3">
                {pathname !== "/login" && (
                    <Link to="/login">
                        <Button variant="outline">Log In</Button>
                    </Link>
                )}
                {pathname !== "/signup" && (
                    <Link to="/signup">
                        <Button variant="primary">Sign Up</Button>
                    </Link>
                )}
            </div>
        </nav>
    );
}
