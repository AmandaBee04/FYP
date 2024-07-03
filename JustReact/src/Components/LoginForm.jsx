import React, { useState } from 'react';
import Fox from '../assets/Fox.png';
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import '../Css/LoginForm.css';

export default function LoginForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handlePasswordVisibilityToggle = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform login logic here
        navigate('/Student'); // Navigate to the desired route after login
    };

    return (
        <div className="loginholder">
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
                        <div className="password-container">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                name="password"
                                required
                            />
                            <div className="password-toggle" onClick={handlePasswordVisibilityToggle}>
                                {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                            </div>
                        </div>
                        <button type="submit" style={{ borderRadius: 40, fontFamily: 'Pacifico' }}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
