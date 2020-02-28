const express        = require('express'),
      app            = express(),
      mongoose       = require('mongoose'),
      bodyParser     = require('body-parser'),
      methodOverride = require('method-override'),
      Recipe         = require('./models/recipe')

// app setup
mongoose.connect('mongodb://localhost:27017/recipe_blog', {useNewUrlParser: true, useUnifiedTopology: true})
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.redirect('/blog')
})

// shows all recipes
app.get('/blog', (req, res) => {
    Recipe.find({}, (err, recipes) => {
        if (err) {
            console.log(err)
        } else {
            res.render('blog', {recipes})
        }
    })
})

// shows form for new recipe
app.get('/blog/new', (req, res) => {
    res.render('new')
})

// shows particular recipe
app.get('/blog/:id', (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        if (err) {
            console.log(err)
        } else {
            res.render('show', {recipe})
        }
    })
})

// creates new recipe and adds it to DB
app.post('/blog', (req, res) => {
    Recipe.create(req.body.blog, (err, newlyCreated) => {
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
app.get('/blog/:id/edit', (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if (err) {
            console.log(err)
        } else {
            res.render('edit', {foundRecipe})
        }
    })
})

// update recipe
app.put('/blog/:id', (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedRecipe) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect(`/blog/${req.params.id}`)
        }
    })
})

// deletes recipe
app.delete('/blog/:id', (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err, deletedRecipe) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`Deleted: ${deletedRecipe}`)
        }
        res.redirect('/blog')
    })
})

app.listen(3000, () => {
    console.log('Server started!')
})


