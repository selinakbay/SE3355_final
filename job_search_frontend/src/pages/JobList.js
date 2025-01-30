import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log("User not logged in");
            return;
        }

        try {
            const response = await axios.get('http://localhost:5000/api/jobs', {
                headers: { Authorization: token }
            });
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    useEffect(() => { fetchJobs(); }, []);

    return (
        <div>
            <h1>Job Listings</h1>
            <ul>
                {jobs.map(job => (
                    <li key={job.id}>{job.title} - {job.company}</li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;

