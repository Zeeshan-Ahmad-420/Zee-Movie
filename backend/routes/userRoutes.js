const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ username, email, password });
        await user.save();

        // Create token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.status(201).json({ token, userId: user._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({ token, userId: user._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add movie to watchlist
router.post('/watchlist/:movieId', async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user.watchlist.includes(req.params.movieId)) {
            user.watchlist.push(req.params.movieId);
            await user.save();
        }
        res.json(user.watchlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add movie to favorites
router.post('/favorites/:movieId', async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user.favorites.includes(req.params.movieId)) {
            user.favorites.push(req.params.movieId);
            await user.save();
        }
        res.json(user.favorites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user profile
router.get('/profile', async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .populate('watchlist')
            .populate('favorites');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
