import { useState } from "react";
import { Link } from "react-router";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const RegisterPage = () => {
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
    });
    const [formData, setFormData] = useState({
        image: null,
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [imageError, setImageError] = useState("");
    const isFormValid =!Object.values(error).some(Boolean) &&
                        formData.fullName &&
                        formData.email &&
                        formData.mobile &&
                        formData.password &&
                        formData.confirmPassword;

    const handleImageChange = (e) => {
        setPreview(null);
        const file = e.target.files[0];
        if (!file) return;
        const allowedTypes = [
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/webp"
        ];
        if (!allowedTypes.includes(file.type)) {
            setImageError("Only JPG, JPEG and PNG images are allowed.");
            return;
        }
        const maxSize = 2 * 1024 * 1024;
            if (file.size > maxSize) {
            setImageError("Image size must be less than 2MB.");
            return;
        }
        setPreview(null);
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
        setFormData({...formData,image: file});
    };
    const handleSave = (e) => {
        e.preventDefault();
        if(!formData.fullName || !formData.email || !formData.mobile || !formData.password || !formData.confirmPassword) {
            alert("Please fill in all fields");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError({...error, confirmPassword: "Passwords do not match"});
            return;
        }
        const data = new FormData();
        data.append("image", formData.image);
        data.append("fullName", formData.fullName);
        data.append("email", formData.email);
        data.append("mobile", formData.mobile);
        data.append("password", formData.password);
        fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            body: data
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to register");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Registration successful:", data);
        })
        .catch((error) => {
            console.error("Registration error:", error);
        });
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen font-mono rounded-lg p-8 gap-8">
            <div>
                <h1 className="text-3xl font-bold text-green-500">Register</h1>
            </div>
            <form onSubmit={(e) => handleSave(e)} className="flex flex-col gap-4 w-80" encType="multipart/form-data">
                <div className="flex flex-col gap-2 w-80">
                    <div className="flex flex-col gap-2">
                        {preview ? (
                            <div className="flex justify-center">
                                <img src={preview} alt="Preview" className="flex w-30 h-30 rounded-full justify-center text-center items-center" />
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <CgProfile className="flex w-30 h-30 rounded-full justify-center text-center items-center text-gray-300" />
                            </div>
                        )}
                        <label
                            htmlFor="profile-picture"
                            className="flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-blue-500 hover:bg-blue-50"
                            >
                            <p className="mt-2 text-gray-600">Click to upload profile picture</p>
                            <p className="text-sm text-gray-400">PNG, JPG, JPEG</p>
                            <p className="text-xs text-gray-500">Image size must be less than 2MB</p>
                        </label>
                        <input onChange={(e) => handleImageChange(e)} accept="image/png,image/jpg,image/jpeg,image/webp" type="file" id="profile-picture" className="hidden" />
                        {imageError && <span className="text-red-500 text-xs mb-4">{imageError}</span>}
                    </div>
                    <div className="flex flex-col gap-1 text-xs">
                        <label htmlFor="full-name" className="text-gray-700 pl-1">Full Name</label>
                        <input type="text" id="full-name" placeholder="Full Name" className="border border-gray-300 rounded-lg px-4 py-2 w-full" onChange={(e) => {
                            setFormData({...formData,fullName: e.target.value.trim()})
                            setError({...error,fullName: e.target.value ? "" : "Full Name is required"})
                        }} required/>
                        {error.fullName && <span className="text-red-500 text-xs mb-4">{error.fullName}</span>}
                    </div>
                    <div className="flex flex-col gap-1 text-xs">
                        <label htmlFor="email" className="text-gray-700 pl-1">Email</label>
                        <input type="email" id="email" placeholder="Email" className="border border-gray-300 rounded-lg px-4 py-2 w-full"  pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$" onChange={(e) => {
                            setFormData({...formData,email: e.target.value})
                            setError({...error,email: e.target.validity.valid ? "" : "Please enter a valid email address"})
                        }} onInvalid={(e) => e.target.setCustomValidity("Please enter a valid email address.")} onInput={(e) => e.target.setCustomValidity("")} required />
                        {error.email && <span className="text-red-500 text-xs mb-4">{error.email}</span>}
                    </div>
                    <div className="flex flex-col gap-1 text-xs">
                        <label htmlFor="mobile" className="text-gray-700 pl-1">Mobile Number</label>
                        <input type="tel" id="mobile" placeholder="Mobile Number" className="border border-gray-300 rounded-lg px-4 py-2 w-full" pattern="^(\+880|880|0)1[3-9]\d{8}$" onChange={(e) => {
                            setFormData({...formData,mobile: e.target.value})
                            setError({...error,mobile: e.target.validity.valid ? "" : "Please enter a valid mobile number"})
                        }} required />
                        {error.mobile && <span className="text-red-500 text-xs mb-4">{error.mobile}</span>}
                    </div>
                    <div className="flex flex-col gap-1 text-xs">
                        <label htmlFor="password" className="text-gray-700 pl-1">Password</label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" className="border border-gray-300 rounded-lg px-4 py-2 w-full" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,}" onChange={(e) => {
                                    setFormData({...formData,password: e.target.value})
                                    setError({...error,password: e.target.value ? (e.target.validity.valid ? "" : "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number and one special character.") : "Password is required"})
                                }
                            } required />
                            <button type="button" className="absolute right-3 top-3 p-0 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {error.password && <span className="text-red-500 text-xs mb-4">{error.password}</span>}
                    </div>
                    <div className="flex flex-col gap-1 text-xs">
                        <label htmlFor="confirm-password" className="text-gray-700 pl-1">Confirm Password</label>
                        <div className="relative">
                            <input type={showConfirmPassword ? "text" : "password"} id="confirm-password" placeholder="Confirm Password" className="border border-gray-300 rounded-lg px-4 py-2 w-full" onChange={(e) => {
                                setFormData({...formData,confirmPassword: e.target.value})
                                setError({
                                    ...error,
                                    confirmPassword:
                                        e.target.value === formData.password
                                            ? ""
                                            : "Passwords do not match"
                                });
                            }} required />
                            <button type="button" className="absolute right-3 top-3 p-0 text-gray-500" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {error.confirmPassword && <span className="text-red-500 text-xs mb-4">{error.confirmPassword}</span>}
                    </div>
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`w-full rounded-lg px-4 py-2 text-white ${
                            isFormValid
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                        >
                        Register
                    </button>
                </div>
            </form>
            <div>
                <span>Already have an account? </span>
                <Link to="/auth/login" className="text-green-500 hover:underline">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;