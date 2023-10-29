// server/routes/likedPosts.js
const express = require('express');
const router = express.Router();
const BlogPostLike = require('../models/bloglikeModel');
const Blog = require('../models/Blog'); // Import your model

// Get liked posts for a specific user
router.get('/liked-posts/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const likedPosts = await BlogPostLike.find({ userId });

        // Log the likedPosts to check if they are correctly fetched


        // Now, let's retrieve the blog information for each likedPost
        const likedPostsWithBlogInfo = await Promise.all(
            likedPosts.map(async (likedPost) => {
                const blog = await Blog.findById(likedPost.postId);
                return {
                    _id: likedPost._id,
                    postId: {

                        title: blog.title,
                        author: blog.author,
                        content: blog.content,
                        // You can add other properties here if needed
                    },
                    userId: likedPost.userId,
                    date: likedPost.date,
                };
            })
        );

        // Log the likedPostsWithBlogInfo to check the final result
        console.log('Liked Posts with Blog Info:', likedPostsWithBlogInfo);

        res.json(likedPostsWithBlogInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
