const express        = require('express')
const mongoose       = require('mongoose')
const bodyParser     = require('body-parser')
const methodOverride = require('method-override')
const cookieParser   = require('cookie-parser')
const passport       = require('passport')
const LocalStrategy  = require('passport-local')
const session        = require('express-session')
const User           = require('./models/user')

const indexRoutes   = require('./routes/index')
const recipeRoutes  = require('./routes/recipes')
const commentRoutes = require('./routes/comments')

// app setup
const app = express()
mongoose.connect('mongodb://localhost:27017/recipe_blog', {useNewUrlParser: true, useUnifiedTopology: true})
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(methodOverride("_method"))
app.use(cookieParser())
app.set('view engine', 'ejs')

// authentication setup
app.use(session({
    secret: 'random words',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// set local variables middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.session.success || ''
    delete req.session.success
    res.locals.error = req.session.error || ''
    delete req.session.error
    next()
})

app.use('/', indexRoutes)
app.use('/recipes', recipeRoutes)
app.use('/recipes/:id/comments', commentRoutes)

// error handler
app.use((err, req, res, next) => {
    console.log(err)
    req.session.error = err.message
    res.redirect('back')
})

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log('Server started!')
})