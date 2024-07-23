const mongoose = require('mongoose');
const dataset = require('./FoodRecipeDataset.json');
const recipe = require('../models/recipes.js');


if (process.env.NODE_ENV === 'production') {
    require('dotenv').config();
}

// require('dotenv').config();
const DB_LINK = process.env.ATLAS_DBLINK;
// const DB_LINK = 'mongodb://127.0.0.1:27017/chefGenie';
main().then((res) => {
    console.log('Mongo Connection Successfull...');
}).catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(DB_LINK);
}

const initDB = async () => {
    await recipe.deleteMany({});
    await recipe.insertMany(dataset);
    console.log('Data was Initialized!');
}

initDB();