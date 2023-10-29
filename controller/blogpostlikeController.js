const BlogPostLike = require('../models/bloglikeModel');




// Like a blog post

const unlikeBlogPost = async (req, res) => {
    const { postId, userId } = req.body;

    try {
        // Find and remove the user's like from the blog post
        const removedLike = await BlogPostLike.findOneAndRemove({ postId, userId });

        // Check if the like was found and removed
        if (!removedLike) {
            return res.status(404).json({ message: 'Blog post not found or like not found' });
        }

        res.json({ message: 'Blog unliked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};





const likeBlogPost = async (req, res) => {
    try {
        const { postId, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'userId is required in the request body.' });
        }

        // Check if the user has already liked the blog post
        const existingLike = await BlogPostLike.findOne({ postId, userId });

        if (existingLike) {
            return res.status(400).json({ message: 'You have already liked this blog post.' });
        }

        const newLike = new BlogPostLike({ postId, userId });
        await newLike.save();

        // No need to update the BlogPost model to increase its like count here

        return res.status(200).json({ message: 'Blog post liked successfully.' });
    } catch (error) {
        console.error('Error liking the blog post:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



// Unlike a blog post


// Get the number of likes for a blog post
const getLikeCount = async (req, res) => {
    try {
        const { postId } = req.params;
        const likeCount = await BlogPostLike.countDocuments({ post: postId });
        return res.status(200).json({ count: likeCount });
    } catch (error) {
        console.error('Error getting like count:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get the list of users who liked a blog post
const getLikedUsers = async (req, res) => {
    try {
        const { postId } = req.params;
        const likedUsers = await BlogPostLike.find({ post: postId }).populate('user', 'username');
        return res.status(200).json(likedUsers);
    } catch (error) {
        console.error('Error getting liked users:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { likeBlogPost, unlikeBlogPost, getLikeCount, getLikedUsers };
