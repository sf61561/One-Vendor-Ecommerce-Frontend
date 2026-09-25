import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../shared/AdminNavbar";

const AdminLayout = () => {
    return (
        <div>
            <AdminNavbar />
            <Outlet />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
            />
        </div>
    );
};

export default AdminLayout;