require("express-async-errors")
require("dotenv").config()
const express = require ("express")
const cors = require("cors")
const xss = require('xss-clean')
const helmet = require("helmet")
const rateLimit= require("express-rate-limit")
const boomHdlErr = require("./errors/boomHandlerError")
const generalHdlErr = require("./middlewares/generalHandlerError.middlewarer")
const routes = require("./routes")
const connectDB = require("./db")

// Swagger for doc
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

const app = express()
const PORT = process.env.PORT || 3000
const URI = process.env.MONGO_URI
app.use(express.json())

// security
app.set('trust proxy', 1)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, 
	max: 100,  
	standardHeaders: true,
	legacyHeaders: false
}))
app.use(xss())
app.use(helmet())

app.use(cors())

app.get("/",(req,res)=>res.send("<h1>Restaurant Review API</h1><a href='/api-use'>Documentation</a>"))
app.use("/api-use", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use("/api/v1", routes)
//error handlers
app.use(boomHdlErr)
app.use(generalHdlErr)
const start = async () => {
    try{
        await connectDB(URI)
        app.listen(PORT, ()=> console.log("listening on port:",PORT))
    }catch(e){
        console.log(e)
        process.exit(1)
    }
}
start()