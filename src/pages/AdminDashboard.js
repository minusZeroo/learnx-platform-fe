import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admindashboard.css'; // Import the CSS file

const AdminDashboard = () => {
    const [altTutorialRequests, setAltTutorialRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [tutorialBookings, setTutorialBookings] = useState([]);
    const [tutorAvailabilities, setTutorAvailabilities] = useState([]);

    useEffect(() => {
        fetchAltTutorialRequests();
        fetchTutorialBookings();
        fetchTutorAvailabilities();
    }, []);

    const fetchAltTutorialRequests = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/tutorial-requests/by-status/ALT');
            setAltTutorialRequests(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching ALT status tutorial requests.');
            setLoading(false);
        }
    };

    const fetchTutorialBookings = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/tutorial-bookings');
            setTutorialBookings(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching tutorial bookings.');
            setLoading(false);
        }
    };

    const fetchTutorAvailabilities = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/tutor-availabilities');
            setTutorAvailabilities(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching tutor availabilities.');
            setLoading(false);
        }
    };

    const handleDeleteRequest = async (requestId) => {
        try {
            await axios.delete(`http://localhost:8080/api/tutorial-requests/${requestId}`);
            // After deletion, fetch the updated list of tutorial requests
            fetchAltTutorialRequests();
        } catch (error) {
            console.error('Error deleting tutorial request:', error);
        }
    };

    const handleDeleteBooking = async (requestId) => {
        try {
            await axios.delete(`http://localhost:8080/api/tutorial-bookings/${requestId}`);
            // After deletion, fetch the updated list of tutorial bookings
            fetchTutorialBookings();
        } catch (error) {
            console.error('Error deleting tutorial booking:', error);
        }
    };

    const handleDeleteAvailability = async (availabilityId) => {
        try {
            await axios.delete(`http://localhost:8080/api/tutor-availabilities/${availabilityId}`);
            // After deletion, fetch the updated list of tutor availabilities
            fetchTutorAvailabilities();
        } catch (error) {
            console.error('Error deleting tutor availability:', error);
        }
    };

    const handleResponseStatus = async (requestId, status) => {
        try {
            await axios.put(`http://localhost:8080/api/tutorial-requests/${requestId}/status?status=${status}`);
            if (status === 'YES') {
                // Create a booking similar to the Tutor Dashboard
                const selectedRequest = altTutorialRequests.find((request) => request.id === requestId);
                const bookingData = {
                    dayOfWeek: selectedRequest.dayOfWeek,
                    startTime: selectedRequest.startTime,
                    endTime: selectedRequest.endTime,
                    subject: selectedRequest.subject,
                    studentId: selectedRequest.student.id,
                    tutorId: selectedRequest.tutor.id
                };
                await axios.post('http://localhost:8080/api/tutorial-bookings', bookingData);
            }
            // After updating status or creating a booking, fetch the updated list of tutorial requests
            fetchAltTutorialRequests();
        } catch (error) {
            console.error('Error updating tutorial request status:', error);
        }
    };

    return (
        <div className='admin-dashboard'>
            <h2 className='title'>Admin Dashboard</h2>
            <div>
                <h3 className='sub-title'>Tutorial Requests with Status "ALT"</h3>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {altTutorialRequests.length > 0 ? (
                    <div className="tutorial-request-cards">
                        {altTutorialRequests.map((request) => (
                            <div className="card" key={request.id}>
                                <div className="card-header">
                                    <h4>Request ID: {request.id}</h4>
                                    <p className="status">Status: {request.status}</p>
                                </div>
                                <div className="card-body">
                                    <p>Student: {request.student.username}</p>
                                    <p>Student: {request.tutor.username}</p>
                                    <p>Subject: {request.subject}</p>
                                    <p>Day of the Week: {request.dayOfWeek}</p>
                                    <p>Time: {request.startTime} - {request.endTime}</p>
                                    <div className="response-buttons">
                                        <button onClick={() => handleResponseStatus(request.id, 'YES')}>YES</button>
                                        <button onClick={() => handleResponseStatus(request.id, 'NO')}>NO</button>
                                        <button onClick={() => handleDeleteRequest(request.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No tutorial requests with status "ALT" found.</p>
                )}
            </div>
            <div>
                <h3 className='sub-title'>All Tutorial Bookings</h3>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {tutorialBookings.length > 0 ? (
                    <table className="data-table">
                        <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Student</th>
                            <th>Tutor</th>
                            <th>Subject</th>
                            <th>Day of the Week</th>
                            <th>Time</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tutorialBookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.student.username}</td>
                                <td>{booking.tutor.username}</td>
                                <td>{booking.subject}</td>
                                <td>{booking.dayOfWeek}</td>
                                <td>{booking.startTime} - {booking.endTime}</td>
                                <td>
                                    <button onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No tutorial bookings found.</p>
                )}
            </div>
            <div>
                <h3 className='sub-title'>All Tutor Availabilities</h3>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {tutorAvailabilities.length > 0 ? (
                    <table className="data-table">
                        <thead>
                        <tr>
                            <th>Availability ID</th>
                            <th>Tutor</th>
                            <th>Subject</th>
                            <th>Day of the Week</th>
                            <th>Time</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tutorAvailabilities.map((availability) => (
                            <tr key={availability.id}>
                                <td>{availability.id}</td>
                                <td>{availability.tutor.username}</td>
                                <td>{availability.subject}</td>
                                <td>{availability.dayOfWeek}</td>
                                <td>{availability.startTime} - {availability.endTime}</td>
                                <td>
                                    <button onClick={() => handleDeleteAvailability(availability.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No tutor availabilities found.</p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
