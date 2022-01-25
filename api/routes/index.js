const express = require('express');
const router = express.Router()
const restaurants = require('./restaurants.router')
const users = require('./users.router')
const authentication = require('../middlewares/authentication.middleware')


//restaurants 
//posts
//users
router.use('/restaurants', restaurants)
router.use('/users', users)
router.use('*', (req,res,next)=>{
    res.status(404).send("<h1>Not Found</h1><p>Try with another route</p>")
})

module.exports = router