const Boom = require('@hapi/boom')
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res, next) => {
    const {email,password} = req.body

    const user= await User.findOne({email})
    if(!user){
        throw Boom.badRequest("No user with this email was found")
    }
    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid){
        throw Boom.badRequest("Wrong password")
    }
    const token = jwt.sign({payload:{user}},process.env.JWT_KEY,{expiresIn:"30d"})
    res.status(200).json({user, token})
}
const getOneUser = async (req, res, next) => {
    const {id: restID} = req.params
    const user = await User.findOne({_id: restID})

    if(!user){
        throw Boom.notFound(`the id provided cannot be found: ${restID}`)
    }
    res.status(200).json({user})
}
const updateUser = async (req, res, next) => {
    const {
        params: { id: restID },
        body: dataCandidate 
        }=req
    if(!restID || !dataCandidate) { 
        throw Boom.badRequest("You have to provide an id and the data you want to update")
    }
    const user = await User.findOneAndUpdate({_id: restID}, dataCandidate, {new: true})
    if(!user) { 
        throw Boom.notFound(`the id provided cannot be found: ${restID}`)
    }   
    res.status(200).json({
        message: "user data was updated successfully",
        update: user
    })
}
const registerUser = async (req, res, next) => {
    const data = req.body
    if(!data){
        throw Boom.notAcceptable("Data must be provided to create a user object")
    }
    const user = await User.create(data)
    const token= jwt.sign({payload:{user}},process.env.JWT_KEY,{expiresIn:"30d"})
    res.json({
        message: "user data was created successfully",
        user,
        token
    })
}
const deleteUser = async (req, res, next) => {
    const {id:restID} = req.params
    if(!restID) { 
        throw Boom.badRequest("You have to provide an id of the user you want to delete")
    }
    const user = await User.findOneAndDelete({_id:restID})
    if(!user) { 
        throw Boom.notFound(`the id provided cannot be found: ${restID}`)
    }
    res.status(200).json({
        message: "user data was deleted successfully",
        update: user
    })
}
module.exports = {loginUser, getOneUser, updateUser, registerUser, deleteUser}