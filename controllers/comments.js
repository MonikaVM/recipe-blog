const Recipe = require('../models/recipe');
const Comment = require('../models/comment');

module.exports = {

    async showNewCommentForm(req, res, next) {
        const recipe = await Recipe.findById(req.params.id);
        res.render('comments/new', { recipe });
    },

    async createComment(req, res, next) {
        const recipe = await Recipe.findById(req.params.id);
        const comment = await Comment.create(req.body.comment);
        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        await comment.save();
        recipe.comments.push(comment);
        await recipe.save();
        res.redirect(`/recipes/${req.params.id}`);
    },

    async showEditCommentForm(req, res, next) {
        const comment = await Comment.findById(req.params.comment_id);
        res.render('comments/edit', { recipe_id: req.params.id, comment });
    },

    async editComment(req, res, next) {
        const updatedComment = {text: req.body.comment};
        await Comment.findByIdAndUpdate(req.params.comment_id, updatedComment);
        res.redirect(`/recipes/${req.params.id}`);
    },

    async deleteComment(req, res, next) {
        await Comment.findByIdAndRemove(req.params.comment_id);
        res.redirect(`/recipes/${req.params.id}`);
    }
}