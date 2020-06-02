const Recipe = require('../models/recipe')

module.exports = {
    async getAllRecipes(req, res, next) {
        const recipes = await Recipe.find({});
        res.render('recipes', { recipes });
    },

    showNewRecipeForm(req, res, next) {
        res.render('recipes/new');
    },

    async showRecipe(req, res, next) {
        const recipe = await Recipe.findById(req.params.id).populate('comments').exec();
        res.render('recipes/show', { recipe });
    },

    async createRecipe(req, res, next) {
        const newRecipe = {
            name: req.body.name,
            image: req.body.image,
            intro: req.body.intro,
            ingredients: [...req.body.ingredients || ''],
            description: req.body.description,
            author: {
                id: req.user._id,
                username: req.user.username
            }
        }
        await Recipe.create(newRecipe);
        req.session.success = 'Successfully created a new recipe!'
        res.redirect('/recipes');
    },

    async showEditRecipeForm(req, res, next) {
        const recipe = await Recipe.findById(req.params.id);
        res.render('recipes/edit', { recipe });
    },

    async updateRecipe(req, res, next) {
        const updatedRecipe = {
            name: req.body.name,
            image: req.body.image,
            intro: req.body.intro,
            ingredients: [...req.body.ingredients || ''],
            description: req.body.description
        }
        await Recipe.findByIdAndUpdate(req.params.id, updatedRecipe);
        req.session.success = 'Recipe successfully updated!'
        res.redirect(`/recipes/${req.params.id}`);
    },

    async deleteRecipe(req, res, next) {
        await Recipe.findByIdAndRemove(req.params.id);
        req.session.success = 'Recipe successfully deleted!'
        res.redirect('/recipes');
    }
}