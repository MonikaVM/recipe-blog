const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware');
const { register, login, logout } = require('../controllers/index');

// home page
router.get('/', (req, res) => {
    res.redirect('/blog')
});

// show register form
router.get('/register', (req, res) => {
    res.render('register')
});

// register in
router.post('/register', asyncErrorHandler(register));

// show login page
router.get('/login', (req, res) => {
    res.render('login');
})

// log in user
router.post('/login', login);

// log out user
router.get('/logout', logout);

module.exports = router;