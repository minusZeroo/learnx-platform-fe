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

        } catch (error) {

        }
    };

    const fetchBookedTutorials = async () => {
        try {
            
        } catch (e) {
            
        }
    }
}