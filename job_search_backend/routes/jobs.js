const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
const router = express.Router();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// İş ilanlarını listeleme
router.get('/', (req, res) => {
    const query = 'SELECT * FROM jobs';
    const { title, location } = req.query;
    let params = [];

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.json(results);
    });

    if (title) {
        query += ' AND title LIKE ?';
        params.push(`%${title}%`);
    }
    if (location) {
        query += ' AND location LIKE ?';
        params.push(`%${location}%`);
    }

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.json(results);
    });
});
router.get('/', authMiddleware, async (req, res) => {
    const jobs = [
        { id: 1, title: 'Software Engineer', company: 'Google', location: 'San Francisco', salary: '$120,000' },
        { id: 2, title: 'Backend Developer', company: 'Amazon', location: 'Seattle', salary: '$110,000' }
    ];
    res.json(jobs);
});

// Yeni iş ilanı ekleme
router.post('/', (req, res) => {
    const { title, description, location, company, salary } = req.body;
    const query = 'INSERT INTO jobs (title, description, location, company, salary) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [title, description, location, company, salary], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.status(201).json({ message: 'Job added successfully' });
    });
});

// İş ilanı silme
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM jobs WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        res.json({ message: 'Job deleted successfully' });
    });
});

router.get('/:id', (req, res) => {
    const jobId = req.params.id;
    const query = `SELECT *, (SELECT COUNT(*) FROM applications WHERE job_id = ?) as applications_count FROM jobs WHERE id = ?`;
    
    db.query(query, [jobId, jobId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Job not found' });

        // Fetch related jobs
        const relatedQuery = 'SELECT * FROM jobs WHERE category = ? LIMIT 3';
        db.query(relatedQuery, [results[0].category], (err, relatedJobs) => {
            if (err) return res.status(500).json({ message: 'Database error', error: err });
            res.json({ ...results[0], relatedJobs });
        });
    });
});


module.exports = router;
