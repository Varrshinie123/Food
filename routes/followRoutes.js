const express = require('express');
const router = express.Router();
const Follow = require('../models/followModel');

// Fetch the user's followings
router.get('/followings', async (req, res) => {
    const followerId = req.user.id; // Assuming you have authentication middleware

    try {
        const followings = await Follow.find({ follower: followerId }).select('following');

        res.json(followings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Follow a user
router.post('/', async (req, res) => {
    const { userId, followerId } = req.body;

    try {
        // Check if the user is already following
        const existingFollow = await Follow.findOne({ follower: followerId, following: userId });

        if (existingFollow) {
            return res.status(400).json({ message: 'User is already followed' });
        }

        const newFollow = new Follow({ follower: followerId, following: userId });
        await newFollow.save();
        res.json({ message: 'Followed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Unfollow a user
router.post('/unfollow', async (req, res) => {
    const { userId, followerId } = req.body;

    try {
        const result = await Follow.deleteOne({
            follower: followerId,
            following: userId,
        });

        if (result.deletedCount === 0) {
            return res.status(400).json({ message: 'User is not followed' });
        }

        res.json({ message: 'Unfollowed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/followers/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const followers = await Follow.find({ following: userId }).select('follower');
        res.json(followers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
