// client/src/components/Followers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Followers() {
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Replace with the actual user ID
        axios.get(`http://localhost:3001/api/followers/${userId}`)
            .then((response) => {
                setFollowers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching followers:', error);
            });
    }, []);

    return (
        <div>
            <h2>Followers</h2>
            {followers.length > 0 ? (
                <ul>
                    {followers.map((follower) => (
                        <li key={follower._id}>
                            <p>{follower.follower}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Followers!</p>
            )}
        </div>
    );
}

export default Followers;
