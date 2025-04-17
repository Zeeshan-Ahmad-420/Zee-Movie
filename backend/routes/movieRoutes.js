const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Get all movies
router.get('/', async (req, res) => {
    try {
        const { category, genre, search } = req.query;
        let query = {};
        
        if (category) query.category = category;
        if (genre) query.genre = genre;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { overview: { $regex: search, $options: 'i' } }
            ];
        }

        const movies = await Movie.find(query).populate('reviews');
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single movie
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate('reviews');
        if (!movie) return res.status(404).json({ message: 'Movie not found' });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new movie (admin only)
router.post('/', async (req, res) => {
    const movie = new Movie(req.body);
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update movie (admin only)
router.patch('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(movie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete movie (admin only)
router.delete('/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: 'Movie deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
