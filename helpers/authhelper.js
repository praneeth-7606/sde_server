import bcrypt from "bcrypt"
const hashpassword=async(password)=>{
    try{
        const saltrounds=10;
        const hashedpassword=await bcrypt.hash(password,saltrounds);
        return hashedpassword
    }catch(error){
        console.log(error)

    }

}
const comparepassword=async(password,hashedpassword)=>{
    return bcrypt.compare(password,hashedpassword)
}



export{hashpassword,comparepassword}