import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Booking from './pages/Booking';
import TutorDashboard from './pages/TutorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/tutordashboard" element={<TutorDashboard />} />
                    <Route path="/admindashboard" element={<AdminDashboard />} />
                    <Route path="/studentdashboard" element={<StudentDashboard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;