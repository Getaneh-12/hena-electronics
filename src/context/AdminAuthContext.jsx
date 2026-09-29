import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {

    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
        return localStorage.getItem("henaAdminLoggedIn") === "true";
    });


    const login = (username, password) => {

        if (
            username === "admin" &&
            password === "admin123"
        ) {

            localStorage.setItem(
                "henaAdminLoggedIn",
                "true"
            );

            setIsAdminLoggedIn(true);

            return true;
        }

        return false;
    };


    return (
        <AdminAuthContext.Provider
            value={{
                isAdminLoggedIn,
                login,
            }}
        >
            {children}
        </AdminAuthContext.Provider>
    );
}


export function useAdminAuth() {

    return useContext(AdminAuthContext);

}