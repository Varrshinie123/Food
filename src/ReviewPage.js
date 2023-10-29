import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewPage.css';

function ReviewPage() {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ title: '', content: '', rating: 1 });

    // Fetch the userId from local storage
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = () => {
        axios.get(`http://localhost:3001/api/reviews/${userId}`)
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });
    };

    const handleReviewCreate = () => {
        const reviewData = {
            author: userId,
            title: newReview.title, // Use the title from the state
            content: newReview.content, // Use the content from the state
            rating: newReview.rating,
        };

        axios.post('http://localhost:3001/api/reviews', reviewData)
            .then((response) => {
                fetchReviews(); // Refresh the reviews list
                setNewReview({ title: '', content: '', rating: 1 });
            })
            .catch((error) => {
                console.error('Error creating a review:', error);
            });
    };




    const handleReviewDelete = (reviewId) => {
        axios.delete(`http://localhost:3001/api/reviews/${reviewId}`)
            .then(() => {
                fetchReviews(); // Refresh the reviews list
            })
            .catch((error) => {
                console.error('Error deleting a review:', error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewReview({ ...newReview, [name]: value });
    };

    return (
        <div className="review-page">
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br> <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <div className="create-review-section">
                <h3>Create a New Review</h3>
                <div className="create-review-form">
                    <div className="input-box">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={newReview.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-box">
                        <textarea
                            name="content"
                            placeholder="Review Content"
                            value={newReview.content}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-box">
                        <label>Rating:</label>
                        <input
                            type="number"
                            name="rating"
                            value={newReview.rating}
                            onChange={handleInputChange}
                            min="1"
                            max="5"
                        />
                    </div>
                    <button className="create-button" onClick={handleReviewCreate}>Create</button>
                </div>
            </div>

            <div className="existing-reviews">
                <h3>Existing Reviews</h3>
                {reviews.map((review) => (
                    <div key={review._id} className="review">
                        <h4>{review.title}</h4>
                        <p>Content: {review.content}</p>
                        <p>Rating: {review.rating}</p>
                        <button className="delete-button" onClick={() => handleReviewDelete(review._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewPage;
