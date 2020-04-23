const express = require('express')
const Recipe = require('../models/recipe')
const Comment = require('../models/comment')
const router = express.Router({mergeParams: true})
const middleware = require('../middleware')

// show form for new comment
router.get('/new', middleware.isLoggedIn, (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        res.render('comments/new', {recipe: foundRecipe})
    })
})

// create new comment
router.post('/', (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if (err) {
            res.redirect('/blog')
        } else {
            Comment.create(req.body.comment, (err, newComment) => {
                if (err) {
                    console.log(err)
                } else {
                    newComment.author.id = req.user.recipe_id
                    newComment.author.username = req.user.username
                    newComment.save()
                    foundRecipe.comments.push(newComment)
                    foundRecipe.save()
                    res.redirect(`/blog/${req.params.id}`)
                }
            })
        }
    })
})

// show comment edit form
router.get('/:comment_id/edit', (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            res.redirect('back')
        } else {
            res.render('comments/edit', {recipe_id: req.params.id, comment: foundComment})
        }
    })
})

// update comment
router.put('/:comment_id', (req, res) => {
    const updatedComment = {text: req.body.comment}
    Comment.findByIdAndUpdate(req.params.comment_id, updatedComment, (err, updated) => {
        if (err) {
            res.redirect('back')
        } else {
            res.redirect(`/blog/${req.params.id}`)
        }
    })
})

// delete comment
router.delete('/:comment_id', (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err, deletedComment) => {
        if (err) {
            res.redirect('back')
        } else {
            res.redirect(`/blog/${req.params.id}`)
        }
    })
})

module.exports = router