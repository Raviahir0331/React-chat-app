const pool = require('../database');
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await pool.query('INSERT INTO auth (username, email, pass) VALUES ($1, $2, $3) RETURNING *', [name, email, password]);
        res.status(201).json({message:"Registation"})
    } catch (err) {
        console.log("something went wrong", err);
        res.status(500).json({ message: 'internal error', error: err });
    }
});

module.exports = router;
