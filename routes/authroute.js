import express from "express";
import {registercontroller,loginController,testController,forgotpasswordcontroller} from "../controller/authcontroller.js"
import { isAdmin, requireSignIn } from "../middleware/authmiddleware.js";
const router=express.Router()
router.post("/register",registercontroller)

//LOGIN || POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);



//forgot password 
router.post("/forgot",forgotpasswordcontroller)
//protected route-auth
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})



export default router
