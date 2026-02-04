import { useSession } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

const SessionExpiredBanner = () => {
    const { sessionExpired, clearSessionExpired } = useSession();
    const navigate = useNavigate()
    const { logout } = useAuth()
    if (!sessionExpired) return null;

    const handleLoginRedirect = () => {
        clearSessionExpired();
        logout()
        navigate("/login", {replace: true})
    }

    return (
        <div className="fixed top-1 inset-x-1 z-50 bg-red-50 text-red-500 border border-red-500 rounded px-6 py-5 flex items-center justify-between">
            <p className="text-sm font-medium">
                Your session has expired. Please login again.
            </p>
            <button
                onClick={handleLoginRedirect}
                className="text-sm underline hover:opacity-80"
            >
                Login again
            </button>
        </div>
    );
};

export default SessionExpiredBanner;
