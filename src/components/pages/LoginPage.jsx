import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";


const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState({
        email: "",
        password: ""
    });
    const {user,login} = useAuth();
    const isvalid = Object.values(error).every((err) => err === "") && Object.values(formData).every((value) => value !== "");
    const handleemailChange = (e) => {
        const email = e.target.value.trim();
        setFormData({ ...formData, email: email });
        if(!email){
            setError({ ...error, email: "Email is required" });
        }
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)){
            setError({ ...error, email: "Invalid email address" });
        }
        else{
            setError({ ...error, email: "" });
        }
    }
    const handlePasswordChange = (e) => {
        const password = e.target.value; 
        setFormData({ ...formData, password: password });
        if(!password){
            setError({ ...error, password: "Password is required" });
        }
        else{
            setError({ ...error, password: "" });
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if(!result.success){
                toast.error(result.message || "Login failed. Please try again.");
            }
            login(result.token, result.user);
            toast.success(result.message || "Login successful!");
            if(result.user.role === "customer" || user.role === "customer"){
                navigate("/");
            }
            else if(result.user.role === "admin" || user.role === "admin"){
                navigate("/admin");
            }
            else {
                navigate("/auth/login");
            }
        }
        catch (error) {
            console.error("Error logging in:", error);
        }
        setIsSubmitting(true);
    }
    return (
        <div className=" font-mono flex flex-col justify-center items-center h-screen shadow-2xl rounded-lg p-8 gap-8">
            <div>
                <h1 className="text-3xl font-bold text-blue-500">Login</h1>
            </div>
            <form className="flex flex-col gap-4 w-80">
                <div className="flex flex-col gap-1 text-xs">
                    <label htmlFor="username" className="text-gray-700 pl-1">Username</label>
                    <input type="text" placeholder="Username" className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full" onChange={handleemailChange} />
                    {error.email && <p className="text-red-500 text-xs">{error.email}</p>}
                </div>
                <div className="flex flex-col text-xs">
                    <label htmlFor="password" className="text-gray-700 pl-1">Password</label>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder="Password" className="mt-1 border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full" onChange={handlePasswordChange} />
                        {error.password && <p className="text-red-500 text-xs">{error.password}</p>}
                        <button type="button" htmlFor="show-password" className="absolute top-3.5 right-3 text-gray-700 text-xs flex items-center" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id="remember" className="mr-2" />
                    <label htmlFor="remember" className="text-gray-700 text-xs">Remember me</label>
                </div>
                <button type="submit" className={isvalid && !isSubmitting ? `bg-blue-500 text-white rounded-lg px-4 py-2 w-full` : `bg-gray-500 text-white rounded-lg px-4 py-2 w-full`} disabled={!isvalid || isSubmitting} onClick={handleSubmit}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <div>
                <p className="text-gray-500">Don't have an account? <a href="/auth/register" className="text-blue-500">Register</a></p>
            </div>
        </div>
    );
};

export default LoginPage;