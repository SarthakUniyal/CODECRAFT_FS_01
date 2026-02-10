import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { login, register } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = isLogin ? await login(formData) : await register(formData);

            loginUser(data);

            navigate('/');
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Server error";
            alert("AUTH ERROR: " + errorMsg);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isLogin ? "LOGIN" : "Create Account"}</h2>
                <p className="auth-subtitle">
                    {isLogin ? "Access your private session" : "Join the elite network"}
                </p>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="input-field">
                            <span className="icon">
                                <img src="/user.png" alt="" />
                            </span>
                            <input
                                type="text"
                                placeholder="FULL NAME"
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                required
                            />
                        </div>
                    )}

                    <div className="input-field">
                        <span className="icon">
                            <img src="/email.png" alt="" />
                        </span>
                        <input
                            type="email"
                            placeholder="EMAIL ADDRESS"
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div className="input-field">
                        <span className="icon">
                            <img src="/password.png" alt="" />
                        </span>
                        <input
                            type="password"
                            placeholder="PASSWORD"
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div className="forgot-password-container">
                        <span className="premium-link" onClick={() => navigate('/forgot-password')}>
                            Forget Password?
                        </span>
                    </div>

                    <button type="submit" className="auth-btn-black">
                        {isLogin ? "Login" : "Singup"}
                    </button>
                </form>

                <p className="auth-toggle">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "SIGN UP" : "LOG IN"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Auth;
