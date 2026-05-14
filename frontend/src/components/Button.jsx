// Reusable Button component
// variant: "primary" | "outline" | "ghost"
export default function Button({ children, onClick, type = "button", variant = "primary", className = "", disabled = false }) {
    const base = "px-5 py-2.5 rounded-lg text-sm font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-indigo-500 hover:bg-indigo-600 text-white",
        outline: "border border-indigo-500 text-indigo-500 hover:bg-indigo-50",
        ghost: "text-indigo-500 hover:bg-indigo-50",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
}
