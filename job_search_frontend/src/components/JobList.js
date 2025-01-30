import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({ title: "", city: "", country: "" });

    const fetchJobs = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/jobs`, {
                params: filters
            });
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [filters]);

    return (
        <div>
            <h1>Job Listings</h1>

            {/* 🔎 Search Filters */}
            <div>
                <input type="text" placeholder="Job Title" onChange={(e) => setFilters({...filters, title: e.target.value})} />
                <input type="text" placeholder="City" onChange={(e) => setFilters({...filters, city: e.target.value})} />
                <input type="text" placeholder="Country" onChange={(e) => setFilters({...filters, country: e.target.value})} />
                <button onClick={fetchJobs}>Search</button>
            </div>

            {/* 🔹 Job List */}
            <ul>
                {jobs.map(job => (
                    <li key={job.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
                        <h3>{job.title}</h3>
                        <p><strong>Company:</strong> {job.company}</p>
                        <p><strong>Location:</strong> {job.location}</p>
                        <p><strong>Salary:</strong> {job.salary}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;
