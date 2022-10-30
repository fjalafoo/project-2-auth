const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios')


router.post('/id=:id', async (req,res) => {

    if(res.locals.user){
        let user = await db.user.findByPk(res.locals.user.id)
        let newComment = db.comment.create({
            comment:req.body.comment,
            recipeId: req.params.id
        })
        await user.addComment(newComment)
        res.redirect(`/id=${req.params.id}`)
    }

    else {
        res.send("LOGIN!")
    }

   
    })
    

module.exports = router