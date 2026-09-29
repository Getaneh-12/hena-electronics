import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

function AdminLogin() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { login } = useAdminAuth();


    const handleSubmit = (event) => {

        event.preventDefault();


        const success = login(
            username,
            password
        );


        if (success) {

            navigate("/admin");

        } else {

            alert("Invalid username or password.");

        }

    };


    return (

        <div className="admin-login-page">

            <div className="admin-login-card">

                <div className="admin-login-logo">
                    H
                </div>

                <h1>
                    Hena Electronics
                </h1>

                <p className="admin-login-subtitle">
                    Admin Dashboard
                </p>


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
                                setUsername(event.target.value)
                            }
                            placeholder="Enter username"
                            required
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
                                setPassword(event.target.value)
                            }
                            placeholder="Enter password"
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="admin-login-button"
                    >
                        Login
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