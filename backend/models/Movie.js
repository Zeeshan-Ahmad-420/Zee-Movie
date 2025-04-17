const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    poster_path: {
        type: String,
        required: true
    },
    vote_average: {
        type: Number,
        default: 0
    },
    release_date: {
        type: Date,
        required: true
    },
    genre: [{
        type: String
    }],
    category: {
        type: String,
        enum: ['popular', 'hollywood', 'bollywood', 'animated'],
        required: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
