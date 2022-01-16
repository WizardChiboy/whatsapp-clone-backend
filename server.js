// imports

import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import Messages from "./dbMessages.js";
import Pusher from "pusher";

dotenv.config();

// realtime configuration


const pusher = new Pusher({
    appId: "1332472",
    key: process.env.pusher_key,
    secret: process.env.pusher_secret,
    cluster: "eu",
    useTLS: true
  });



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
})

// db connection
const db = mongoose.connection

 db.once("open", () => {
    console.log("connected to mongo and we are set!!")

    const msgCollection = db.collection("messagecontents")
    const changeStream = msgCollection.watch()

    changeStream.on("change", (change) => {
        console.log(change)

        if(change.operationType === "insert") {

        }

    })
})





// api endpoint

app.get("/", (req,res)=> res.status(200).send("hello don")) 

// getting all data from db

app.get("/messages/sync", (req, res) => {
    Messages.find((err, data)=> {

        if(err) {
            res.status(err).send (err)
        }

        else {
            res.status(200).send(data)
        }

    })
})


// posting a data to db
app.post("/messages/new", (req,res) => {
   const dbMessage = req.body

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
