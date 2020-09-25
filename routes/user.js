const express = require('express')
const router = express.Router()
const Film = require('../models/user')
const { Mongoose } = require('mongoose')
const { check, validationResult } = require('express-validator')
const auth = require ('../middleware/auth')
const Cast = require ('../models/cast')

// get lista geral
router.get('/', auth, [], async (req, res, next) => {
    try {
        const film = await Film.find({})
//        console.log(film)
        res.json(film)
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": "server error no barra get" })
    }
})
// get nalista do casting
router.get('/cast',   async (req, res, next) => {
  try {
      const cast1 = await Cast.find({})
//        console.log(film)
      res.json(cast1)
  } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": "server error no barra get" })
  }
})


//lista item individual
router.get('/:_id', [], async (req, res, next) => {
  try {
    const film = await Film.findOne({ _id: req.params["_id"]})
  
      if (film) {
        res.json(film)
      } else {
        res.status(404).send({ "error": "celuloid not found" })
      }
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": "Server Error no get film by id" })
    }
  })


//delete item individual
router.delete('/:titulo', auth, [], async (req, res, next) => {
    try {
      const film = await Film.findOneAndDelete({ titulo: req.params["titulo"]})
    
        if (film) {
          res.status(200).send({ "acknowledge" : "queimou o filme"})
        } else {
          res.status(404).send({ "error": "celuloid not found" })
        }
      } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": "Server Error no delete" })
      }
    })

// post cadastra um item
router.post('/', auth, [
    check('titulo', 'empty name').not().isEmpty(),
    check('ano', 'empty name').not().isEmpty(),
    check('genero', 'empty name').not().isEmpty(),
    check('duracao', 'empty name').not().isEmpty(),
    check('diretor', 'empty name').not().isEmpty(),
  ], auth, async (req, res, next) => {
    try {
      let { titulo, ano, genero, duracao, diretor } = req.body

      const error = validationResult(req)
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
      } else {
        let film = new Film({ titulo, ano, genero, duracao, diretor })
  
        await film.save()

        if (film.id) {
          res.json(film)
        }
      }
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": "Server error no post" })
    }
  })

  // patch individual
 router.patch("/:_id", auth, [
    // check('titulo', 'empty name').not().isEmpty(),
    ], async (req, res, next) => {
    try {
      let { id, titulo, ano, genero, duracao, diretor } = req.body
      const error = validationResult(req)
  
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
      } 
        const bodyRequest = req.body
        const update = {$set: bodyRequest}
        const film = await Film.findOneAndUpdate({ _id: req.params['_id'] }, update, {new:true})

      if (film) {
        res.json(film)
      }
        else {
          res.status(404).send({"error":"celuloide nao encontrado"})
        }
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": "cagou no patch" })
    }
  })
  
  router.post('/cast', [
    check('cast', 'empty name').not().isEmpty(),
      ], async (req, res, next) => {
    try {
      let { user, cast } = req.body

      const error = validationResult(req)
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
      } else {
        let cast1 = new Cast({ user, cast })
  
        await cast1.save()

        if (cast1.id) {
          res.json(cast1)
        }
      }
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": "Server error no post de cast" })
    }
  })



 
  
module.exports = router