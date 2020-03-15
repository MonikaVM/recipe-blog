const express = require('express'),
      Recipe = require('../models/recipe'),
      router = express.Router()

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
router.get('/new', (req, res) => {
    res.render('recipes/new')
})

// shows particular recipe
router.get('/:id', (req, res) => {
    Recipe.findById(req.params.id).populate('comments').exec((err, recipe) => {
        if (err) {
            console.log(err)
        } else {
            console.log(recipe)
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
        description: req.body.description
    }
    Recipe.create(newRecipe, (err, newlyCreated) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Recipe successfully added!')
            console.log(newlyCreated)
            res.redirect('/blog')
        }
    })
})

// edit recipe
// shows form to edit recipe
router.get('/:id/edit', (req, res) => {
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
router.delete('/:id', (req, res) => {
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