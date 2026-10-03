import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import henaLogo from "../assets/hena-logo.png";

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { login } = useAdminAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        const result = await login(
            username,
            password
        );

        setLoading(false);

        if (result.success) {
            navigate("/admin");
            return;
        }

        setError(
            result.message ||
            "Invalid username or password."
        );
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">

                <div className="admin-login-logo">
                    <img
                        src={henaLogo}
                        alt="Hena Electronics"
                    />
                </div>

                <h1>
                    Hena Electronics
                </h1>

                <p className="admin-login-subtitle">
                    Admin Dashboard
                </p>

                {error && (
                    <div className="admin-login-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(event) =>
                                setUsername(
                                    event.target.value
                                )
                            }
                            placeholder="Enter username"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Enter password"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="admin-login-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>

                <Link
                    to="/"
                    className="back-home"
                >
                    ← Back to Website
                </Link>

            </div>
        </div>
    );
}

export default AdminLogin;
