// imports

import express from "express"
import Mongoose from "mongoose"

// app configs

const app = express();
const port = process.env.PORT | 9999 

// middlewares

// Db config


// api endpoint

app.get("/", (req,res)=> res.status(200).send("hello don"))

// listen

app.listen(port , console.log(`hey am connected to: ${port}` ))
