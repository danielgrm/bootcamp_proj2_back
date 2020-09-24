const express = require('express')
const router = express.Router()
const Film = require('../models/user')
const { Mongoose } = require('mongoose')
const { check, validationResult } = require('express-validator')
const auth = require ('../middleware/auth')
const Cast = require ('../models/cast')

// get nalista do casting
router.get('/',  async (req, res, next) => {
    try {
        const cast1 = await Cast.find({})
  //        console.log(film)
        res.json(cast1)
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": "server error no barra get" })
    }
  })

router.put('/', [
    check('cast', 'empty name').not().isEmpty(),
      ], async (req, res, next) => {
    try {
/*       let { user, cast } = req.body

      const error = validationResult(req)
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
      } else {
        // let cast1 = new Cast({ user, cast })
  
        //await cast1.save() */
        let cast1 = await Cast({user}, { $push : { cast :  req.body }} , { new: true })

        if (cast1) {

          res.json(cast1)
        
      }
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": "Server error no post de cast" })
    }
  })
  module.exports = router