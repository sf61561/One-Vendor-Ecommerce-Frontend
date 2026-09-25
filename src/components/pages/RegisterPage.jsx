import { useState } from "react";
import { Link } from "react-router";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const RegisterPage = () => {
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState({
        fullName: "Full Name is required",
        email: "Email is required",
        mobile: "Mobile Number is required",
        password: "Password is required",
        confirmPassword: "Confirm Password is required",
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
    const isFormValid = Object.values(error).every((err) => err === "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

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
            setImageError(`Image size is ${(file.size / (1024*1024)).toFixed(1)}MB. Must be under 2MB.`);
            return;
        }
        try{
            setPreview(null);
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
            setFormData({...formData,image: file});
        }
        catch (error) {
            if (error.message.includes("File too large")) {
                setImageError("Image must be under 2MB.");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    };
    const handleFullNameChange = (e) => {
        const fullNameValue = e.target.value.trim();
        setFormData({...formData,fullName: fullNameValue});
        if(!fullNameValue){
            setError({...error,fullName: "Full Name is required"});
        }
        else if(fullNameValue.length < 3){
            setError({...error,fullName: "Full Name must be at least 3 characters long"});
        }
        else{
            setError({...error,fullName: ""});
        }
    }
    const handleEmailChange = (e) => {
        const emailValue = e.target.value.trim();
        setFormData({...formData,email: emailValue});
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if(!emailValue){
            setError({...error,email: "Email is required"});
        }
        else if(!emailRegex.test(emailValue)){
            setError({...error,email: "Please enter a valid email address"});
        }
        else{
            setError({...error,email: ""});
        }
    }
    const handleMobileChange = (e) => {
        const mobileValue = e.target.value.trim();
        setFormData({...formData,mobile: mobileValue});
        const mobileRegex = /^(\+880|880|0)1[3-9]\d{8}$/;
        if(!mobileValue){
            setError({...error,mobile: "Mobile Number is required"});
        }
        else if(!mobileRegex.test(mobileValue)){
            setError({...error,mobile: "Please enter a valid mobile number"});
        }
        else{
            setError({...error,mobile: ""});
        }
    }
    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setFormData({...formData,password: passwordValue});
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,}$/;
        if(!passwordValue){
            setError({...error,password: "Password is required"});
        }
        else if(!passwordRegex.test(passwordValue)){
            setError({...error,password: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character"});
        }
        else{
            setError({...error,password: ""});
        }
    }
    const handleConfirmPasswordChange = (e) => {
        const confirmPasswordValue = e.target.value;
        setFormData({...formData,confirmPassword: confirmPasswordValue});
        if(!confirmPasswordValue){
            setError({...error,confirmPassword: "Confirm Password is required"});
        }
        else if(confirmPasswordValue !== formData.password){
            setError({...error,confirmPassword: "Passwords do not match"});
        }
        else{
            setError({...error,confirmPassword: ""});
        }
    }
    const handleSave = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("image", formData.image);
        data.append("fullName", formData.fullName);
        data.append("email", formData.email);
        data.append("mobile", formData.mobile);
        data.append("password", formData.password);
        if (isSubmitting) return;
        try{
            setIsSubmitting(true);
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/register`, {
                method: "POST",
                body: data
            });
            const result = await response.json();
            if (!result.success && result.errors) {
                setError(prev => ({ ...prev, ...result.errors }));
            }
            else if(result.success){
                e.target.reset();
                setFormData({
                    image: null,
                    fullName: "",
                    email: "",
                    mobile: "",
                    password: "",
                    confirmPassword: "",
                });
                setPreview(null);
                setError({
                    fullName: "Full Name is required",
                    email: "Email is required",
                    mobile: "Mobile Number is required",
                    password: "Password is required",
                    confirmPassword: "Confirm Password is required",
                });
                setTimeout(() => navigate("/auth/login"), 3000);
            }
            toast(result.message, {
                type: result.success ? "success" : "error",
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        catch (error) {
            console.error("Error registering user:", error);
        } finally {
            setIsSubmitting(false);
        }
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
                        <input type="text" id="full-name" placeholder="Full Name" className="border border-gray-300 rounded-lg px-4 py-2 w-full" onChange={(e) => handleFullNameChange(e)} required/>
                        {error.fullName && <span className="text-red-500 text-xs mb-4">{error.fullName}</span>}
                    </div>
                    <div className="flex flex-col gap-1 text-xs">
                        <label htmlFor="email" className="text-gray-700 pl-1">Email</label>
                        <input type="email" id="email" placeholder="Email" className="border border-gray-300 rounded-lg px-4 py-2 w-full" onChange={(e) => handleEmailChange(e)} required />
                        {error.email && <span className="text-red-500 text-xs mb-4">{error.email}</span>}
                    </div>
                    <div className="flex flex-col gap-1 text-xs">
                        <label htmlFor="mobile" className="text-gray-700 pl-1">Mobile Number</label>
                        <input type="tel" id="mobile" placeholder="Mobile Number" className="border border-gray-300 rounded-lg px-4 py-2 w-full" pattern="^(\+880|880|0)1[3-9]\d{8}$" onChange={(e) => handleMobileChange(e)} required />
                        {error.mobile && <span className="text-red-500 text-xs mb-4">{error.mobile}</span>}
                    </div>
                    <div className="flex flex-col gap-1 text-xs">
                        <label htmlFor="password" className="text-gray-700 pl-1">Password</label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" className="border border-gray-300 rounded-lg px-4 py-2 w-full" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,}" onChange={(e) => handlePasswordChange(e)} required />
                            <button type="button" className="absolute right-3 top-3 p-0 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {error.password && <span className="text-red-500 text-xs mb-4">{error.password}</span>}
                    </div>
                    <div className="flex flex-col gap-1 text-xs">
                        <label htmlFor="confirm-password" className="text-gray-700 pl-1">Confirm Password</label>
                        <div className="relative">
                            <input type={showConfirmPassword ? "text" : "password"} id="confirm-password" placeholder="Confirm Password" className="border border-gray-300 rounded-lg px-4 py-2 w-full" onChange={(e) => handleConfirmPasswordChange(e)} required />
                            <button type="button" className="absolute right-3 top-3 p-0 text-gray-500" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {error.confirmPassword && <span className="text-red-500 text-xs mb-4">{error.confirmPassword}</span>}
                    </div>
                    <button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className={`w-full rounded-lg px-4 py-2 text-white transition-colors duration-200 ${
                            !isFormValid || isSubmitting
                                ? "cursor-not-allowed bg-gray-400"
                                : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            {isSubmitting && (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            )}
                            <span>
                                {isSubmitting ? "Registering..." : "Register"}
                            </span>
                        </div>
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