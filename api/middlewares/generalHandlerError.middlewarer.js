const generalErrorHandler = (err, req, res, next) => {
 
    const error = {}
    let status
    let message
    if(err.name == "CastError"){
        status= 400
        message= "ID do not match with the format of a Mongo ID string, try with another one"
    }
    if(err.code == 11000){
        status= 409
        message= "A data provided already exists"
    }
    if(!status || !message){
        status = 500
        message = "something went wrong, we are fixing it"
        console.log(err)
    }
    Object.assign(error,{status,message})
    res.status(status).json(error)
}
module.exports=generalErrorHandler