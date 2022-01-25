const boomHandler = (err, req, res, next) => {

    if(!err.isBoom){
        return next(err)
    }
    const {output:{payload:error}} = err
    res.status(error.statusCode).json(error)
}
module.exports=boomHandler