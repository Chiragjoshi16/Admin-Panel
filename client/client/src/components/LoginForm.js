// src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send login request to backend API
        axios.post('/api/login', { email, password })
            .then(response => {
                // Handle successful login (e.g., store token in local storage, redirect user)
                console.log('Login successful:', response.data);
                setError('');
            })
            .catch(error => {
                // Handle login error
                console.error('Login error:', error);
                setError('Invalid email or password. Please try again.');
            });
    };

    return (
        <div className="login-form">
            <h3>Login Form</h3>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
