const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'User', // Reference to the User model
        required: true,
    },
    following: {
        type: mongoose.Schema.Types.Mixed, // Accept any type for "following"
        required: true,
    },
});

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;
