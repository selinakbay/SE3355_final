import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleRegister = (e) => {
      e.preventDefault();
      console.log("Registering with:", name, email, password);
      navigate('/login');
    };
  
    return (
      <div>
        <div className="navbar">Job Search Platform</div>
        <div className="container">
          <h2>Register</h2>
          <form onSubmit={handleRegister} className="form-container">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-secondary">Register</button>
          </form>
        </div>
      </div>
    );
  };

export default Register;  // ✅ Make sure this is the only export

