import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem('user');

    const handleLogout = () => {
        // Clear user data from local storage
        localStorage.removeItem('user');
        // Redirect to login page after logout
        navigate('/login');
    };

    return (
        <nav>
            <ul>
                {!isLoggedIn ? (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;