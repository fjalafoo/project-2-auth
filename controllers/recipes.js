const express = require('express')
const db = require('../models')
const router = express.Router()
const axios = require('axios'); 
const cryptojs = require('crypto-js')
require('dotenv').config()
const bcrypt = require('bcrypt')



// GET /recipes/random display a random recipe
router.get('/random', (req, res) => {
    let randomUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
     // Use request to call the API
  axios.get(randomUrl).then(apiResponse => {
    let random = apiResponse.data;
    console.log(random)
    let recipeDetail = apiResponse.data
    res.render('random.ejs', {recipeDetail:recipeDetail})
  })
  })
  


  module.exports = router
  