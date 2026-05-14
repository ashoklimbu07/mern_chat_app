import { AlertCircle, CheckCircle } from "lucide-react";

// Reusable alert box
// type: "error" | "success"
export default function Alert({ message, type = "error" }) {
    if (!message) return null;

    const styles = {
        error: { box: "bg-red-50 text-red-600 border-red-200", Icon: AlertCircle },
        success: { box: "bg-green-50 text-green-600 border-green-200", Icon: CheckCircle },
    };

    const { box, Icon } = styles[type];

    return (
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm ${box}`}>
            <Icon size={16} className="shrink-0" />
            <span>{message}</span>
        </div>
    );
}
