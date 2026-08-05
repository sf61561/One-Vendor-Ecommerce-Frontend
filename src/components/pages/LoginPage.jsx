import { useState } from "react";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className=" font-mono flex flex-col justify-center items-center h-screen shadow-2xl rounded-lg p-8 gap-8">
            <div>
                <h1 className="text-3xl font-bold text-blue-500">Login</h1>
            </div>
            <form className="flex flex-col gap-4 w-80">
                <div className="flex flex-col gap-1 text-xs">
                    <label htmlFor="username" className="text-gray-700 pl-1">Username</label>
                    <input type="text" placeholder="Username" className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full" />
                </div>
                <div className="flex flex-col text-xs">
                    <label htmlFor="password" className="text-gray-700 pl-1">Password</label>
                    <input type={showPassword ? "text" : "password"} placeholder="Password" className="mt-1 border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full" />
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="show-password" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                        <label htmlFor="show-password" className="text-gray-700 text-xs flex items-center">
                            Show Password
                        </label>
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full">Login</button>
            </form>
            <div>
                <p className="text-gray-500">Don't have an account? <a href="/auth/register" className="text-blue-500">Register</a></p>
            </div>
        </div>
    );
};

export default LoginPage;