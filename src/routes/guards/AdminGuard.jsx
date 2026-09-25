import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";

const AdminGuard = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }
    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminGuard;