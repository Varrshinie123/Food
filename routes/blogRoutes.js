const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const Blog = require('../models/Blog');
 // Import your blog controller module

// Create a new blog
router.post('/blogs', blogController.createBlog);

// Fetch all blogs
router.get('/blogs', blogController.getAllBlogs);

// Fetch a blog by ID
router.get('/:id', blogController.getBlogById);

// Update a blog by ID
router.put('/blogs/:id', blogController.updateBlog);

router.delete('/blogpost/:blogId', blogController.deleteBlog);


router.get('/blogposts/author/:author', blogController.fetchBlogPosts);

// Route for creating a new blog post
router.post('/blogposts', blogController.createBlogPost);

router.delete('/blogposts/:blogId', async (req, res) => {
    try {
        const { blogId } = req.params;

        // Check if the blog post exists
        const blogPost = await Blog.findById(blogId);
        if (!blogPost) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        // Check if the user has permission to delete this blog post
        

        // Delete the blog post
        await Blog.findByIdAndRemove(blogId);

        res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('Error deleting a blog post:', error);
        res.status(500).json({ error: 'Failed to delete the blog post' });
    }
});



module.exports = router;
