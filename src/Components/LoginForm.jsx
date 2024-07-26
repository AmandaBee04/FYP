import React, { useState, useEffect } from 'react';
import Fox from '../assets/Fox.png'
import { useNavigate, Link } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import '../Css/LoginForm.css'
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";



const Login = ({ setToken, setRole, setId }) => {
    const [id, setIdInput] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePasswordVisibilityToggle = () => {
        setPasswordVisible(!passwordVisible);
    };

    

    const handleSubmit = async (e) => { 
      e.preventDefault();
      
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/login', { id, password });
        if (res.data && res.data.jwt) {
          const decodedToken = jwtDecode(res.data.jwt);
          const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

          localStorage.setItem('jwt', res.data.jwt);
          localStorage.setItem('role', res.data.role);
          localStorage.setItem('id', res.data.id);
          localStorage.setItem('exp', expirationTime);
          setToken(res.data.jwt);
          setRole(res.data.role);
          setId(res.data.id);

          // Check token expiration and navigate accordingly
          if (expirationTime < Date.now()) {
              setError('Session expired. Please login again.');
          } else {
              const role = res.data.role;
              if (role === 'student') {
                  navigate('/Student');
              } else if (role === 'lecturer') {
                  navigate('/Lecturer');
              } else if (role === 'admin') {
                  navigate('/Admin');
              }
          }
      } else {
          setError('Login failed: JWT token not received.');
      }
  } catch (err) {
      console.error(err);
      setError('Login failed: Invalid ID or password.');
  }
};
  

    return (
    <>
      <div className="loginholder">
        <div className="Login-container">
            <div className="logo-container">
                <div className="logo-flex-container">
                    <img src={Fox}/>
                    <div>
                        <span className="Logo">Quiztopia</span>
                    </div>
                </div>
            </div>
            <div className="opaquebackground">
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>User ID</label>
                    <input type="text" id="username" value={id} name="username" onChange={e => setIdInput(e.target.value)} required/>
                    <p/>
                    <label>Password</label>
                    <div className="lgn-password-container">
                    <input type={passwordVisible ? "text" : "password"} className="lgn-password" id="password" value={password} onChange={e => setPassword(e.target.value)} name="password" required/>

                        <div className="lgn-password-toggle" onClick={handlePasswordVisibilityToggle}>
                            {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                        </div>
                        </div>
                        <Link to={'/Login/Forgot_Password'}>
                        <label  className='lgn-ForgotPassword'>Forgot Password?</label>
                        </Link>
                    <button type="submit" style={{borderRadius:40, fontFamily:'Pacifico'}}>Login</button>
                </form>
            </div>
        </div>
      </div>
    </>
  )
}

export default Login;
