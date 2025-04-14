import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import phoneImage from "../assets/phone1.png";
import phoneImage2 from "../assets/phone2.png";
import phoneImage3 from "../assets/phone3.png";
import Logo from "../assets/ConnectLocal.png";
import Google from "../assets/Google.png";
import "../assets/Style/Signup.css"

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        location: "",
        interests: [],
    });

    const [validation, setValidation] = useState({
        nameValid: true,
        emailValid: true,
        passwordValid: true,
        mobileValid: true,
        locationValid: true,
        interestsValid: true,
        termsAccepted: false,
    });

    const [uiState, setUiState] = useState({
        showPassword: false,
        isSubmitting: false,
        showOtpForm: false,
        passwordStrength: "",
    });

    const navigate = useNavigate();

    const availableInterests = [
        "Music Concerts",
        "Art Exhibitions",
        "Food Festivals",
        "Tech Meetups",
        "Yoga Classes",
        "Book Clubs",
        "Sports Events",
        "Theater Shows",
        "Dance Workshops",
        "Local Markets",
    ].map((interest) => ({ name: interest }));

    // Validation functions remain the same
    const validateField = (name, value) => {
        switch (name) {
            case "name":
                return /^[a-zA-Z ]{2,30}$/.test(value);
            case "email":
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            case "password":
                return value.length >= 8;
            case "mobile":
                return value.length >= 10;
            case "location":
                return value.length >= 3;
            default:
                return true;
        }
    };

    const calculatePasswordStrength = (password) => {
        if (!password) return "";
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*]/.test(password);

        if (password.length < 8) return "Weak";
        if (password.length >= 12 && hasUpper && hasNumber && hasSpecial)
            return "Strong";
        if (password.length >= 8 && (hasUpper || hasNumber)) return "Medium";
        return "Weak";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setValidation((prev) => ({
            ...prev,
            [`${name}Valid`]: validateField(name, value),
        }));

        if (name === "password") {
            setUiState((prev) => ({
                ...prev,
                passwordStrength: calculatePasswordStrength(value),
            }));
        }
    };

    const handlePhoneChange = (value) => {
        setFormData((prev) => ({ ...prev, mobile: value }));
        setValidation((prev) => ({ ...prev, mobileValid: value.length >= 10 }));
    };

    const handleInterestChange = (e) => {
        setFormData((prev) => ({ ...prev, interests: e.value }));
        setValidation((prev) => ({
            ...prev,
            interestsValid: e.value.length > 0 && e.value.length <= 5,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUiState((prev) => ({ ...prev, isSubmitting: true }));

        try {
            const response = await fetch("http://localhost:8080/user/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    interests: formData.interests.map((i) => i.name),
                }),
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                throw new Error(text || "Server returned non-JSON response");
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            toast.success("Registration successful! Please verify your email.");
            setUiState((prev) => ({ ...prev, showOtpForm: true }));
        } catch (err) {
            const errorMsg = err.message.includes("<!DOCTYPE html>")
                ? "Server error occurred"
                : err.message;
            toast.error(errorMsg);
        } finally {
            setUiState((prev) => ({ ...prev, isSubmitting: false }));
        }
    };

    if (uiState.showOtpForm) {
        return (
            <OtpVerificationForm
                email={formData.email}
                onBack={() => setUiState((prev) => ({ ...prev, showOtpForm: false }))}
                onSuccess={() => navigate("/login")}
            />
        );
    }

    return (
        <div style={{ marginTop: "0%" }} className="position-fixed overflow-scroll top-0 start-0 w-100 h-100 px-3 px-md-5 py-5 bg-primary d-flex justify-content-center align-items-center  ">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            
            <div style={{ marginTop: "1%" }} className="w-100 max-w-1354 bg-white shadow rounded overflow-hidden d-flex flex-column flex-md-row">
                {/* Left Section (Images and Text) */}
                <div style={{marginTop:"-4%"}}  className="w-100 w-md-50 bg-gradient-primary p-4 p-md-5 position-relative">
                    <div className="text-white fs-5 fw-semibold text-center mb-4 ">
                        Social media shared today, tomorrow or by location
                    </div>
                    <div style={{marginTop:"-2%"}}  className="position-relative w-100 h-400">
                        <img
                            className="position-absolute w-180 h-342 left-0 top-50"
                            src={phoneImage}
                            alt="Phone 1"
                        />
                        <img
                            className="position-absolute w-180 h-342 right-0 top-50"
                            src={phoneImage2}
                            alt="Phone 2"
                        />
                        <img
                            className="position-absolute w-234 h-444 left-50 translate-middle-x"
                            src={phoneImage3}
                            alt="Phone 3"
                        />
                    </div>
                </div>

                {/* Right Section (Form) */}
                <div style={{marginTop:"-5%"}}  className="w-100 w-md-50 p-4 p-md-5">
                    <div className="d-flex align-items-center mb-4 mb-md-5">
                        <img className="w-45 h-45 me-2" src={Logo} alt="Logo" />
                        <div className="text-dark fs-5 fw-bold">ConnectLocal</div>
                    </div>

                    <div style={{marginTop:"-9%"}}  className="mb-4 mb-md-5">
                        <h2 className="text-dark fs-5 fw-semibold mb-2">Create account</h2>
                        <p className="text-secondary">Interest-Based Community Platform</p>
                    </div>

                    <form style={{ marginTop: "-4%" }} onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter Your Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`form-control ${!validation.nameValid ? "is-invalid" : ""
                                        }`}
                                    autoComplete="name"
                                />
                                {!validation.nameValid && (
                                    <div className="invalid-feedback">
                                        Please enter a valid name
                                    </div>
                                )}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`form-control ${!validation.emailValid ? "is-invalid" : ""
                                        }`}
                                    autoComplete="email"
                                />
                                {!validation.emailValid && (
                                    <div className="invalid-feedback">
                                        Please enter a valid email
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="form-label">Password</label>
                                <div className="input-group">
                                    <input
                                        type={uiState.showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`form-control ${!validation.passwordValid ? "is-invalid" : ""
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setUiState((prev) => ({
                                                ...prev,
                                                showPassword: !prev.showPassword,
                                            }))
                                        }
                                        className="btn btn-outline-secondary"
                                    >
                                        {uiState.showPassword ? "Hide" : "Show"}
                                    </button>
                                    {!validation.passwordValid && (
                                        <div className="invalid-feedback">
                                            Password must be at least 8 characters
                                        </div>
                                    )}
                                </div>
                                {uiState.passwordStrength && (
                                    <small
                                        className={`d-block mt-1 ${uiState.passwordStrength === "Weak"
                                            ? "text-danger"
                                            : uiState.passwordStrength === "Medium"
                                                ? "text-warning"
                                                : "text-success"
                                            }`}
                                    >
                                        Password Strength: {uiState.passwordStrength}
                                    </small>
                                )}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Mobile Number</label>
                                <PhoneInput
                                    country={"in"}
                                    value={formData.mobile}
                                    onChange={handlePhoneChange}
                                    inputClass={`form-control ${!validation.mobileValid ? "is-invalid" : ""
                                        }`}
                                    containerClass="w-100"
                                />
                                {!validation.mobileValid && (
                                    <div className="invalid-feedback d-block">
                                        Please enter a valid mobile number
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="form-label">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Enter your location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className={`form-control ${!validation.locationValid ? "is-invalid" : ""
                                        }`}
                                />
                                {!validation.locationValid && (
                                    <div className="invalid-feedback">
                                        Please enter a valid location
                                    </div>
                                )}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Interests (Select up to 5)</label>
                                <MultiSelect
                                    value={formData.interests}
                                    onChange={handleInterestChange}
                                    options={availableInterests}
                                    optionLabel="name"
                                    placeholder="Select Interests"
                                    maxSelectedLabels={3}
                                    className={`w-100 ${!validation.interestsValid ? "is-invalid" : ""
                                        }`}
                                    panelClassName="bg-white border border-secondary rounded shadow-sm"
                                    itemClassName="hover-bg-light p-2"
                                    display="chip"
                                />
                                {!validation.interestsValid && (
                                    <div className="invalid-feedback d-block">
                                        Please select 1-5 interests
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                            <div className="form-check mb-2 mb-md-0">
                                <input
                                    type="checkbox"
                                    checked={validation.termsAccepted}
                                    onChange={(e) =>
                                        setValidation((prev) => ({
                                            ...prev,
                                            termsAccepted: e.target.checked,
                                        }))
                                    }
                                    className="form-check-input"
                                    id="termsCheck"
                                    required
                                />
                                <label className="form-check-label" htmlFor="termsCheck">
                                    I agree to all the{" "}
                                    <a
                                        href="#"
                                        className="text-primary text-decoration-underline"
                                    >
                                        Terms
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="#"
                                        className="text-primary text-decoration-underline"
                                    >
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="rememberCheck"
                                />
                                <label className="form-check-label" htmlFor="rememberCheck">
                                    Remember me
                                </label>
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-md-row gap-3 mb-3">
                            <button
                                type="submit"
                                className="btn btn-primary flex-grow-1 flex-md-grow-0"
                                disabled={uiState.isSubmitting}
                            >
                                {uiState.isSubmitting ? (
                                    <span
                                        className="spinner-border spinner-border-sm me-1"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                ) : (
                                    "Create account"
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    (window.location.href = "https://accounts.google.com/signin")
                                }
                                className="btn btn-dark flex-grow-1 flex-md-grow-0 d-flex align-items-center justify-content-center gap-2"
                            >
                                <img className="w-14 h-14" src={Google} alt="Google Logo" />
                                Sign in with Google
                            </button>
                        </div>
                    </form>

                    <div style={{marginTop:"3%"}} className="text-center mt-3">
                        Already have an account?{" "}
                        <button
                            onClick={() => navigate("/login")}
                            className="btn btn-link p-0 text-primary text-decoration-underline"
                        >
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OtpVerificationForm = ({ email, onBack, onSuccess }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [state, setState] = useState({
        isVerifying: false,
        isResending: false,
        countdown: 60,
    });

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 5) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text/plain").trim();
        if (/^\d{6}$/.test(pasteData)) {
            const pasteArray = pasteData.split("");
            setOtp(pasteArray.slice(0, 6));
        }
    };

    const verifyOtp = async () => {
        const otpString = otp.join("");
        if (otpString.length !== 6) {
            toast.error("Please enter a 6-digit OTP");
            return;
        }

        setState((prev) => ({ ...prev, isVerifying: true }));

        try {
            const response = await fetch(
                `http://localhost:8080/user/verifySignupOtp/${email}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ otp: otpString }),
                }
            );

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Verification failed");

            toast.success("Verification successful!");
            setTimeout(onSuccess, 1500);
        } catch (err) {
            toast.error(err.message || "Verification failed");
        } finally {
            setState((prev) => ({ ...prev, isVerifying: false }));
        }
    };

    const resendOtp = async () => {
        setState((prev) => ({ ...prev, isResending: true }));

        try {
            await fetch("http://localhost:8080/user/resend-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            toast.success("New OTP sent successfully!");
            setState((prev) => ({
                ...prev,
                countdown: 60,
            }));
            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (err) {
            toast.error("Failed to resend OTP. Please try again.");
        } finally {
            setState((prev) => ({ ...prev, isResending: false }));
        }
    };

    useEffect(() => {
        if (state.countdown > 0) {
            const timer = setTimeout(() => {
                setState((prev) => ({ ...prev, countdown: prev.countdown - 1 }));
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [state.countdown]);

    return (
        <div style={{marginTop:"0%"}} className="position-fixed top-0 start-0 w-100 h-100 px-3 px-md-5 py-5 bg-primary d-flex justify-content-center align-items-center overflow-hidden">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            
            <div className="w-100 max-w-1354 bg-white shadow rounded overflow-hidden d-flex flex-column flex-md-row">
                {/* Left Section (Images and Text) - Same as signup */}
                <div className="w-100 w-md-50 bg-gradient-primary p-4 p-md-5 position-relative">
                    <div className="text-white fs-5 fw-semibold text-center mb-4 mb-md-5">
                        Social media shared today, tomorrow or by location
                    </div>
                    <div className="position-relative w-100 h-400">
                        <img
                            className="position-absolute w-180 h-342 left-0 top-50"
                            src={phoneImage}
                            alt="Phone 1"
                        />
                        <img
                            className="position-absolute w-180 h-342 right-0 top-50"
                            src={phoneImage2}
                            alt="Phone 2"
                        />
                        <img
                            className="position-absolute w-234 h-444 left-50 translate-middle-x"
                            src={phoneImage3}
                            alt="Phone 3"
                        />
                    </div>
                </div>

                {/* Right Section - OTP Form */}
                <div className="w-100 w-md-50 p-4 p-md-5">
                    <div className="d-flex align-items-center mb-4 mb-md-5">
                        <img className="w-45 h-45 me-2" src={Logo} alt="Logo" />
                        <div className="text-dark fs-5 fw-bold">ConnectLocal</div>
                    </div>

                    <div className="mb-4 mb-md-5">
                        <h2 className="text-dark fs-5 fw-semibold mb-2">
                            Verify Your Email
                        </h2>
                        <p className="text-secondary">
                            Enter the 6-digit code sent to{" "}
                            <span className="fw-medium">{email}</span>
                        </p>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            verifyOtp();
                        }}
                    >
                        <div className="mb-4">
                            <div className="d-flex justify-content-between gap-2 mb-3">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(e, index)}
                                        onPaste={handlePaste}
                                        pattern="\d*"
                                        inputMode="numeric"
                                        className="form-control text-center fs-4 py-3"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-md-row gap-3 mb-4">
                            <button
                                type="submit"
                                className="btn btn-primary flex-grow-1 flex-md-grow-0"
                                disabled={state.isVerifying || otp.join("").length !== 6}
                            >
                                {state.isVerifying ? (
                                    <span
                                        className="spinner-border spinner-border-sm me-1"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                ) : (
                                    "Verify Account"
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={onBack}
                                className="btn btn-outline-primary flex-grow-1 flex-md-grow-0"
                            >
                                Change Email
                            </button>
                        </div>
                    </form>

                    <div className="text-center">
                        {state.countdown > 0 ? (
                            <p className="text-secondary">
                                Resend OTP in {state.countdown} seconds
                            </p>
                        ) : (
                            <button
                                onClick={resendOtp}
                                disabled={state.isResending}
                                className="btn btn-link text-primary p-0 text-decoration-underline"
                            >
                                {state.isResending
                                    ? "Sending..."
                                    : "Didn't receive code? Resend OTP"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;