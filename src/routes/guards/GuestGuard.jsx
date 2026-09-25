import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";

const GuestGuard = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-400 border-t-transparent" />
            </div>
        );
    }

    if (user) {
        if (user.role === "admin") {
            return <Navigate to="/admin" replace />;
        }
        return <Navigate to="/" replace />;   // customer or any other role
    }

    return <Outlet />;
};

export default GuestGuard;