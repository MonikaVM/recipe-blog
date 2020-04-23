const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    ingredients: [String],
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

module.exports = mongoose.model('Recipe', recipeSchema)
