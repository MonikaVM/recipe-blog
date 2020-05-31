const express        = require('express')
const app            = express()
const mongoose       = require('mongoose')
const bodyParser     = require('body-parser')
const methodOverride = require('method-override')
const passport       = require('passport')
const LocalStrategy  = require('passport-local')
const User           = require('./models/user')

const indexRoutes   = require('./routes/index')
const recipeRoutes  = require('./routes/recipes')
const commentRoutes = require('./routes/comments')

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

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    next()
})

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/', indexRoutes)
app.use('/recipes', recipeRoutes)
app.use('/recipes/:id/comments', commentRoutes)

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log('Server started!')
})