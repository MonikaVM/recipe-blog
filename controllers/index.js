const passport = require('passport')
const User = require('../models/user')

module.exports = {

    async register(req, res, next) {
        const newUser = new User({username: req.body.username})
        await User.register(newUser, req.body.password)
        await passport.authenticate('local')(req, res, () => {
            res.redirect('/recipes')
        })
    },

    login(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/recipes',
            failureRedirect: '/login'
        })(req, res, next)
    },

    logout(req, res, next) {
        req.logout()
        res.redirect('/recipes')
    }

}