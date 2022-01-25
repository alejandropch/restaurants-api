const express = require('express');
const authentication = require('../middlewares/authentication.middleware')
const {getReviews, getOneReview, updateReview, createReview, deleteReview} = require('../controllers/reviews.controller')
const router = express.Router()

router.get('/', getReviews)
router.get('/:id', getOneReview)

router.post('/:id', authentication, createReview)
router.patch('/:id', authentication, updateReview)
router.delete('/:id', authentication, deleteReview)

module.exports= router