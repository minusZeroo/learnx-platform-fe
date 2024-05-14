import {useEffect, useState} from "react";
import axios from "axios";

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

    const fetchTutorAvailabilities = async (tutorId) => {
        try {
            const response = await axios.get('http://localhost:8080/api/tutor-availabilities/by-tutor/${tutorId}');
            setAvailabilities(response.data);
        } catch (error) {
            console.error('Error fetching tutor availabilities', error);
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
    }

};