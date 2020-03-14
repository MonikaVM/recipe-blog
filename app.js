const express        = require('express'),
      app            = express(),
      mongoose       = require('mongoose'),
      bodyParser     = require('body-parser'),
      methodOverride = require('method-override'),
      Recipe         = require('./models/recipe')

const indexRoutes = require('./routes/index')
const recipeRoutes = require('./routes/recipes')

// app setup
mongoose.connect('mongodb://localhost:27017/recipe_blog', {useNewUrlParser: true, useUnifiedTopology: true})
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(methodOverride("_method"))
app.set('view engine', 'ejs')

app.use('/', indexRoutes)
app.use('/blog', recipeRoutes)

app.listen(3000, () => {
    console.log('Server started!')
})