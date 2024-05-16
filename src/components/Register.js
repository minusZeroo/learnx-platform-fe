import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './form.css';
import {useState} from "react";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'STUDENT' // Set default role to STUDENT
    });

    const navigate = useNavigate(); // Get the navigate function

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/register', formData);
            console.log(response.data); // Handle success response
            // Redirect to login page after successful registration
            navigate('/login');
        } catch (error) {
            console.error(error.response.data); // Handle error response
        }
    };

    return (
        <div>
            <h2 className='title'>Learning Platform</h2>
            <div className="form-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
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
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
