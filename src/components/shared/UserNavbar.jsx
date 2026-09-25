import { Link } from "react-router";
import commercehub from "../../assets/images/Commerce Hub.png"
import SearchBar from "./SearchBar";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const UserNavbar = () => {
    const {user,logout} = useAuth();
    const navigate = useNavigate();
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try{
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
                method: "POST",
                body: JSON.stringify({userId: user.id}),
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error("Logout failed");
            }
            logout();
            toast.success("Logout successful!");
            navigate("/auth/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }
    return (
        <div className="flex h-20 items-center shadow-2xl rounded-2xl px-10 justify-between w-full">
            <Link to="/"><img src={commercehub} alt="Commerce Hub" className="h-20"/></Link>
            <SearchBar />
            {user ? (
                <div className="relative">
                    <button>
                        <img src={user.profileImage} alt="Profile" className="h-8 w-8 rounded-full mr-2 inline-block" onClick={() => setProfileMenuOpen(!profileMenuOpen)}/>
                    </button>
                    <ul className={`${profileMenuOpen ? 'block' : 'hidden'} absolute right-0 top-10 bg-white shadow-lg rounded-lg py-2 w-48 z-50`}>
                        <li className="px-4 py-2  hover:bg-gray-300 cursor-pointer">
                            <Link to="/profile">Profile</Link>
                        </li>
                        <button onClick={() => handleLogout()} className="w-full text-start"><li className="px-4 py-2 hover:bg-gray-300 cursor-pointer">
                            Logout
                        </li></button>
                    </ul>
                </div>
            ) : (
            <div className="flex gap-2">
                <Link to="/auth/login" className="px-5 py-2 bg-blue-600 text-white hover:bg-blue-500 rounded-lg">Login</Link>
                <Link to="/auth/register" className="px-5 py-2 bg-green-600 text-white hover:bg-green-500 rounded-lg">Register</Link>
            </div>
            )}
        </div>
    );
};

export default UserNavbar;