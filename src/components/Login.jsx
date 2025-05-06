import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import women from "../assets/women.png";
import thunder from "../assets/thunderimg.png";
import image from "../assets/logon.jpg.png";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const cookies = new Cookies();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email) return toast.error("Please enter email");
        if (!password) return toast.error("Please enter a password");

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if (!emailRegex.test(email)) return toast.error("Please enter a valid email");

        try {
            const response = await fetch("http://localhost:8080/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.status === 200 && result?.data) {
                cookies.set('user', JSON.stringify(result.data));
                toast.success(result.message || "Login successful!");

                setTimeout(() => {
                    navigate(result.data.auth === "admin" ? "/AdminDashboard" : "/dashboard");
                }, 1500);
            } else {
                toast.error(result.message || "Login failed");
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Something went wrong. Try again later.");
        }
    };

    // Optional: Handle Enter key to trigger login
    useEffect(() => {
        const handleEnter = (e) => {
            if (e.key === 'Enter') handleLogin();
        };
        window.addEventListener('keydown', handleEnter);
        return () => window.removeEventListener('keydown', handleEnter);
    }, [email, password]);

    return (
        <>
            <div className="Login" style={{
                width: 1366, height: 700, position: 'fixed', background: 'white',
                borderRadius: 24, overflow: 'scroll', top: -1, left: -50
            }}>
                <div style={{ width: 683, height: 736, left: 640, top: 0, position: 'absolute', background: '#1e3a8a' }} />
                <div style={{
                    width: 412, height: 511, left: 755, top: 32, position: 'absolute',
                    background: 'rgba(255, 255, 255, 0.21)', borderRadius: 46,
                    border: '1px rgba(255, 255, 255, 0.52) solid',
                    backdropFilter: 'blur(13.60px)'
                }} />
                <img src={women} alt="background" style={{
                    width: 780, height: 524, left: 493, top: 128,
                    position: 'absolute', marginTop: "-8%"
                }} />
                <div style={{ width: 364, height: 469, left: 150, top: 40, position: 'absolute' }}>
                    <div style={{
                        left: 135, top: 0, position: 'absolute',
                        color: 'black', fontSize: 30, fontWeight: '700',
                        textTransform: 'uppercase'
                    }}>Login</div>

                    <img src={image} alt="Logo" style={{ height: "72px", marginLeft: "65px", marginTop: "-17px" }} />

                    <p style={{
                        left: 19, top: 52, position: 'absolute', color: '#525252',
                        fontSize: 18, fontFamily: 'Poppins', fontWeight: '400'
                    }}>How to i get started lorem ipsum dolor at?</p>

                    {/* Email */}
                    <div style={{ width: 364, height: 52, left: 0, top: 102, position: 'absolute' }}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="on" // Enable suggestions
                            name="email" // Adding a name ensures better autocomplete handling
                            style={{
                                width: '100%', padding: 14, borderRadius: 16,
                                border: '1px solid #F0EDFF',
                                background: 'rgba(239, 237, 255, 0.80)', outline: 'none'
                            }}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ width: 364, height: 52, left: 0, top: 183, position: 'absolute' }}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            style={{
                                width: '100%', padding: 14, borderRadius: 16,
                                border: '1px solid #F0EDFF',
                                background: 'rgba(239, 237, 255, 0.80)', outline: 'none'
                            }}
                        />
                        <div>
                            <Link to="/forgetpass" style={{
                                marginLeft: "62%", marginTop: 5, fontSize: 13, color: "blue", display: 'block'
                            }}>Forgotten Password ?</Link>
                        </div>
                    </div>

                    {/* Login button */}
                    <div style={{ width: 124, height: 52, left: 120, top: 271, position: 'absolute' }}>
                        <button
                            type="button"
                            onClick={handleLogin}
                            style={{
                                color: "white", width: 124, height: 56,
                                background: 'linear-gradient(100deg, #9181F4 0%, #5038ED 100%)',
                                boxShadow: '0px 8px 21px rgba(0, 0, 0, 0.16)',
                                borderRadius: 16, border: '1px #F0EDFF solid'
                            }}
                        >
                            Login Now
                        </button>
                    </div>

                    {/* Create Account */}
                    <div style={{ top: 328, position: 'absolute', width: '100%' }}>
                        <div className="text-center mt-2">
                            Don't Have An Account?{" "}
                            <button
                                onClick={() => navigate("/signup")}
                                className="btn btn-link p-0 text-primary text-decoration-underline"
                            >
                                Create Account
                            </button>
                        </div>
                    </div>

                    {/* Google and Facebook */}
                    <div style={{ width: 364, height: 120, left: 0, top: 379, position: 'absolute' }}>
                        {/* Google */}
                        <a href="https://accounts.google.com/"
                            style={{
                                width: 364, height: 52, display: 'flex', alignItems: 'center',
                                justifyContent: 'center', background: 'green', color: 'white',
                                borderRadius: 16, border: '1px #F0EDFF solid', marginBottom: 10,
                                textDecoration: 'none', fontWeight: '700'
                            }}>
                            <FaGoogle size={20} />
                            <span style={{ marginLeft: 10 }}>Login with Google</span>
                        </a>

                        {/* Facebook */}
                        <a href="https://www.facebook.com/"
                            style={{
                                width: 364, height: 52, display: 'flex', alignItems: 'center',
                                justifyContent: 'center', background: '#1e3a8a', color: 'white',
                                borderRadius: 16, border: '1px #F0EDFF solid',
                                textDecoration: 'none'
                            }}>
                            <FaFacebookF size={20} />
                            <span style={{ marginLeft: 10 }}>Login with Facebook</span>
                        </a>
                    </div>
                </div>

                {/* Thunder Icon */}
                <div style={{ width: 79, height: 79, left: 720, top: 380, position: 'absolute' }}>
                    <div style={{
                        width: 79, height: 79, background: 'white',
                        borderRadius: '50%', position: 'absolute'
                    }} />
                    <img src={thunder} alt="Thunder" style={{
                        width: 75, height: 75, position: 'absolute', left: 3, top: 3
                    }} />
                </div>

                {/* Motivational Text */}
                <div style={{
                    left: 795, top: 55, position: 'absolute',
                    color: 'white', fontSize: 32, fontFamily: 'Poppins',
                    fontWeight: '700'
                }}>
                    Very good<br />works are<br />waiting for<br />you Login<br />Now!!!
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;
