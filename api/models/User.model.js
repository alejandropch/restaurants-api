const { model, Schema } = require("mongoose")
const bcrypt = require('bcryptjs')

const schema = UserSchema = new Schema({
    email:{
        type:String,
        required:[true, "Email must be provided"],
        unique: true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Provide a valid email"]
        
    },
    password:{
        type:String,
        required:[true, "Password must be provided"]
    },
    name:{
        type:String,
        required:[true, "Name must be provided"]
    }
})

schema.pre('save',async function (){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = model("user", schema )