import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './tutordashboard.css';

const TutorDashboard = () => {
    const [tutorialRequests, setTutorialRequests] = useState([]);
    const [bookedTutorials, setBookedTutorials] = useState([]);
    const [availabilityFormData, setAvailabilityFormData] = useState({
        dayOfWeek: '',
        startTime: '',
        endTime: '',
        subject: ''
    });
    const [availabilities, setAvailabilities] = useState({});

    useEffect(() => {
        const tutorId = JSON.parse(localStorage.getItem('user')).userId;
        fetchTutorialRequests(tutorId);
        fetchBookedTutorials(tutorId);
        fetchTutorAvailabilities(tutorId);
    }, []);

    const fetchTutorAvailabilities = async (tutorId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/tutor-availabilities/by-tutor/${tutorId}`);
            setAvailabilities(response.data);
        } catch (error) {
            console.error('Error fetching tutor availabilities:', error);
        }
    };

    const fetchTutorialRequests = async (tutorId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/tutorial-requests/by-tutor/${tutorId}`);
            setTutorialRequests(response.data);
        } catch (error) {
            console.error('Error fetching tutorial requests:', error);
        }
    };

    const fetchBookedTutorials = async (tutorId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/tutorial-bookings/by-tutor/${tutorId}`);
            setBookedTutorials(response.data);
        } catch (error) {
            console.error('Error fetching booked tutorials:', error);
        }
    };

    const handleResponse = async (requestId, status) => {
        try {
            // Update tutorial request status
            await axios.put(`http://localhost:8080/api/tutorial-requests/${requestId}/status?status=${status}`);
            // Optionally, create a tutorial booking if status is "YES"
            if (status === 'YES') {
                // Find the tutorial request by ID
                const selectedRequest = tutorialRequests.find((request) => request.id === requestId);
                // Create a tutorial booking object
                const bookingData = {
                    dayOfWeek: selectedRequest.dayOfWeek,
                    startTime: selectedRequest.startTime,
                    endTime: selectedRequest.endTime,
                    subject: selectedRequest.subject,
                    studentId: selectedRequest.student.id,
                    tutorId: selectedRequest.tutor.id
                };
                // Make a POST request to create the tutorial booking
                await axios.post('http://localhost:8080/api/tutorial-bookings', bookingData);
            }
            // Refetch tutorial requests and booked tutorials to update the dashboard
            const tutorId = JSON.parse(localStorage.getItem('user')).userId;
            fetchTutorialRequests(tutorId);
            fetchBookedTutorials(tutorId);
        } catch (error) {
            console.error('Error updating tutorial request status:', error);
        }
    };

    const handleChange = (e) => {
        setAvailabilityFormData({ ...availabilityFormData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tutorId = JSON.parse(localStorage.getItem('user')).userId; // Get the logged tutor's ID
            const requestData = {
                ...availabilityFormData,
                tutorId: tutorId // Include the tutor's ID in the request data
            };
            await axios.post('http://localhost:8080/api/tutor-availabilities', requestData);
            // Clear the form data after successful submission
            setAvailabilityFormData({
                dayOfWeek: '',
                startTime: '',
                endTime: '',
                subject: ''
            });
        } catch (error) {
            console.error('Error creating tutor availability:', error);
        }
    };

    return (
        <div className="tutor-dashboard">
            <h2>Tutor Dashboard</h2>

            <div className="dashboard-grid">
                {/* Section to create tutor availabilities */}
                <div className="availability-section">
                    <h3>Create Tutor Availability</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Day of the Week:</label>
                            <select name="dayOfWeek" value={availabilityFormData.dayOfWeek} onChange={handleChange} required>
                                <option value="">-- Select Day --</option>
                                <option value="MONDAY">Monday</option>
                                <option value="TUESDAY">Tuesday</option>
                                <option value="WEDNESDAY">Wednesday</option>
                                <option value="THURSDAY">Thursday</option>
                                <option value="FRIDAY">Friday</option>
                                <option value="SATURDAY">Saturday</option>
                                <option value="SUNDAY">Sunday</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Start Time:</label>
                            <input type="time" name="startTime" value={availabilityFormData.startTime} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>End Time:</label>
                            <input type="time" name="endTime" value={availabilityFormData.endTime} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Subject:</label>
                            <select name="subject" value={availabilityFormData.subject} onChange={handleChange} required>
                                <option value="">-- Select Subject --</option>
                                <option value="MATHS">Maths</option>
                                <option value="PHYSICS">Physics</option>
                                <option value="CHEMISTRY">Chemistry</option>
                                {/* Add options for other subjects */}
                            </select>
                        </div>
                        <button type="submit" className="button">Create Availability</button>
                    </form>

                    {/* Section to display tutor availabilities */}
                    <div className="availabilities-section">
                        <h3>Tutor Availabilities</h3>
                        <table>
                            <thead>
                            <tr>
                                <th>Day of the Week</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Subject</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(availabilities).map((day) => (
                                <tr key={day}>
                                    <td>{availabilities[day].dayOfWeek}</td>
                                    <td>{availabilities[day].startTime}</td>
                                    <td>{availabilities[day].endTime}</td>
                                    <td>{availabilities[day].subject}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    {/* Section to display tutorial requests */}
                    <div className="tutorial-requests-section">
                        <h3>Tutorial Requests</h3>
                        {tutorialRequests.map((request) => (
                            <div className="card" key={request.id}>
                                <div className="card-header">
                                    <h4>Request ID: {request.id}</h4>
                                    <p className="status">Status: {request.status}</p>
                                </div>
                                <div className="card-body">
                                    <p>Subject: {request.subject}</p>
                                    <p>Day of the Week: {request.dayOfWeek}</p>
                                    <p>Time: {request.startTime} - {request.endTime}</p>
                                    <p>Student: {request.student.studentNumber}</p>
                                    <div className="response-buttons">
                                        {request.status === 'YES' && (
                                            <button onClick={() => handleResponse(request.id, 'ALT')}>ALT</button>
                                        )}
                                        {(request.status !== 'ALT' && request.status !== 'YES') && (
                                            <>
                                                <button onClick={() => handleResponse(request.id, 'YES')}>YES</button>
                                                <button onClick={() => handleResponse(request.id, 'NO')}>NO</button>
                                                <button onClick={() => handleResponse(request.id, 'ALT')}>ALT</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Section to display booked tutorials */}
                    <div className="booked-tutorials-section">
                        <h3>Booked Tutorials</h3>
                        {bookedTutorials.map((tutorial) => (
                            <div className="card" key={tutorial.id}>
                                <div className="card-header">
                                    <h4>Tutorial ID: {tutorial.id}</h4>
                                </div>
                                <div className="card-body">
                                    <p>Subject: {tutorial.subject}</p>
                                    <p>Day of the Week: {tutorial.dayOfWeek}</p>
                                    <p>Time: {tutorial.startTime} - {tutorial.endTime}</p>
                                    <p>Student: {tutorial.student.studentNumber}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorDashboard;
