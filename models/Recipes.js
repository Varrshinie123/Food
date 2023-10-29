const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: String,
    instructions: String,
    author: String,
    picture: String, // Add a picture field of type String
});

// Create the Recipe model using the schema
const Recipes = mongoose.model('Recipes', recipeSchema);

// Export the Recipe model
module.exports = Recipes;
