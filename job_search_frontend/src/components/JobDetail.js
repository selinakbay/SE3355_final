import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/jobs/${id}`)
            .then(response => setJob(response.data))
            .catch(error => console.error('Error fetching job details:', error));
    }, [id]);

    if (!job) return <p>Loading job details...</p>;

    return (
        <div>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <button>Apply Now</button>
        </div>
    );
};

export default JobDetail;
