const Recipe = require('../models/recipe');
const Comment = require('../models/comment');

module.exports = {
    
    asyncErrorHandler: fn =>
        (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                            .catch(next);
        },

    isRecipeOwner: async (req, res, next) => {
        const recipe = await Recipe.findById(req.params.id);
        console.log(recipe)
        if (recipe.author.id.equals(req.user._id)) {
            return next();
        } else {
            return res.redirect('back');
        }
    },

    isCommentOwner: async (req, res, next) => {
        const comment = await Comment.findById(req.params.comment_id);
        console.log(comment)
        if (comment.author.id.equals(req.user._id)) {
            return next();
        } else {
            return res.redirect('back');
        }
    },

    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    }

}