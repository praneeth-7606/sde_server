import express from "express";
import dotenv from "dotenv";
import database from "./config/db.js";
import authroutes from "./routes/authroute.js"
import imageuploads from "./routes/imageupload.js"
import cors from "cors"
import path from "path";
const app=express()
app.use(cors()); 

dotenv.config();

app.use(express.json())


app.use("/api/route/auth",authroutes)
app.use(express.urlencoded({ extended: true }));

app.use('/api/image', imageuploads);
app.use('/uploads', express.static('uploads'));
app.get("/",(req,res)=>{
    res.send("<h1>hi hello good morning darling </h1>")
})
database()
const port=3002
app.listen(port,()=>{
    console.log(`connected to the server  running on port ${port}`)
})

