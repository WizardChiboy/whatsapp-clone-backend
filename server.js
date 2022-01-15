// imports

import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();



// app configs

const app = express();
const port = process.env.PORT || 9999 

// middlewares

// Db config

const mongo_url = process.env.MONGO_URL
mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology :true
}, () => {
console.log("connected to mongo and we are set!!"
)})


// api endpoint

app.get("/", (req,res)=> res.status(200).send("hello don"))

// listen

app.listen(port , console.log(`hey am connected to port: ${port}` ))
