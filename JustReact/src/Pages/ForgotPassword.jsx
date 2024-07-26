import React from 'react';
import Fox from '../assets/Fox.png';
import '../Css/ForgotPassword.css';

export default function ForgotPassword() {
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
                    <form method="post">
                        <label>Email</label>
                        <input type="email" id="username" className='Username' name="username" 
                        placeholder='Enter Your School Email...'
                        required />
                        <br />
                        <br />
                        <button type="submit">Confirm</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
