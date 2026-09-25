import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const refreshAccessToken = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/refresh-token`, {
                    method: "POST",
                    credentials: "include",
                });
                const result = await response.json();
                console.log("Refresh token response:", result);
                if (result.success) {
                    setAccessToken(result.token);
                    setUser(result.user);
                }
            } catch (error) {
                console.error("Error refreshing access token:", error);
            }
            finally {
                setIsLoading(false);
            }
        };
        refreshAccessToken();
    }, []);
    const login = (token, user) => {
        setAccessToken(token);
        setUser(user);
    }
    const logout = () => {
        setAccessToken(null);
        setUser(null);
    }
    return (
        <AuthContext.Provider
        value={{
            user,
            accessToken,
            isLoading,
            login,
            logout
        }}
        >
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
  return useContext(AuthContext);
};