import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './form.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', formData);
            localStorage.setItem('user', JSON.stringify(response.data)); // Store user details in local storage
            setLoginSuccess(true); // Set login success to true
        } catch (error) {
            setError(error.response.data); // Handle error response
        }
    };

    // Redirect to student dashboard if login is successful and role is STUDENT
    if (loginSuccess && JSON.parse(localStorage.getItem('user')).role === 'STUDENT') {
        return <Navigate to="/studentdashboard" replace />;
    }
    // Redirect to tutor dashboard if login is successful and role is TUTOR
    if (loginSuccess && JSON.parse(localStorage.getItem('user')).role === 'TUTOR') {
        return <Navigate to="/tutordashboard" replace />;
    }
    // Redirect to admin dashboard if login is successful and role is ADMIN
    if (loginSuccess && JSON.parse(localStorage.getItem('user')).role === 'ADMIN') {
        return <Navigate to="/admindashboard" replace />;
    }

    return (
        <div>
            <h2 className='title'>LearnX Platform</h2>
            <div className="form-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Student Number"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
