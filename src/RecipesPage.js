import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RecipesPage.css';

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Make an API request to fetch recipes from your backend
        axios.get('http://localhost:3001/api/recipes') // Replace with your actual API endpoint
            .then((response) => {
                // Update the state with the fetched recipes
                setRecipes(response.data);
            })
            .catch((error) => {
                console.error('Error fetching recipes:', error);
            });
    }, []);

    return (
        <div>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <h2>Recipes</h2>
            <div className="recipe-container">
                {recipes.map((recipe) => (
                    <div key={recipe._id} className="recipe-item">
                        <a href={`http://localhost:3000/recipe/${recipe._id}`} className="recipe-link">
                            <div className="recipe-box">
                                <img src={recipe.picture} alt={recipe.title} className="recipe-image" />
                                <div className="recipe-details">
                                    <h3 className="recipe-name">{recipe.title}</h3>
                                </div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipesPage;
