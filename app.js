const express    = require('express'),
    mongoose     = require('mongoose'),
    bodyParser   = require('body-parser'),
    app          = express()


mongoose.connect('mongodb://localhost:27017/recipe_blog', {useNewUrlParser: true, useUnifiedTopology: true})
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

// schema setup
const recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    ingredients: [String],
    description: String
})

const Recipe = mongoose.model('Recipe', recipeSchema)

app.get('/', (req, res) => {
    res.redirect('/blog')
})

app.get('/blog', (req, res) => {
    res.render('blog')
})

app.get('/blog/new', (req, res) => {
    res.render('new')
})

app.listen(3000, () => {
    console.log('Server started!')
})


