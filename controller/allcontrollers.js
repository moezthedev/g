
import {userModel} from "../models/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
export const register =async (req,res)=>{
    const {name,email,password} = req.body
const hashedPassword = await bcrypt.hash(password,10);

const searchUser = await userModel.find({ email: email });
if(searchUser[0]?.email===email){
    res.json({
        "success":"false",
        "message":"User already exists"
    })
}
else{
   await userModel.create({
        name,
        email,
        password:hashedPassword
    })
    res.json({"success":"true",
"message":"User registered successfully"
})
}


   
}

export const login = async(req,res)=>{
   const {email,password} = req.body
let user = await userModel.findOne({email})
if(req.cookies.userToken){
    const isUserTokenValid = jwt.verify(req.cookies.userToken,"ironman")
    if(isUserTokenValid){

        res.json({
            "success":"true",
            "message":"Token is valid",
            "verification":"true",
            "name":user?.name,
            "email":user?.email
        })
        return;
        }
        else{
            res.json({
                "success":"false",
                "message":"Token is invalid"
            })
        }
        return;
}
    



else if(user){
    
    const isUserPasswordValid = await bcrypt.compare(password,user.password)
    const userTokenId =  jwt.sign(user._id.toString(),"ironman")
    if(isUserPasswordValid){
        res.cookie("userToken",userTokenId,{
            "httpOnly":true
        }).json({
            "success":"true",
            "message":"User is valid",
            "name":user.name,
            "email":user.email,
    
    
        })
    }
    else {
        res.status(200).json({
            "success":"false",
            "message":"User password is not valid"
    
        })
    }
    
}
else{
    res.json({
        "success":"false",
        "message":"User is not registered"
    })
}
    
}
export const Logout = (req,res)=>{
  res.clearCookie('userToken');
  res.json({
    "success":"true",
    "message":"User logged out",
    
  });
}