import React, { useState, useEffect } from 'react';
import './BlogPosts.css';
import axios from 'axios';
import { useAuth } from './AuthContext';

function BlogPosts() {
    const { username } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({ title: '', content: '' });

    const fetchBlogs = () => {
        axios.get(`http://localhost:3001/api/blogposts/author/${username}`)
            .then((response) => {
                setBlogs(response.data);
            })
            .catch((error) => {
                console.error('Error fetching blog posts:', error);
            });
    };

    const handleBlogCreate = () => {
        axios.post('http://localhost:3001/api/blogposts', { ...newBlog, author: username })
            .then(() => {
                setNewBlog({ title: '', content: '' });
                fetchBlogs(); // Refresh the blog posts after creating a new one
            })
            .catch((error) => {
                console.error('Error creating a blog post:', error);
            });
    };

    const handleBlogDelete = (blogId) => {
        axios.delete(`http://localhost:3001/api/blogposts/${blogId}`)
            .then(() => {
                fetchBlogs(); // Refresh the blog posts after deletion
            })
            .catch((error) => {
                console.error('Error deleting a blog post:', error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewBlog({ ...newBlog, [name]: value });
    };

    useEffect(() => {
        fetchBlogs(); // Fetch blogs when the component mounts
    });

    return (
        <div className="blog-posts">
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <div className="create-blog-section">
                <h3>Create a New Blog Post</h3>
                <div className="create-blog-form">
                    <div className="input-box">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={newBlog.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-box">
                        <textarea
                            name="content"
                            placeholder="Blog Content"
                            value={newBlog.content}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="create-button" onClick={handleBlogCreate}>Create</button>
                </div>
            </div>

            <div className="existing-blog-posts">
                <h3>My Existing Blog Posts</h3>
                {blogs.map((blog) => (
                    <div key={blog._id} className="blog-post">
                        <h4>{blog.title}</h4>
                        <p>{blog.content}</p>
                        <button className="delete-button" onClick={() => handleBlogDelete(blog._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BlogPosts;
