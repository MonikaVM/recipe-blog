const Recipe = require('../models/recipe')

const middlewareObject = {}

middlewareObject.checkRecipeOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        Recipe.findById(req.params.id, (err, foundRecipe) => {
            if (err) {
                res.redirect('back')
            } else {
                if (foundRecipe.author.id.equals(req.user._id)) {
                    next()
                } else {
                    res.redirect('back')
                }
            }
        })
    } else {
        res.redirect('back')
    }
}

middlewareObject.checkCommentOwnerShip = (req, res, next) => {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                res.redirect('back')
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next()
                } else {
                    res.redirect('back')
                }
            }
        })
    }
}

middlewareObject.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = middlewareObject