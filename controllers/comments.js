const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios')


router.post('/id=:id/new', async (req,res) => {
    // Grab our recipe
    const recipe = await db.recipes.findByPk(req.params.id)
    // Create a comment
    const [newComment, created] = await db.comment.findOrCreate({
        where: {
            content: req.body.content
        }
    })
    //Add our comment to the recipe
    await recipe.addComment(newComment)
    await res.locals.user.addComment(newComment)
    //redirect to recipe details page
    res.redirect(`/id=:${req.params.id}`)
    })
    

module.exports = router