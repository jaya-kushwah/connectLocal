import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/Style/VerifyOtp.css";
import rightImage from "../../assets/forgeot.png";

function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            setMessage("Please fill in both password fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await axios.patch(`http://localhost:8080/user/resetpassword/${email}`, {
                password: newPassword,
            });

            if (response.status === 200) {
                navigate("/login");
            } else {
                setMessage("Something went wrong. Please try again.");
            }
        } catch (error) {
            setMessage("Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="verify-container">
            <div className="verify-left">
                <div className="verify-content">
                    <h2>Reset Your Password</h2>
                    <p className="subtitle">For account: <b>{email}</b></p>

                    {message && <p className="verify-message">{message}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="password"
                                placeholder="New Password"
                                className="form-control"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="verify-btn" disabled={loading}>
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>

            <div className="forgot-right d-none d-md-block">
                <div className="forgot-banner">
                    <img src={rightImage} alt="Reset Visual" className="forgot-image" />
                    <h3>Change Password</h3>
                    <p>Set a new password to keep your account safe.</p>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
