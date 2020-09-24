const express = require('express')
const router = express.Router ()


router.get('/', (req, res) => {
    res.send("Hallo, leute!")
})

module.exports = router
