import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Fox from '../assets/Fox.png';
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import '../Css/LoginForm.css';

export default function LoginForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePasswordVisibilityToggle = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        // Simulate a login process
        setTimeout(() => {
            setLoading(false);
            navigate('/Lecturer'); // Navigate to the desired route after login
        }, 2000); // Simulate a 2-second delay for the login process
    };

    return (
        <div className="loginholder">
            {loading ? (
                <div className="loader"></div>
            ) : (
                <div className="Login-container">
                    <div className="logo-container">
                        <div className="logo-flex-container">
                            <img src={Fox} alt="Fox Logo" />
                            <div>
                                <span className="Logo">Quiztopia</span>
                            </div>
                        </div>
                    </div>
                    <div className="opaquebackground">
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit} method="post">
                            <label>Username</label>
                            <input type="text" id="username" name="username" required />
                            <p />
                            <p />
                            <label>Password</label>
                            <div className="lgn-password-container">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    id="lgn-password"
                                    name="password"
                                    required
                                />
                                <div className="lgn-password-toggle" onClick={handlePasswordVisibilityToggle}>
                                    {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                                </div>
                            </div>
                            <Link to={'/Login/Forgot_Password'}>
                                <label className='lgn-ForgotPassword'>Forgot Password?</label>
                            </Link>
                            <button type="submit" style={{ borderRadius: 40, fontFamily: 'Pacifico' }}>Login</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
