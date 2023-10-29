import React, { useState, useEffect } from 'react';
import './RecipePage.css'; // You can create a RecipePage.css file for styling
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import the useAuth hook

function RecipePage() {
    const { userId } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [newRecipe, setNewRecipe] = useState({ title: '', ingredients: '', instructions: '',picture: '' });

    useEffect(() => {
        axios.get(`http://localhost:3001/api/recipes/${userId}`)
            .then((response) => {
                setRecipes(response.data);
            })
            .catch((error) => {
                console.error('Error fetching recipes:', error);
            });
    }, [userId]);

    const handleRecipeCreate = () => {
        axios.post('http://localhost:3001/api/recipes/set', { ...newRecipe, author: userId })
            .then((response) => {
                // Handle success, e.g., update your state with the new recipe
                // You can also clear the form
                setNewRecipe({ title: '', ingredients: '', instructions: '', picture: '' });
                
            })
            .catch((error) => {
                console.error('Error creating a recipe:', error);
            });
    };

    const handleRecipeDelete = (recipeId) => {
        axios.delete(`http://localhost:3001/api/recipes/${recipeId}`)
            .then((response) => {
                // Handle success, e.g., update your state by removing the deleted recipe
            })
            .catch((error) => {
                console.error('Error deleting a recipe:', error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewRecipe({ ...newRecipe, [name]: value });
    };

    return (
        <div className="recipe-page">
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br> <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <div className="create-recipe-section">
                <h3>Create a New Recipe</h3>
                <div className="create-recipe-form">
                    <div className="input-box">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={newRecipe.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            name="ingredients"
                            placeholder="Ingredients"
                            value={newRecipe.ingredients}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-box">
                        <textarea
                            name="instructions"
                            placeholder="Recipe Instructions"
                            value={newRecipe.instructions}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            name="picture"
                            placeholder="Recipe Picture"
                            value={newRecipe.picture}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="create-button" onClick={handleRecipeCreate}>Create</button>
                </div>
            </div>

            <div className="existing-recipes">
                <h3>My Existing Recipes</h3>
                {recipes.map((recipe) => (
                    <div key={recipe._id} className="recipe">
                        <h4>{recipe.title}</h4>
                        <p>Ingredients: {recipe.ingredients}</p>
                        <p>Instructions: {recipe.instructions}</p>
                        <p>Picture: {recipe.picture}</p>
                        <button className="delete-button" onClick={() => handleRecipeDelete(recipe._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecipePage;
