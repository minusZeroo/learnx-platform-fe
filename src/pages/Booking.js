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
            console.error('Error fetching availabilities:', error);
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
        setFormData({...formData, [e.target.name]: e.target.value});
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




}