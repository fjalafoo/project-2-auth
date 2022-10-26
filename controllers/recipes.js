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
    let recipeDetail = apiResponse.data
    // console.log(recipeDetail)
    res.render('recipes/random.ejs', {recipeDetail:recipeDetail})
  })
  })
  

  //GET /recipes/country ==> it will display all recipes in a certain country

  router.get('/:c', (req, res) => {
    let countryUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
     // Use request to call the API
  axios.get(countryUrl).then(apiResponse => {
    let country = apiResponse.data;
    
    // console.log(country)
    res.render('recipes/country.ejs', {country:country})
  })
  })




  module.exports = router
  