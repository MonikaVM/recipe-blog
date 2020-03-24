const express        = require('express'),
      app            = express(),
      mongoose       = require('mongoose'),
      bodyParser     = require('body-parser'),
      methodOverride = require('method-override')
const passport       = require('passport')
const LocalStrategy  = require('passport-local')
const User           = require('./models/user')

const indexRoutes   = require('./routes/index'),
      recipeRoutes  = require('./routes/recipes'),
      commentRoutes = require('./routes/comments')

// app setup
mongoose.connect('mongodb://localhost:27017/recipe_blog', {useNewUrlParser: true, useUnifiedTopology: true})
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(methodOverride("_method"))
app.set('view engine', 'ejs')

// authentication setup
app.use(require('express-session')({
    secret: 'random words',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/', indexRoutes)
app.use('/blog', recipeRoutes)
app.use('/blog/:id/comments', commentRoutes)


app.listen(3000, () => {
    console.log('Server started!')
})