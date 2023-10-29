import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

function LikedPosts() {
    const [likedPosts, setLikedPosts] = useState([]);

    useEffect(() => {
        // Fetch liked posts for the current user (replace 'userId' with the actual user ID)
        const userId = localStorage.getItem('userId'); // Replace with the actual user ID
        axios.get(`http://localhost:3001/api/liked-posts/${userId}`)
            .then((response) => {
                setLikedPosts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching liked posts:', error);
            });
    }, []);

    return (
        <div>
            <h2>Liked Blog Posts</h2>
            <ul>
                {likedPosts.map((likedPost) => (
                    <li key={likedPost._id}>
                        <p>{likedPost.postId.title}  -  {likedPost.postId.author}</p>
                      
                       
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LikedPosts;
