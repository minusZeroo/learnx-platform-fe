import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './booking.css';

const Booking = () => {
    const [formData, setFormData] = useState({
        selectedDate: '',
        selectedAvailabilityId: '',
        subject: ''
    });
    const [availabilities, setAvailabilities] = useState([]);
    const [message, setMessage] = useState('');
    const [tutorialRequests, setTutorialRequests] = useState([]);
    const [bookedTutorials, setBookedTutorials] = useState([]);
    const [feedbackFormData, setFeedbackFormData] = useState({
        sessionId: '',
        // Add more fields for feedback
    });

    useEffect(() => {
        fetchAvailabilities();
        fetchTutorialRequests();
        fetchBookedTutorials();
    }, []);

    const fetchAvailabilities = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/tutor-availabilities');
            setAvailabilities(response.data);
        } catch (error) {
            console.error('Error fetching tutor availabilities:', error);
        }
    };

    const fetchTutorialRequests = async () => {
        try {
            const studentId = JSON.parse(localStorage.getItem('user')).userId;
            const response = await axios.get(`http://localhost:8080/api/tutorial-requests/by-student/${studentId}`);
            setTutorialRequests(response.data);
        } catch (error) {
            console.error('Error fetching tutorial requests:', error);
        }
    };

    const fetchBookedTutorials = async () => {
        try {
            const studentId = JSON.parse(localStorage.getItem('user')).userId;
            const response = await axios.get(`http://localhost:8080/api/tutorial-bookings/by-student/${studentId}`);
            setBookedTutorials(response.data);
        } catch (error) {
            console.error('Error fetching booked tutorials:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFeedbackChange = (e) => {
        setFeedbackFormData({ ...feedbackFormData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedAvailability = availabilities.find(
            (availability) => availability.id === parseInt(formData.selectedAvailabilityId)
        );
        const studentId = JSON.parse(localStorage.getItem('user')).userId;
        const requestData = {
            ...formData,
            dayOfWeek: selectedAvailability.dayOfWeek,
            startTime: selectedAvailability.startTime,
            endTime: selectedAvailability.endTime,
            tutorId: selectedAvailability.tutor.id,
            studentId: studentId
        };
        try {
            const response = await axios.post('http://localhost:8080/api/tutorial-requests', requestData);
            setMessage('Tutorial request submitted successfully!');
            console.log(response.data);
            // Clear the booking form after successful submission
            setFormData({
                selectedDate: '',
                selectedAvailabilityId: '',
                subject: ''
            });
            fetchTutorialRequests();
            fetchBookedTutorials();
        } catch (error) {
            console.error('Error submitting tutorial request:', error);
            setMessage('Error submitting tutorial request. Please try again.');
        }
    };


    const filteredAvailabilities = availabilities.filter(
        (availability) => availability.dayOfWeek === formData.selectedDate && availability.subject === formData.subject
    );

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send feedback data to the backend
            // You need to implement the API endpoint to handle feedback submission
            // Example:
            // await axios.post('http://localhost:8080/api/session-feedbacks', feedbackFormData);
            console.log('Feedback submitted:', feedbackFormData);
            // Clear the feedback form after submission
            setFeedbackFormData({
                sessionId: '',
                rating: '', // Resetting the rating field
                comments: '' // Resetting the comments field
                // Add more fields for feedback
            });
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div className='booking-container'>
            <h2>Student Booking Page</h2>
            <div className="booking-grid">
                {/* Tutorial Booking Form */}
                <div className="booking-form">
                    <h3>Book a Tutorial</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Select Day of the Week:</label>
                            <select name="selectedDate" value={formData.selectedDate} onChange={handleChange} required>
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
                        <div>
                            <label>Select Subject:</label>
                            <select
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Select Subject --</option>
                                <option value="MATHS">Maths</option>
                                <option value="PHYSICS">Physics</option>
                                <option value="CHEMISTRY">Chemistry</option>
                                {/* Add options for other subjects */}
                            </select>
                        </div>
                        <div>
                            <label>Select Tutor Availability:</label>
                            <select
                                name="selectedAvailabilityId"
                                value={formData.selectedAvailabilityId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Select Availability --</option>
                                {filteredAvailabilities.map((availability) => (
                                    <option key={availability.id} value={availability.id}>
                                        {availability.tutor.username} - {availability.startTime} to {availability.endTime}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit">Book Tutorial</button>
                    </form>
                    {message && <p>{message}</p>}
                    {/* Session Feedback Form */}
                    <div className="feedback-form">
                        <h3>Session Feedback Form</h3>
                        <form onSubmit={handleFeedbackSubmit}>
                            <div>
                                <label>Booked Tutorial Session ID:</label>
                                <input type="text" name="sessionId" value={feedbackFormData.sessionId} onChange={handleFeedbackChange} required />
                            </div>
                            <div>
                                <label>Rating:</label>
                                <input type="number" name="rating" min="1" max="5" value={feedbackFormData.rating} onChange={handleFeedbackChange} required />
                            </div>
                            <div>
                                <label>Comments:</label>
                                <textarea name="comments" value={feedbackFormData.comments} onChange={handleFeedbackChange} required />
                            </div>
                            <button type="submit">Submit Feedback</button>
                        </form>
                    </div>
                </div>
                {/* Tutorial Requests and Booked Tutorials */}
                <div className="booking-details">
                    <div className="card-section">
                        <h3>Tutorial Requests Sent</h3>
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
                                    <p>Tutor: {request.tutor.username}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="card-section">
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
                                    <p>Tutor: {tutorial.tutor.username}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
