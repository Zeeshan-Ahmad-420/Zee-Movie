const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Movie = require('../models/Movie');

// Get all reviews for a movie
router.get('/movie/:movieId', async (req, res) => {
    try {
        const reviews = await Review.find({ movie: req.params.movieId })
            .populate('user', 'username')
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new review
router.post('/', async (req, res) => {
    try {
        const { movieId, rating, comment } = req.body;
        const userId = req.user.userId;

        // Check if user already reviewed this movie
        const existingReview = await Review.findOne({ user: userId, movie: movieId });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this movie' });
        }

        const review = new Review({
            user: userId,
            movie: movieId,
            rating,
            comment
        });

        const savedReview = await review.save();

        // Add review to movie's reviews array
        await Movie.findByIdAndUpdate(movieId, {
            $push: { reviews: savedReview._id }
        });

        // Update movie's vote average
        const allReviews = await Review.find({ movie: movieId });
        const averageRating = allReviews.reduce((acc, curr) => acc + curr.rating, 0) / allReviews.length;
        await Movie.findByIdAndUpdate(movieId, { vote_average: averageRating });

        res.status(201).json(await savedReview.populate('user', 'username'));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update review
router.patch('/:id', async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const review = await Review.findOne({ _id: req.params.id, user: req.user.userId });
        
        if (!review) {
            return res.status(404).json({ message: 'Review not found or unauthorized' });
        }

        review.rating = rating;
        review.comment = comment;
        await review.save();

        // Update movie's vote average
        const movieId = review.movie;
        const allReviews = await Review.find({ movie: movieId });
        const averageRating = allReviews.reduce((acc, curr) => acc + curr.rating, 0) / allReviews.length;
        await Movie.findByIdAndUpdate(movieId, { vote_average: averageRating });

        res.json(await review.populate('user', 'username'));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete review
router.delete('/:id', async (req, res) => {
    try {
        const review = await Review.findOne({ _id: req.params.id, user: req.user.userId });
        
        if (!review) {
            return res.status(404).json({ message: 'Review not found or unauthorized' });
        }

        const movieId = review.movie;
        await review.remove();

        // Remove review from movie's reviews array
        await Movie.findByIdAndUpdate(movieId, {
            $pull: { reviews: req.params.id }
        });

        // Update movie's vote average
        const allReviews = await Review.find({ movie: movieId });
        const averageRating = allReviews.length > 0
            ? allReviews.reduce((acc, curr) => acc + curr.rating, 0) / allReviews.length
            : 0;
        await Movie.findByIdAndUpdate(movieId, { vote_average: averageRating });

        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
