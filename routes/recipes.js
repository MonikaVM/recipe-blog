const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')
const middleware = require('../middleware')

// shows all recipes
router.get('/', (req, res) => {
    Recipe.find({}, (err, recipes) => {
        if (err) {
            console.log(err)
        } else {
            res.render('blog', {recipes})
        }
    })
})

// shows form for new recipe
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('recipes/new')
})

// shows particular recipe
router.get('/:id', (req, res) => {
    Recipe.findById(req.params.id).populate('comments').exec((err, recipe) => {
        if (err) {
            console.log(err)
        } else {
            res.render('recipes/show', {recipe})
        }
    })
})

// creates new recipe and adds it to DB
router.post('/', (req, res) => {
    const newRecipe = {
        name: req.body.name,
        image: req.body.image,
        ingredients: [...req.body.ingredients || ''],
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }
    Recipe.create(newRecipe, (err, newlyCreated) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`Recipe successfully added: ${newlyCreated}`)
            res.redirect('/blog')
        }
    })
})

// edit recipe
// shows form to edit recipe
router.get('/:id/edit', middleware.checkRecipeOwnership, (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if (err) {
            console.log(err)
        } else {
            res.render('recipes/edit', {foundRecipe})
        }
    })
})

// update recipe
router.put('/:id', (req, res) => {
    const updatedRecipe = {
        name: req.body.name,
        image: req.body.image,
        ingredients: [...req.body.ingredients || ''],
        description: req.body.description
    }
    Recipe.findByIdAndUpdate(req.params.id, updatedRecipe, (err, updated) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect(`/blog/${req.params.id}`)
        }
    })
})

// deletes recipe
router.delete('/:id', middleware.checkRecipeOwnership, (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err, deletedRecipe) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`Deleted: ${deletedRecipe}`)
        }
        res.redirect('/blog')
    })
})

module.exports = router