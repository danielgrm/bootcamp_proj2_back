const express = require('express')
const router = express.Router()
const Profile = require('../models/profile')
const { Mongoose } = require('mongoose')
// const { check, validationResult } = require('express-validator')

// get lista geral
router.get('/', async (req, res, next) => {
    try {
        const profile = await Profile.find({})
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": "server error no barra get do profile" })
    }
})

//lista item individual pelo userid
router.get('/:_id', [], async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.params["_id"]})
  
      if (profile) {
        res.json(profile)
      } else {
        res.status(404).send({ "error": "rapaz, tem isso aqui nao..." })
      }
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": "...dando pobrema com getbyid" })
    }
  })

 
// faz o patch de item individual pelo id do profile
router.patch('/:profileId',  async (req, res, next) => {
  try {
    const id = req.params.profileId
    const update = { $set: req.body }
    const profile = await Profile.findByIdAndUpdate(id, update, { new: true })
    if (profile) {
      res.send(profile)
    } else {
      res.status(404).send({ error: "achei nao..." })
    }
  }catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "deu pau no patch" })
  }
});

// deleta pelo id do profile
router.delete('/:profileId',  async (req, res, next) => {
  try {
    const id = req.params.profileId
    const profile = await Profile.findOneAndDelete({_id : id})
    if (profile) {
      res.json(profile)
    } else {
      res.status(404).send({ "error": "nao achei nao..." })
    }
  }catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "deu pau no delete" })
  }
});


//delete item individual
// router.delete('/:titulo', [], async (req, res, next) => {
//     try {
//       const film = await Film.findOneAndDelete({ titulo: req.params["titulo"]})
    
//         if (film) {
//           res.status(200).send({ "acknowledge" : "queimou o filme"})
//         } else {
//           res.status(404).send({ "error": "celuloid not found" })
//         }
//       } catch (err) {
//         console.error(err.message)
//         res.status(500).send({ "error": "Server Error" })
//       }
//     })

// post cadastra um item
router.post('/', [
    // check('titulo', 'empty name').not().isEmpty(),
    // check('ano', 'empty name').not().isEmpty(),
    // check('genero', 'empty name').not().isEmpty(),
    // check('duracao', 'empty name').not().isEmpty(),
    // check('diretor', 'empty name').not().isEmpty(),
  ], async (req, res, next) => {
    try {
      let { user, company, linkedin, instagram } = req.body

    //   const error = validationResult(req)
    //   if (!error.isEmpty()) 
    //     return res.status(400).json({ error: error.array() })
    //   } else {
        let profile = new Profile({ user, company, linkedin, instagram, })
        let existe = await Profile.findOne({ user : user })
        if (existe){
        return res.status(400).send({ "error": "Nada feito: Ja tem profile!" })
    }else{
        await profile.save()
    }
        if (profile.id) {
          res.json(profile)
        // }
      }
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": "Server error no post" })
    }
  })

  // patch individual
//  router.patch("/:titulo", [
//     check('titulo', 'empty name').not().isEmpty(),
//     ], async (req, res, next) => {
//     try {
//       let { titulo, ano, genero, duracao, diretor } = req.body
//       const error = validationResult(req)
  
//       if (!error.isEmpty()) {
//         return res.status(400).json({ error: error.array() })
//       } 
//         const bodyRequest = req.body
//         const update = {$set: bodyRequest}
//         const film = await Film.findOneAndUpdate({ titulo: req.params['titulo'] }, update, {new:true})
//       if (film) {
//         res.json(film)
//       }
//         else {
//           res.status(404).send({"error":"celuloide nao encontrado"})
//         }
//     } catch (err) {
//       console.error(err.message)
//       res.status(500).send({ "error": "cagou no patch" })
//     }
//   })



 
  
module.exports = router