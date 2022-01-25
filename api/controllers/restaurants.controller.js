const Boom = require('@hapi/boom')
const { ObjectId } = require('mongodb')
const Restaurant = require('../models/Restaurant.model')

const getRestaurants = async (req,res,next)=>{

    const {getConvertedValues} = Restaurant.schema.methods
    const {query, skip, limit, page} = await getConvertedValues(req.query)

    const data = await Restaurant.find(query).skip(skip).limit(limit)
    res.status(200).json({
            "restaurants": data,
            page,
            "entries per page":limit,
            nbhits: data.length
        })
}
const getOneRestaurant = async (req,res,next)=>{
    const {id: restID} = req.params
    
    // this step is needed 'cause we need to grab all the reviews the restaurant have
    const restaurant =  await Restaurant.aggregate()
        .match({
                _id: new ObjectId(restID)
         })
        .lookup({
            from:'reviews',
             as: 'reviews',
             let:{
                 id:"$_id"
             },
             pipeline:[{
                $match:{
                    $expr : {
                        $eq:["$restaurant_id","$$id"]
                    }
                }
            }]
        })
// if length is 0 then no restaurant were found
    if(!restaurant.length){
        throw Boom.notFound(`the id provided cannot be found: ${restID}`)
    }
    res.status(200).json({restaurant})
}
const updateRestaurant = async (req,res,next)=>{
    const {
        params: { id: restID },
        body: dataCandidate 
        }=req
    if(!restID || !dataCandidate) { 
        throw Boom.badRequest("You have to provide an id and the data you want to update")
    }
    const restaurant = await Restaurant.findOneAndUpdate({_id: restID}, dataCandidate, {new: true})
    if(!restaurant) { 
        throw Boom.notFound(`the id provided cannot be found: ${restID}`)
    }   
    res.status(200).json({
        message: "Restaurant data was updated successfully",
        update: restaurant
    })
}
const createRestaurant = async (req,res,next) => {
    const dataCandidate = req.body
    if(!dataCandidate){
        throw Boom.notAcceptable("Data must be provided to create a restaurant object")
    }
    const restaurant = await Restaurant.create(dataCandidate)
    res.status(200).json({
        message: "Restaurant data was created successfully",
        update: restaurant
    })
}
const deleteRestaurant = async (req,res,next) => {
    const {id:restID} = req.params
    if(!restID) { 
        throw Boom.badRequest("You have to provide an id of the restaurant you want to delete")
    }
    const restaurant = await Restaurant.findOneAndDelete({_id:restID})
    if(!restaurant) { 
        throw Boom.notFound(`the id provided cannot be found: ${restID}`)
    }
    res.status(200).json({
        message: "Restaurant data was deleted successfully",
        update: restaurant
    })
}
const getAllCuisines = async (req,res,next) => {
    const cuisines = await Restaurant.distinct("cuisine")
    res.status(200).json({
        cuisines
    })
}
module.exports = {getRestaurants, getOneRestaurant, updateRestaurant, createRestaurant, deleteRestaurant, getAllCuisines}