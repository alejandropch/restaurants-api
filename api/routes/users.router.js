const express = require('express');
const authentication = require('../middlewares/authentication.middleware')

const {loginUser, getOneUser, updateUser, registerUser, deleteUser} = require('../controllers/users.controller')
const router = express.Router()

router.post('/login', loginUser)
router.get('/:id', getOneUser)
router.post('/register', registerUser)
router.patch('/:id', authentication, updateUser)
router.delete('/:id', authentication, deleteUser)


module.exports = router