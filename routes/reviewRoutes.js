const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');
const Review = require('../models/reviewModel'); // Import the review controller module

// Create a new review


// Fetch all reviews
router.get('/reviews/reviews', reviewController.getAllReviews);

// Fetch a review by ID
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const reviews = await Review.find({ author: userId });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user reviews' });
    }
});

// Create a new review
router.post('/', async (req, res) => {
    const { title, content, rating, author } = req.body;
    try {
        const newReview = new Review({ title, content, rating, author });
        await newReview.save();
        res.json(newReview);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a review' });
    }
});

// Delete a review by ID
router.delete('/:reviewId', async (req, res) => {
    const { reviewId } = req.params;
    try {
        await Review.findByIdAndRemove(reviewId);
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the review' });
    }
});

module.exports = router;
