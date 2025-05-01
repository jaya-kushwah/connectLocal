import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import women from "../assets/women.png";
import thunder from "../assets/thunderimg.png";
import image from "../assets/logon.jpg.png";
import { ToastContainer, toast } from 'react-toastify';
import { Cookies } from 'react-cookie';
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const cookies = new Cookies();
    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log('Email:', email);
    //     console.log('Password:', password);
    // },[]);

    const data = async () => {

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

            if (response.status === 200) {
                let result = await response.json(); // Get the full response from backend
                console.log(result, 'result')
                // Assuming result.data contains user data including the auth (role)
                cookies.set('user', JSON.stringify(result.data));
                // cookies.set('token', result.data.token, { path: '/' });

                toast.success(result.message); 

                setTimeout(() => {
                    navigate(result.data.auth === "admin" ? "/AdminDashboard" : "/dashboard");
                }, 1500);
            } else {
                toast.error( "Login failed");
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Something went wrong. Try again later.");
        }
    };


    return (
        <>
            <div ><div data-layer="login" className="Login" style={{ width: 1366, height: 700, position: 'fixed', background: 'white', borderRadius: 24, overflow: 'scroll', top: -1, left: -50 }}>
                <div data-layer="Rectangle 3" className="Rectangle3" style={{ width: 683, height: 736, left: 640, top: 0, position: 'absolute', background: "#1e3a8a" }} />
                {/* <img data-layer="Rectangle 4" className="Rectangle4" style={{ width: 683, height: 768, left: 683, top: 0, position: 'absolute', background: 'linear-gradient(218deg, #9181F4 0%, #5038ED 100%)' }} src={bg2} /> */}
                <div data-layer="Rectangle 5" className="Rectangle5" style={{ width: 412, height: 511, left: 755, top: 32, position: 'absolute', background: 'rgba(255, 255, 255, 0.21)', borderRadius: 46, border: '1px rgba(255, 255, 255, 0.52) solid', backdropFilter: 'blur(13.60px)' }} />
                <img data-layer="women with tab 1" className="WomenWithTab1" style={{ width: 780, height: 524, left: 493, top: 128, position: 'absolute', marginTop: "-8%" }} src={women} />
                <div data-layer="Group 10" className="Group10" style={{ width: 364, height: 469, left: 150, top: 40, position: 'absolute' }}>
                    <div data-layer="Group 4" className="Group4" style={{ width: 364, height: 24, left: 0, top: 328, position: 'absolute' }}>
                        <div className="text-center mt-2">
                            Don't Have An Account ? {" "}
                            <button
                                onClick={() => navigate("/signup")}
                                className="btn btn-link p-0 text-primary text-decoration-underline"
                            >
                                Create Account
                            </button>
                        </div>
                    </div>
                    <div data-layer="Login" className="Login" style={{ left: 135, top: 0, position: 'absolute', color: 'black', fontSize: 30, fontFamily: '', fontWeight: '700', textTransform: 'uppercase', wordWrap: 'break-word' }}>Login</div>
                    <img src={image} alt="Logo" className="me-2" style={{ height: "72px", marginLeft: "65px", marginTop: "-17px" }} />
                    <div data-layer="How to i get started lorem ipsum dolor at?" className="HowToIGetStartedLoremIpsumDolorAt" style={{ left: 19, top: 52, position: 'absolute', color: '#525252', fontSize: 18, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word' }}>How to i get started lorem ipsum dolor at?</div>
                    <div data-layer="Group 2" className="Group2" style={{ width: 364, height: 52, left: 0, top: 183, position: 'absolute' }}>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            style={{ width: '100%', padding: 14, borderRadius: 16, border: '1px solid #F0EDFF', background: 'rgba(239, 237, 255, 0.80)', outline: 'none' }}
                        ></input>


                        {/* <h6 style={{ marginLeft: "68%", marginTop: 5, fontSize: 11, color: "blue" }}>Forgotten Password ?</h6> */}
                        <ul >
                            <li><Link style={{ marginLeft: "62%", marginTop: 5, fontSize: 13, color: "blue", }} to="/forgetpass">Forgotten Password ?</Link></li>
                        </ul>

                        <div data-svg-wrapper data-layer="Frame" className="Frame" style={{ left: 18, top: 14, position: 'absolute' }}>
                        </div>
                    </div>
                    <div data-layer="Group 1" className="Group1" style={{ width: 364, height: 52, left: 0, top: 102, position: 'absolute', }}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: 14, borderRadius: 16, border: '1px solid #F0EDFF', background: 'rgba(239, 237, 255, 0.80)', outline: 'none' }}
                        />
                        <div data-svg-wrapper data-layer="Frame" className="Frame" style={{ left: 18, top: 14, position: 'absolute' }}>
                        </div>
                    </div>
                    <div data-layer="Group 3" className="Group3" style={{ width: 124, height: 52, left: 120, top: 271, position: 'absolute' }}>
                        <button
                            type="button"
                            style={{ color: "white", width: 124, height: 56, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(100deg, #9181F4 0%, #5038ED 100%)', boxShadow: '0px 8px 21px rgba(0, 0, 0, 0.16)', borderRadius: 16, border: '1px #F0EDFF solid' }}
                            onClick={data}
                        >
                            Login Now
                        </button>
                    </div>
                    <div data-layer="Group 9" className="Group9" style={{ width: 364, height: 120, left: 0, top: 379, position: 'absolute' }}>
                        <div data-layer="Group 8" className="Group8" style={{ width: 364, height: 52, left: 0, top: 0, position: 'absolute' }}>
                            <button data-layer="Rectangle 7" className="Rectangle7" style={{ width: 364, height: 52, left: 0, top: 0, position: 'absolute', borderRadius: 16, border: '1px #F0EDFF solid', background: "green" }} />
                            <a href="https://accounts.google.com/"
                                style={{ width: 364, height: 52, left: 0, top: 0, position: 'absolute', borderRadius: 16, border: '1px #F0EDFF solid', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: '700' }}>
                                <FaGoogle size={20} />
                                <b style={{ marginLeft: 10 }}> Login with Google</b>
                            </a>
                        </div>
                        <div data-layer="Group 7" className="Group7" style={{ width: 364, height: 52, left: 0, top: 68, position: 'absolute' }}>
                            <button data-layer="Rectangle 8" className="Rectangle8" style={{ width: 364, height: 52, left: 0, top: 0, position: 'absolute', borderRadius: 16, border: '1px #F0EDFF solid', background: "#1e3a8a" }} />
                            <a href="https://www.facebook.com/"
                                style={{ width: 364, height: 52, left: 0, top: 0, position: 'absolute', borderRadius: 16, border: '1px #F0EDFF solid', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13 }}>
                                <FaFacebookF size={20} />
                                <b style={{ marginLeft: 10 }}>Login with Facebook</b>
                            </a>
                        </div>
                    </div>
                </div>
                <div data-layer="Group 11" className="Group11" style={{ width: 79, height: 79, left: 720, top: 380, position: 'absolute' }}>
                    <div data-layer="Ellipse 1" className="Ellipse1" style={{ width: 79, height: 79, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 9999 }} />
                    <img data-layer="thunderbolt 1" className="Thunderbolt1" style={{ width: 75, height: 75, left: 3, top: 3, position: 'absolute' }} src={thunder} />
                </div>
                <div data-layer="Very good works are waiting for you Login Now!!!" className="VeryGoodWorksAreWaitingForYouLoginNow" style={{ left: 795, top: 55, position: 'absolute', color: 'white', fontSize: 32, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word' }}>Very good<br />works are<br />waiting for <br />you Login<br />Now!!!</div>
            </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Login