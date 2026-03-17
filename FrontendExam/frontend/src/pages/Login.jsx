import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/authService.js";
import { useAuth } from "../context/AuthProvider.jsx";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {loginAuth} = useAuth();
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await loginService({
                email,
                password
            });

            console.log("Login result:", result);

            // Try possible token keys
            const token =
                result?.token ||
                result?.data?.token ||
                null;

            console.log("Token:", token);

            if (!token) {
                alert("Login successful but token not returned by API");
                return;
            }

             // Decode token payload and store in context
            const userData = JSON.parse(atob(token.split(".")[1]));
            loginAuth(userData);

            alert("Login successful");

            navigate("/");
        } catch (error) {
            console.error("Login error:", error.error || error.message);
            alert("Login failed");
        }
    };

    return (
        <div>
            <h2>Login Page</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;