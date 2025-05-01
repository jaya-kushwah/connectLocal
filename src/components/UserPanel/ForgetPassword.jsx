import React, { useState } from "react";
import axios from "axios";
// import logo from "../assets/images/reset-password.png";
// import "../assets/Style/style.css";
// import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSendCode = async () => {
        if (!email) {
            setMessage("Please enter your email address.");
            return;
        }
        if (!validateEmail(email)) {
            setMessage("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post(
                "http://localhost:8080/user/forgotpassword",
                { email }, { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200) {
                setMessage("Verification code sent! Check your email.");
                navigate("/VerifyOtp", { state: { email: email } });
            } else {
                setMessage(response.data.message || "Failed to send code. Try again later.");
            }
        } catch (error) {
            setMessage("Error sending code. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container-1">
                <div className="text-center mb-4">
                    <a href="/">
                        <img className="logo" src={logo} width="57" height="60" alt="Logo" />
                    </a>
                </div>

                <h1 className="forget">Forgot Password</h1>

                <p className="text-center text-black-800 mb-4">
                    Please enter your email address to receive a verification code.
                </p>

                {message && <p className="message">{message}</p>}

                <div>
                    <input
                        className="email"
                        placeholder="Email Address"
                        type="email"
                        value={email}
                        onChange={handleInputChange}
                        aria-label="Enter your email address"
                    />
                </div>

                <button className="send-button" onClick={handleSendCode} disabled={loading}>
                    {loading ? "Sending..." : "Send Code"}
                </button>
            </div>
        </Layout>
    );
}

export default ForgotPassword;