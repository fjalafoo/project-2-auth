const express = require('express')
const db = require('../models')
const router = express.Router()
const cryptojs = require('crypto-js')
require('dotenv').config()
const bcrypt = require('bcrypt')

router.get('/new', (req, res)=>{
    res.render('users/new.ejs')
})

router.post('/', async (req, res)=>{
    const [newUser, created] = await db.user.findOrCreate({where:{username: req.body.username, email: req.body.email}})
    if(!created){
        console.log('user already exists')
        res.render('users/login.ejs', {error: 'Looks like you already have an account! Try logging in :)'})
    } else {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        newUser.password = hashedPassword
        
        await newUser.save()
        const encryptedUserId = cryptojs.AES.encrypt(newUser.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        res.cookie('userId', encryptedUserIdString)
        res.redirect('/')
    }
})

router.get('/login', (req, res)=>{
    res.render('users/login.ejs')
})

router.post('/login', async (req, res)=>{
    const user = await db.user.findOne({where: {email: req.body.email}})
    if(!user){
        console.log('user not found')
        res.render('users/login', { error: "Invalid email/password" })
    } else if(!bcrypt.compareSync(req.body.password, user.password)) {
        console.log('password incorrect')
        res.render('users/login', { error: "Invalid email/password" })
    } else {
        console.log('logging in the user!!!')
        const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        res.cookie('userId', encryptedUserIdString)
        res.redirect('/')
    }
})

router.get('/logout', (req, res)=>{
    console.log('logging out')
    res.clearCookie('userId')
    res.redirect('/')
})

router.get('/profile', async(req, res)=>{

    let faves = await db.recipe.findAll({
       attributes: ['title','img','recipeId']
      })

      res.render(`users/profile.ejs`,{faves:faves}) 
})

router.post('/profile', async (req, res)=>{

    try {
        
        const [recipe, recipeCreated] = await db.recipe.findOrCreate({
        where: {
        recipeId:req.body.recipeId,
          title: req.body.title,
          img: req.body.img   
        }
       })
              
        const user = await db.user.findAll({
    
      }) 
              
       await recipe.addUser(user)
     
    //    console.log("your favortie ")    
      } 
      catch(error) {
        console.log("error", error)
     }

     res.redirect(`/users/profile`) 
})


// (Form) DELETE 

// router.delete('/profile', async (req,res) => {
//     // const recipeId = await db.recipes.findByPk(res.locals.recipe.recipeId)

//     rId = req.body.recipeId
//     await db.recipe.destroy({
//         where: { 
//             // id: req.params.recipeId
//             recipeId:req.body.recipeId
//             // title: req.body.title,
//             // img: req.body.img   
//          }
//     })
//     .then((recipe)=>{
//         res.render('users/profile',{faves: faves, rId})
//     })
//     .catch((error)=>{
//         console.log(error)
//     })
//     res.redirect(`/users/profile`)
// })


module.exports = router