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

};
