const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = Schema({
    Srno: Number,
    RecipeName: String,
    TranslatedRecipeName: String,
    Ingredients: String,
    TranslatedIngredients: String,
    PrepTimeInMins: Number,
    CookTimeInMins: Number,
    TotalTimeInMins: Number,
    Servings: Number,
    Cuisine: String,
    Course: String,
    Diet: String,
    Instructions: String,
    TranslatedInstructions: String,
    URL: String,
    Image: String,
});

module.exports = mongoose.model('Recipe', recipeSchema);
