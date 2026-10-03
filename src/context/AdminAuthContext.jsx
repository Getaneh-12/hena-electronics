import {
    createContext,
    useContext,
    useState,
} from "react";

const AdminAuthContext =
    createContext(null);

const API_URL =
    "http://localhost:5000/api/auth";

export function AdminAuthProvider({
    children,
}) {
    const [
        isAdminLoggedIn,
        setIsAdminLoggedIn,
    ] = useState(() => {
        return Boolean(
            localStorage.getItem(
                "henaAdminToken"
            )
        );
    });

    const login = async (
        username,
        password
    ) => {
        try {
            const response =
                await fetch(
                    `${API_URL}/login`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            username,
                            password,
                        }),
                    }
                );

            const data =
                await response.json();

            if (
                !response.ok ||
                !data.success ||
                !data.token
            ) {
                return {
                    success: false,
                    message:
                        data.message ||
                        "Invalid username or password",
                };
            }

            localStorage.setItem(
                "henaAdminToken",
                data.token
            );

            setIsAdminLoggedIn(
                true
            );

            return {
                success: true,
            };
        } catch (error) {
            console.error(
                "Admin login error:",
                error
            );

            return {
                success: false,
                message:
                    "Unable to connect to the server",
            };
        }
    };

    const logout = () => {
        localStorage.removeItem(
            "henaAdminToken"
        );

        setIsAdminLoggedIn(
            false
        );
    };

    const getToken = () => {
        return localStorage.getItem(
            "henaAdminToken"
        );
    };

    return (
        <AdminAuthContext.Provider
            value={{
                isAdminLoggedIn,
                login,
                logout,
                getToken,
            }}
        >
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    return useContext(
        AdminAuthContext
    );
}