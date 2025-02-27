const express = require('express')
const axios = require('axios'); 
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const db = require('./models')
const cryptoJS = require('crypto-js')
const methodOverride = require('method-override')
require('dotenv').config()

// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public/'))

// AUTHENTICATION MIDDLEWARE
app.use(async (req, res, next)=>{
    if(req.cookies.userId) {
        const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.SECRET)
        const decryptedIdString = decryptedId.toString(cryptoJS.enc.Utf8)
        const user = await db.user.findByPk(decryptedIdString)
        res.locals.user = user
    } else res.locals.user = null
    next()
})

// CONTROLLERS
app.use('/users', require('./controllers/users'))
app.use('/recipes', require('./controllers/recipes'))

// ROUTES

app.get('/', (req, res) => {
    let countryUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
     // Use request to call the API
  axios.get(countryUrl).then(apiResponse => {
    let country = apiResponse.data;
    
    // console.log(country)
    res.render('home.ejs', {country:country})
  })
  })
  




app.listen(8000, ()=>{
    console.log('Project 2 Express Authentication')
})