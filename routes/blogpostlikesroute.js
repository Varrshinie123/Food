const express = require('express');
const router = express.Router();
const blogPostLikeController = require('../controller/blogpostlikeController');

// Like a blog post


// Unlike a blog post


// Get the number of likes for a blog post
router.get('/count/:postId', blogPostLikeController.getLikeCount);

// Get the list of users who liked a blog post
router.get('/users/:postId', blogPostLikeController.getLikedUsers);

// Assuming Express.js for the server framework
router.post('/:postId/like', blogPostLikeController.likeBlogPost);

router.delete('/:postId/unlike', blogPostLikeController.unlikeBlogPost);



module.exports = router;
