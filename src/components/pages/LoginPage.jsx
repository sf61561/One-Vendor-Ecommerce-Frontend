import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState({ email: "", password: "" });

    const isValid = Object.values(error).every((err) => err === "")
                 && Object.values(formData).every((value) => value !== "");

    const handleEmailChange = (e) => {
        const email = e.target.value.trim();
        setFormData({ ...formData, email });
        if (!email) {
            setError({ ...error, email: "Email is required" });
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setError({ ...error, email: "Invalid email address" });
        } else {
            setError({ ...error, email: "" });
        }
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setFormData({ ...formData, password });
        if (!password) {
            setError({ ...error, password: "Password is required" });
        } else {
            setError({ ...error, password: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        try {
            setIsSubmitting(true);
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (!result.success) {
                toast.error(result.message || "Login failed. Please try again.");
                return;
            }
            login(result.token, result.user);
            toast.success("Login successful!");
            if (result.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="font-mono flex flex-col justify-center items-center h-screen shadow-2xl rounded-lg p-8 gap-8">
            <div>
                <h1 className="text-3xl font-bold text-blue-500">Login</h1>
            </div>
            <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
                {/* Email */}
                <div className="flex flex-col gap-1 text-xs">
                    <label htmlFor="email" className="text-gray-700 pl-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                        onChange={handleEmailChange}
                    />
                    {error.email && <p className="text-red-500 text-xs">{error.email}</p>}
                </div>
                {/* Password */}
                <div className="flex flex-col text-xs">
                    <label htmlFor="password" className="text-gray-700 pl-1">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Password"
                            className="mt-1 border border-gray-300 rounded-lg px-4 py-2 w-full"
                            onChange={handlePasswordChange}
                        />
                        {error.password && <p className="text-red-500 text-xs">{error.password}</p>}
                        <button
                            type="button"
                            className="absolute top-3.5 right-3 text-gray-700 text-xs flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                {/* Remember me */}
                <div className="flex items-center">
                    <input type="checkbox" id="remember" className="mr-2" />
                    <label htmlFor="remember" className="text-gray-700 text-xs">Remember me</label>
                </div>
                {/* Submit */}
                <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className={`rounded-lg px-4 py-2 w-full text-white transition-colors duration-200 ${
                        !isValid || isSubmitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        {isSubmitting && (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        )}
                        <span>{isSubmitting ? "Logging in..." : "Login"}</span>
                    </div>
                </button>
            </form>
            <div>
                <p className="text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Link to="/auth/register" className="text-blue-500">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;