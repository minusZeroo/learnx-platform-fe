import {useEffect, useState} from "react";

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

    const fetchTutorialRequests = async () => {

    };

    const fetchBookedTutorials = async () => {

    };

    const fetchTutorAvailabilities = async () => {

    };
};