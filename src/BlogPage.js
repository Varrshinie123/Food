import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogPage.css';
import { useAuth } from './AuthContext';

function BlogPage() {
    const [blogs, setBlogs] = useState([]);
    const { loggedIn } = useAuth();
    const initialLikedPosts = new Set(JSON.parse(localStorage.getItem('likedPosts')) || []);
    const initialFollowedUsers = new Set(JSON.parse(localStorage.getItem('followedUsers')) || []); // Load followed users from local storage
    const [likedPosts, setLikedPosts] = useState(initialLikedPosts);
    const [followedUsers, setFollowedUsers] = useState(initialFollowedUsers);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await axios.get('http://localhost:3001/api/blogs');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        }

        fetchBlogs();
    }, []);

    const handleLike = async (postId) => {
        if (loggedIn) {
            const userId = localStorage.getItem('userId');

            if (!userId) {
                console.error('User ID not found in local storage.');
                return;
            }

            const requestData = {
                postId: postId,
                userId: userId,
            };

            if (likedPosts.has(postId)) {
                try {
                    await axios.delete(`http://localhost:3001/api/blogs/${postId}/unlike`, { data: requestData });
                    likedPosts.delete(postId);
                    setLikedPosts(new Set(likedPosts));
                    localStorage.setItem('likedPosts', JSON.stringify(Array.from(likedPosts)));
                } catch (error) {
                    console.error('Error unliking blog:', error);
                }
            } else {
                try {
                    const response = await axios.post(`http://localhost:3001/api/blogs/${postId}/like`, requestData);
                    const newLikedPosts = new Set([...likedPosts, postId]);
                    setLikedPosts(new Set(newLikedPosts));
                    localStorage.setItem('likedPosts', JSON.stringify(Array.from(newLikedPosts)));
                } catch (error) {
                    console.error('Error liking blog:', error);
                }
            }
        }
    };

    const handleFollow = async (userId, isFollowed) => {
        if (loggedIn) {
            const followerId = localStorage.getItem('userId');

            if (!followerId || !userId) {
                console.error('User ID not found in local storage.');
                return;
            }

            try {
                if (isFollowed) {
                    await axios.post(`http://localhost:3001/api/follow/unfollow`, { userId, followerId });
                    setFollowedUsers(new Set([...followedUsers].filter((id) => id !== userId)));

                    // Remove the unfollowed user from local storage
                    const updatedFollowedUsers = Array.from(followedUsers).filter((id) => id !== userId);
                    localStorage.setItem('followedUsers', JSON.stringify(updatedFollowedUsers));
                } else {
                    await axios.post(`http://localhost:3001/api/follow`, { userId, followerId });
                    setFollowedUsers(new Set([...followedUsers, userId]));

                    // Add the newly followed user to local storage
                    const updatedFollowedUsers = Array.from(followedUsers).concat(userId);
                    localStorage.setItem('followedUsers', JSON.stringify(updatedFollowedUsers));
                }
            } catch (error) {
                console.error('Error following/unfollowing user:', error);
            }
        }
    };

    return (
        <div className="blog-container">
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <h2>All Blogs</h2>
            <div className="blog-list">
                {blogs.map((blog) => (
                    <div className="blog-box" key={blog._id}>
                        <h3>{blog.title}</h3>
                        <p className="blog-details">
                            <span>Author: {blog.author}</span>
                            {loggedIn ? (
                                <div className="blog-actions">
                                    <button
                                        onClick={() => handleLike(blog._id)}
                                        disabled={false}
                                    >
                                        {likedPosts.has(blog._id) ? 'Liked!' : 'Like'}
                                    </button>
                                    <button
                                        onClick={() => handleFollow(blog.author, followedUsers.has(blog.author))}
                                    >
                                        {followedUsers.has(blog.author) ? 'Followed' : 'Follow'}
                                    </button>
                                </div>
                            ) : null}
                        </p>
                        <p>{blog.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BlogPage;
