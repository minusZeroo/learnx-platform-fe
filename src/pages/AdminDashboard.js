import {useEffect, useState} from "react";
import axios from "axios";


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



};
