const express    = require('express'),
    mongoose     = require('mongoose'),
    bodyParser   = require('body-parser'),
    app          = express()

// app setup
mongoose.connect('mongodb://localhost:27017/recipe_blog', {useNewUrlParser: true, useUnifiedTopology: true})
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

// schema setup
const recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    ingredients: String,
    description: String
})

const Recipe = mongoose.model('Recipe', recipeSchema)

app.get('/', (req, res) => {
    res.redirect('/blog')
})

// shows all recipes
app.get('/blog', (req, res) => {
    Recipe.find({}, (err, recipes) => {
        if (err) {
            console.log(err)
        } else {
            res.render('blog', {recipes: recipes})
        }
    })
})

// shows form for new recipe
app.get('/blog/new', (req, res) => {
    res.render('new')
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

app.listen(3000, () => {
    console.log('Server started!')
})


