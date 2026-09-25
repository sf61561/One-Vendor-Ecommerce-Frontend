import AuthLayout from "../components/layout/AuthLayout";
import LoginPage from "../components/pages/LoginPage";
import RegisterPage from "../components/pages/RegisterPage";
import GuestGuard from "./guards/GuestGuard";

const AuthRoutes = [
    {
        element: <GuestGuard />,
        children: [
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
    }
]

export default AuthRoutes;