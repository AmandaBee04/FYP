import React, { useState, useEffect } from 'react';
import Fox from '../assets/Fox.png';
import '../Css/ForgotPassword.css';
import axios from 'axios';

export default function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        let timeout;
        if (message || error) {
            timeout = setTimeout(() => {
                setMessage('');
                setError('');
            }, 3000);
        }
        return () => clearTimeout(timeout);
    }, [message, error]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        try {
            const response = await axios.post('http://localhost:8000/api/forgot-password', { email });
            setMessage(response.data.message);
            setError('');
        } catch (error) {
            setError(error.response.data.message);
            setMessage('');
        } finally {
            setLoading(false); // Hide loader
        }
    };

    return (
        <div className="fp-loginholder">
            <div className="fp-Login-container">
                <div className="fp-logo-container">
                    <div className="fp-logo-flex-container">
                        <img src={Fox} alt="fp-Fox Logo" />
                        <div>
                            <span className="fp-Logo">Quiztopia</span>
                        </div>
                    </div>
                </div>
                <div className="fp-opaquebackground">
                    <h2>Forgot Password</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input type="email" id="username" name="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <br />
                        <br />
                        <button type="submit">Confirm</button>
                        {loading && <div className="sd-loader"></div>} {/* Loader element */}
                        {message && <p className="fp-success-message">{message}</p>}
                        {error && <p className="fp-error-message">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}
