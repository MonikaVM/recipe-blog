const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    ingredients: [String],
    description: String
})

module.exports = mongoose.model('Recipe', recipeSchema)
