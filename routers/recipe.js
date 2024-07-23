const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const recipeController = require('../controllers/recipeController.js');

router.get('/recipe', wrapAsync(recipeController.showRecipes));
router.get('/recipe_detail/:id', wrapAsync(recipeController.showRecipeDetail));
router.get('/search', wrapAsync(recipeController.searchStringLogic));

module.exports = router;