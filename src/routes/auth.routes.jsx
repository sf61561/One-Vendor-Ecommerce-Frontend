import AuthLayout from "../components/layout/AuthLayout";
import LoginPage from "../components/pages/LoginPage";
import RegisterPage from "../components/pages/RegisterPage";

const AuthRoutes = [
    {
        path: "/auth",
        element: <AuthLayout />,
        children:[
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            }
        ]
    }
]

export default AuthRoutes;