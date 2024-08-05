// const mongoose= require("mongoose")
import mongoose from "mongoose"
// import colors from "colors"
const database=async()=>{
    try{
        const conn =await mongoose.connect("mongodb+srv://mynewuser:number1234@cluster0.dzro3qd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log(`connected to mongodb database`)
    }catch(error){
        console.log(`error in mongodb ${error}`.bgRed.white)

    }
}

export default database
