// recipes.js
const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipes'); // Import your Recipe model

// Define a route to fetch all recipes
router.get('/', async (req, res) => {
    try {
        // Fetch all recipes from the database
        const recipes = await Recipe.find();

        // Send the recipes as a JSON response
        res.json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const author = userId;
        const recipes = await Recipe.find({ author });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});


router.post('/set', async (req, res) => {
    const { title, ingredients, instructions, author, picture } = req.body;
    try {
        const newRecipe = new Recipe({ title, ingredients, instructions, author, picture });
        console.log('Liked Posts with Blog Info:', newRecipe);
        await newRecipe.save();
        res.json(newRecipe);
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a recipe' });
    }

});

router.delete('/:recipeId', async (req, res) => {
    const { recipeId } = req.params;
    try {
        await Recipe.findByIdAndRemove(recipeId);
        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the recipe' });
    }
});

router.get('/recipes/:recipeId', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});




module.exports = router;
