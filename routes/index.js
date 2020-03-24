const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

router.get('/', (req, res) => {
    res.redirect('/blog')
})

// authentication

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, (err, newUser) => {
        if (err) {
            console.log(err)
            return res.render('register')
        }
        passport.authenticate('local')(req, res, () => {
            console.log(newUser)
            res.redirect('/blog')
        })
    })
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/blog',
    failureRedirect: '/login'
}), (req, res) => {
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/blog')
})

module.exports = router