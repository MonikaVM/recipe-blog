const express = require('express');
const router = express.Router();
const { asyncErrorHandler, isRecipeOwner } = require('../middleware');
const { 
    getAllRecipes, 
    showNewRecipeForm, 
    showRecipe, 
    createRecipe, 
    showEditRecipeForm,
    updateRecipe,
    deleteRecipe } = require('../controllers/recipes');

// shows all recipes
router.get('/', asyncErrorHandler(getAllRecipes));

// shows form for new recipe
router.get('/new', showNewRecipeForm);

// shows particular recipe
router.get('/:id', asyncErrorHandler(showRecipe));

// creates new recipe and adds it to DB
router.post('/', asyncErrorHandler(createRecipe));

// shows form to edit recipe
router.get('/:id/edit', isRecipeOwner, asyncErrorHandler(showEditRecipeForm));

// update recipe
router.put('/:id', asyncErrorHandler(updateRecipe));

// deletes recipe
router.delete('/:id', isRecipeOwner, asyncErrorHandler(deleteRecipe));

module.exports = router;