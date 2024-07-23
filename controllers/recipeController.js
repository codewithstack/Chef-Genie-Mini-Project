const Recipe = require('../models/recipes.js');
const validator = require("validator");
module.exports.showRecipes = async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            res.render('users/login');
        } else {
            let food = await Recipe.aggregate([{ $sample: { size: 15 } }]);
            res.render('recipe.ejs', { food });
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports.showRecipeDetail = async (req, res) => {
    try {
        let { id } = req.params;
        const Item = await Recipe.findById(id);
        res.render('recipe_detail.ejs', { Item });
    } catch (err) {
        console.log(err);
    }
};
module.exports.searchStringLogic = async (req, res, next) => {
    try {
        const { search } = req.query;
        const ingredientsArr = search.split(/[,./ @#$%^&*()!+=-_~`|}{/0-9]/);
        const searchItem = [];
        for (let x of ingredientsArr) {
            searchItem.push(await Recipe.find({ Ingredients: { $regex: x } }));
        }
        let searches = searchItem[0].length;
        if (searches === 0) {
            req.flash('success', 'Food Item Not Found...!');
            res.redirect('/recipe');
        }
        if (searchItem.length > 0) {
            res.render('search.ejs', { searchItem, searches });
        } else {
            req.flash('success', 'Food Item Not Found...!');
            res.redirect('/recipe');
        }
    }
    catch (err) {
        console.log(err);
        next(err);
    }
};