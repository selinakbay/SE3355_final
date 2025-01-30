import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function Home() {
    const [language, setLanguage] = useState('EN');
    const [jobs, setJobs] = useState([]);

    const translations = {
        EN: { welcome: "Welcome to Job Search", search: "Search Jobs", apply: "Apply Now" },
        TR: { welcome: "İş Arama Platformuna Hoşgeldiniz", search: "İş Ara", apply: "Başvur" }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
                // Replace with a real API call to get city from lat/lon
                const city = "Sample City"; 

                const response = await axios.get(`http://localhost:5000/api/jobs?location=${city}`);
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        });
    }, []);

    return (
        <div>
            <div className="navbar">Job Search Platform</div>
            <div className="container">
                <h1>{translations[language].welcome}</h1>
                <p>Explore job opportunities and apply with ease.</p>
                <div>
                    <Link to="/login" className="btn btn-primary m-2">Login</Link>
                    <Link to="/register" className="btn btn-secondary m-2">Register</Link>
                </div>
                <select onChange={(e) => setLanguage(e.target.value)} value={language}>
                    <option value="EN">English</option>
                    <option value="TR">Türkçe</option>
                </select>
            </div>
        </div>
    );
}

export default Home;
