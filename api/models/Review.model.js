const {model, Schema} = require("mongoose")

const schema = reviewSchema = new Schema({

    text: {
        type:String,
        maxlength:200,
        required:[true, "You have to provide a review"]
    },
    user_id:{
        type: Schema.ObjectId,
        required: [true, "You have to provide the user id"],
        unique:false
    },
    restaurant_id: {
        type: Schema.ObjectId,
        required:[true, "You have to provide the restaurant id"],
    },
    name: {
        type:String,
        required:[true, "You have to provide a name"]
    }

}, {timestamps:true})

schema.methods.getConvertedValues = function (values){

    let query = {}
    let {
        page, limit,
        user_id, restaurant_id,
        text,
    } = values
    console.log("hola?");
    page = Number(page) || 1
    limit = Number(limit) || 3
    let skip = (page - 1) * limit

    if(text){
        query.text= {}
    }
    if(user_id){
        query.user_id= {$eq: user_id}
    }
    if(restaurant_id){
        query.restaurant_id={$eq: restaurant_id}
    }
    return { query, skip, limit, page }
}
module.exports = model('review', schema)