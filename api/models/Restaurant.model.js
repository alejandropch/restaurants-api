const { model, Schema } = require("mongoose")
const gradesubSchema = new Schema({
        date: {type: Date},
        grade: {type: String},
        score: {type: Number}
},{_id:false})
const addresssubSchema = new Schema({
        building: {type:String,
        required:[true, "Building must be provided"],
        },
        coord: [{type: Number}],
        street: {type:String,
            required:[true, "Street must be provided"],
        },
        zipcode: {type:String}
},{_id:false})
const schema = RestaurantSchema = new Schema({

    address: [addresssubSchema],
    borough: {type:String},
    cuisine: {type:String},
    grades: [gradesubSchema],

    name: String,
    restaurant_id: String
},{timestamps:true})

schema.methods.getConvertedValues = function (values){

    let query = {}
    let {
        page, limit,
        cuisine, zipcode,
        name: restName,
    } = values
    
    page = Number(page) || 1
    limit = Number(limit) || 9
    let skip = (page - 1) * limit

    if(restName){
        query.name= {$text:{
            $search:restName
        }}
    }
    if(cuisine){
        query.cuisine= {$eq: cuisine}
    }
    if(zipcode){
        query={
            ...query,
            "address.zipcode":{$eq: zipcode}
        }
    }
    return { query, skip, limit, page }
}
module.exports = model("restaurant", schema )