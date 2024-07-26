import React, { useState } from 'react';
import Fox from '../assets/Fox.png';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import '../Css/ResetPassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {

    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePasswordVisibilityToggle = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

    try {
            const response = await axios.post('http://localhost:8000/api/reset-password', {
                token: new URLSearchParams(window.location.search).get('token'),
                password: password,
            });
            setMessage(response.data.message);
            setError('');
            setTimeout(() => {
                navigate('/Login');
            }, 2000);
        } catch (error) {
            setError(error.response.data.message);
            setMessage('');
        }
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
                    <form onSubmit={handleSubmit}>
                        <label>New Password</label>
                            <div className="rp-password-container">
                                <input
                                    type={passwordVisible ? "name" : "password"}
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="password-toggle" onClick={handlePasswordVisibilityToggle}>
                                    {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                                </div>
                            </div>
                        <br />
                        <br />
                        <button type="submit" >Confirm</button>
                        {loading && <div className="sd-loader"></div>} 
                        {message && <p className="rp-success-message">{message}</p>}
                        {error && <p className="rp-error-message">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}
