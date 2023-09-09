require('dotenv').config()

const express = require('express')
const cors = require('cors')
require('./db/connection')
const router = require('./routes/router')



// Create an express application
const emsServer = express()

// use cors
emsServer.use(cors())
// use json parser in server
emsServer.use(express.json())

emsServer.use(router)

emsServer.use('/uploads',express.static("./uploads"))


// Setup port number to listen server
const port = 4000 || process.env.PORT

// run or listen server app
emsServer.listen(port,()=>{
    console.log(`EMS server started at port no:${port}`);
})

// get request
emsServer.get("/",(req,res)=>{
    res.status(200).send(`<h1>EMS server started</h1>`)
})