import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

function ProtectedRoute({ children }) {
    const {
        isAdminLoggedIn,
    } = useAdminAuth();

    if (!isAdminLoggedIn) {
        return (
            <Navigate
                to="/admin/login"
                replace
            />
        );
    }

    return children;
}

export default ProtectedRoute;