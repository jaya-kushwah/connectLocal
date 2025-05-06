import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/Style/ForgotPassword.css";
import rightImage from "../../assets/forgeot.png"; 

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => setEmail(e.target.value);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSendCode = async () => {
        if (!email) return setMessage("Please enter your email address.");
        if (!validateEmail(email)) return setMessage("Please enter a valid email address.");

        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post(
                "http://localhost:8080/user/forgotpassword",
                { email },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200) {
                setMessage("Verification code sent! Check your email.");
                navigate("/VerifyOtp", { state: { email } });
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
        <div className="forgot-wrapper">
            <div className="forgot-left">
                <h2 className="forgot-title">Forgot Password</h2>
                <p className="forgot-subtitle">
                    Enter your email address to receive a verification code.
                </p>

                {message && <p className="forgot-message">{message}</p>}

                <input
                    type="email"
                    className="forgot-input"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleInputChange}
                />

                <button className="forgot-button" onClick={handleSendCode} disabled={loading}>
                    {loading ? "Sending..." : "Send Code"}
                </button>
            </div>

            <div className="forgot-right d-none d-md-block">
                <div className="forgot-banner ">
                    <img src={rightImage} alt="Reset Visual" className="forgot-image" />
                    <p className="forgot-tagline">
                        Don’t worry! We’ll help you reset it and get back on track!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
