import React, { useState } from 'react';
import Fox from '../assets/Fox.png';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import '../Css/ResetPassword.css';

export default function ResetPassword() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handlePasswordVisibilityToggle = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="rp-loginholder">
            <div className="rp-Login-container">
                <div className="rp-logo-container">
                    <div className="rp-logo-flex-container">
                        <img src={Fox} alt="rp-Fox Logo" />
                        <div>
                            <span className="rp-Logo">Quiztopia</span>
                        </div>
                    </div>
                </div>
                <div className="rp-opaquebackground">
                    <h2>Reset Password</h2>
                    <form method="post">
                        <label>Enter New Password</label>
                        <div className="rp-password-container">
                            <input placeholder='Enter Your New Password...'
                                type={passwordVisible ? "text" : "password"}
                                id="rp-password"
                                name="password"
                                required
                            />
                            <div className="rp-password-toggle" onClick={handlePasswordVisibilityToggle}>
                                {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                            </div>
                        </div>
                        <br />
                        <br />
                        <button type="submit">Confirm</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
