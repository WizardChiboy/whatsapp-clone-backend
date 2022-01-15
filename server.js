// imports

import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import Messages from "./dbMessages.js";

dotenv.config();



// app configs

const app = express();
const port = process.env.PORT || 9999 

// middlewares

app.use(express.json())

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

app.post("/messages/new", (req,res) => {
    dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if(err) {
            res.status(500).send(err)

        }

        else {
            res.status(201).send(data)
        }
    })
})

// listen

app.listen(port , console.log(`hey am connected to port: ${port}` ))
