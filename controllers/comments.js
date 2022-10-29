const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios')


// router.post('/:pokeId/new', async (req,res) => {
// // Grab our pokemon
// const pokemon = await db.pokemon.findByPk(req.params.pokeId)
// // Create a comment
// const [newComment, created] = await db.comment.findOrCreate({
//     where: {
//         description: req.body.description
//     }
// })
// //Add our comment to the pokemon
// await pokemon.addComment(newComment)
// await res.locals.user.addComment(newComment)
// //redirect to pokemon details page
// res.redirect(`/pokemon/${req.params.pokeId}`)
// })



module.exports = router