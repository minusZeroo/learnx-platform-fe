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
}