import mongoose from "mongoose"

const userSchema  =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unquie:true
    },
    question:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: Number,
        default: 0,
      },
      // phone: {
      //   type: String,
      //   required: true,
      // },
    
   

},{timestamps:true})
export default  mongoose.model("users",userSchema)