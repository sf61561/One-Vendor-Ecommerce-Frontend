import { Outlet } from "react-router";
import "../../styles/MainLayout.css"

const MainLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default MainLayout;