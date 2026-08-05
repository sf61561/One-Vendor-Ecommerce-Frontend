import { Link } from "react-router";
import commercehub from "../../assets/images/Commerce Hub.png"
import SearchBar from "./SearchBar";

const UserNavbar = () => {
    return (
        <div className="flex h-20 items-center shadow-2xl rounded-2xl px-10 justify-between w-full">
            <img src={commercehub} alt="Commerce Hub" className="h-20"/>
            <SearchBar />
            <div className="flex gap-2">
                <Link to="/auth/login" className="px-5 py-2 bg-blue-600 text-white hover:bg-blue-500 rounded-lg">Login</Link>
                <Link to="/auth/register" className="px-5 py-2 bg-green-600 text-white hover:bg-green-500 rounded-lg">Register</Link>
            </div>
        </div>
    );
};

export default UserNavbar;