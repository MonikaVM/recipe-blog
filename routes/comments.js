const express = require('express');
const router = express.Router({mergeParams: true});
const { isCommentOwner, asyncErrorHandler } = require('../middleware');
const { 
    showNewCommentForm, 
    createComment, 
    showEditCommentForm, 
    editComment, 
    deleteComment } = require('../controllers/comments');

// show form for new comment
router.get('/new', asyncErrorHandler(showNewCommentForm));

// create new comment
router.post('/', asyncErrorHandler(createComment));

// show comment edit form
router.get('/:comment_id/edit', asyncErrorHandler(showEditCommentForm));

// update comment
router.put('/:comment_id', asyncErrorHandler(editComment));

// delete comment
router.delete('/:comment_id', asyncErrorHandler(deleteComment));

module.exports = router;