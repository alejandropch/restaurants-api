const Boom = require('@hapi/boom')
const Review = require('../models/Review.model')


const getReviews = async (req,res,next)=>{
    const {getConvertedValues} = Review.schema.methods

    const {query, skip, limit, page} = await getConvertedValues(req.query)
    const data = await Review.find(query).skip(skip).limit(limit)
    
    res.status(200).json({
            "reviews": data,
            page,
            "entries per page":limit,
            nbhits: data.length
        })
}


const getOneReview = async (req,res,next)=>{
    const {id: restID} = req.params
   
    const review = await Review.findOne({_id: restID})
    if(!review){
        throw Boom.notFound(`the id provided cannot be found: ${restID}`)
    }
    res.status(200).json({review})
}



const updateReview = async (req,res,next)=>{
    const {
        body ,
        params: { id: restaurant_id },
        user:{id:user_id}
        }=req

    const data = {
            ...body,
            user_id
        }
    if(!restaurant_id || !data) { 
        throw Boom.badRequest("You have to provide an id and the data you want to update")
    }
    const review = await Review.findOneAndUpdate({restaurant_id, user_id}, data, {new: true})
    if(!review) { 
        throw Boom.notFound(`the id provided cannot be found: ${restaurant_id}`)
    }   
    res.status(200).json({
        message: "Review was updated successfully",
        update: review
    })
}


const createReview = async (req,res,next) => {
    const {body, user, params:{id:restaurant_id}} = req
    const data ={
        ...body,
        name:user.name,
        user_id:user.id,
        restaurant_id
    }
    if(!body){
        throw Boom.notAcceptable("Data must be provided to create a review object")
    }
    console.log(restaurant_id)
    const isRepeated = await Review.exists({
        user_id: user.id,
        restaurant_id
    })
    if(isRepeated){
        throw Boom.conflict("A review with the user id provided has been published already")
    }

    const review = await Review.create(data)
    res.status(200).json({
        message: "Review was created successfully",
        update: review
    })
}
const deleteReview = async (req,res,next) => {
    const {params:{id:reviewID}, user:{id:user_id}} = req
    if(!reviewID) { 
        throw Boom.badRequest("You have to provide an id of the review you want to delete")
    }
    
    const review = await Review.findOneAndDelete({_id:reviewID, user_id})
    if(!review) { 
        throw Boom.notFound(`the id provided cannot be found: ${reviewID}`)
    }

    res.status(200).json({
        message: "Review was deleted successfully",
        review
    })
}

module.exports = {getReviews, getOneReview, updateReview, createReview, deleteReview}