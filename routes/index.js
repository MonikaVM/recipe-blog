const express = require('express'),
      router = express.Router()

router.get('/', (req, res) => {
    res.redirect('/blog')
})

module.exports = router