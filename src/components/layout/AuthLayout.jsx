import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthLayout = () => {
    return (
        <div>
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

export default AuthLayout;