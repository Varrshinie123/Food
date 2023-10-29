import React, { useState, useEffect } from 'react';
import './RecipeDetailPage.css';
import axios from 'axios';

const RecipeDetailPage = ({ match }) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/recipes/recipes/${match.params.recipeId}`)
            .then((response) => {
                setRecipe(response.data);
            })
            .catch((error) => {
                console.error('Error fetching recipe details:', error);
            });
    }, [match.params.recipeId]);

    if (recipe === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recipe-detail-container">
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <h1>
                <a href={`/recipes`} className="back-link">Back to Recipes</a></h1>
            <div className="recipe-detail">
                <img src={recipe.picture} alt={recipe.title} className="recipe-image" />
                <h3 className="recipe-title">{recipe.title}</h3>
                <div className="recipe-info">
                    <p>Ingredients: {recipe.ingredients}</p>
                    <p>Instructions: {recipe.instructions}</p>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailPage;
