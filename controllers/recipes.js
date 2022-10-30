const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios'); 
const cryptojs = require('crypto-js')
require('dotenv').config()
const bcrypt = require('bcrypt')




  //GET /recipes/id ==> it will display recipe details

  router.get('/:id', async(req, res) => {

    let mealId = req.params.id
    // console.log(mealId)
    let recipeUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    // Use request to call the API
  axios.get(recipeUrl).then( async apiResponse => {
    let comments = await db.comment.findAll({
      where: {recipeId: mealId},
      include: [db.user]
    })
    let recipeDetail = apiResponse.data;
    // console.log(recipeDetail)
    res.render('recipes/recipeDetail.ejs', {recipeDetail:recipeDetail,comments:comments})
  })

  })


//post comments
router.post('/:id', async (req,res)=>{
  if(res.locals.user){
  db.comment.create({
      comment:req.body.comment,
      recipeId:req.params.id,
      userId:res.locals.user.dataValues.id,
      include: [db.user, db.recipe]
  })
  .then((post) => {
      res.redirect(`/recipes/${req.params.id}`)

  })

  .catch((error)=>{
      console.log(error)
  })
  }else {
    res.send("kindly login.") 
    
  }
})


// GET /recipes/random display a random recipe
router.get('/random', (req, res) => {
    let randomUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
     // Use request to call the API
  axios.get(randomUrl).then(apiResponse => {
    let recipeDetail = apiResponse.data
    // console.log(recipeDetail)
    res.render('recipes/random.ejs', {recipeDetail:recipeDetail})
  })
  })
  


  //GET /recipes/country ==> it will display all recipes in a certain country

  router.get('/country/:c', (req, res) => {

    let ctr = req.params.c
    let countryUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${ctr}`;
    // Use request to call the API
  axios.get(countryUrl).then(apiResponse => {
    let ctr = req.params.c
    let country = apiResponse.data;
    // console.log(country)
    res.render('recipes/country.ejs', {country:country,ctr:ctr})
  })

  })



  module.exports = router
  