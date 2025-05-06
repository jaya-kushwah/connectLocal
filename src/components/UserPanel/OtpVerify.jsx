import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import rightImage from "../../assets/forgeot.png";
import "../../assets/Style/VerifyOtp.css";

function OtpVerify() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const inputsRef = useRef([]);
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    const handleChange = (index, value) => {
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to next input
            if (value && index < 5) {
                inputsRef.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleVerify = async () => {
        const finalOtp = otp.join("");

        if (finalOtp.length !== 6) {
            setMessage("Please enter a valid 6-digit OTP.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post(`http://localhost:8080/user/verifyotp/${email}`, {
                email,
                otp: finalOtp,
            });

            if (response.status === 200) {
                navigate("/ResetPassword", { state: { email } });
            } else {
                setMessage(response.data.message || "OTP verification failed.");
            }
        } catch (error) {
            setMessage("Invalid or expired OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("Text").trim();
        if (/^\d{6}$/.test(pasteData)) {
            const pasteArray = pasteData.split("");
            setOtp(pasteArray);
            pasteArray.forEach((digit, index) => {
                if (inputsRef.current[index]) {
                    inputsRef.current[index].value = digit;
                }
            });
            // Optional: Focus last input
            inputsRef.current[5]?.focus();
        } else {
            setMessage("Please paste a valid 6-digit OTP.");
        }
    };

    return (
        <div className="verify-container">
            <div className="verify-left">
                <div className="verify-content">
                    <h2>Enter OTP Verification</h2>
                    <p className="subtitle">
                        We've sent a 6-digit verification code to <b>{email}</b>
                    </p>

                    {message && <p className="verify-message">{message}</p>}

                    <div className="otp-box-group">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                className="otp-box"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={index === 0 ? (e) => handlePaste(e) : undefined}
                                ref={(el) => (inputsRef.current[index] = el)}
                            />
                        ))}

                    </div>

                    <button className="verify-btn" onClick={handleVerify} disabled={loading}>
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </div>
            </div>
            <div className="forgot-right d-none d-md-block">
                <div className="forgot-banner ">
                    <img src={rightImage} alt="Reset Visual" className="forgot-image" />
                    <h3>Secure Login</h3>
                    <p>Verifying your identity for a better experience.</p>
                </div>
            </div>
        </div>
    );
}

export default OtpVerify;


