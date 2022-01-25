const Boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')

const authentication = (req,res, next)=>{

    const {authorization: auth} = req.headers
    try{
        const token = auth.split(' ')[1]
        const {payload:{user}} = jwt.verify(token,process.env.JWT_KEY)
        req.user= {
            id:user._id,
            password:user.password,
            email:user.email,
            name:user.name
        }
    next()
    }catch(e){
        throw Boom.unauthorized("Your authentication has failed")
    }
}

module.exports = authentication