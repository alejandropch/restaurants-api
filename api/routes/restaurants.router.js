const express = require('express');

const {getRestaurants, getOneRestaurant, updateRestaurant, createRestaurant, deleteRestaurant, getAllCuisines} = require('../controllers/restaurants.controller')
const review = require('./restaurant.review.router')
const router = express.Router()

router.route('/').get(getRestaurants).post(createRestaurant)
router.route('/cuisines').get(getAllCuisines)
router.use('/review', review)
router.route('/:id').get(getOneRestaurant).patch(updateRestaurant).delete(deleteRestaurant)


module.exports = router