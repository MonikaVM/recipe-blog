const express = require('express'),
      Recipe = require('../models/recipe'),
      Comment = require('../models/comment')
      router = express.Router({mergeParams: true})

// shows form for new comment
router.get('/new', (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        res.render('comments/new', {recipe: foundRecipe})
    })
})

// created new comment
router.post('/', (req, res) => {
    Comment.create(req.body.comment, (err, newlyCreated) => {
        if (err) {
            console.log(err)
        } else {
            Recipe.findById(req.params.id, (err, foundRecipe) => {
                if (err) {
                    res.redirect('/blog')
                } else {
                    foundRecipe.comments.push(newlyCreated)
                    foundRecipe.save()
                    res.redirect(`/blog/${req.params.id}`)
                }
            })
        } 
    })
})

module.exports = router