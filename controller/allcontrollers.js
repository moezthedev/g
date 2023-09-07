
import {userModel} from "../models/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import axios from 'axios';
import { URLSearchParams } from 'url';
export const OpenAi = (req,res)=>{
    const encodedParams = new URLSearchParams();
    const text = req.params.text
 console.log(text,"text");
encodedParams.set('text', text);
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
const options = {
  method: 'POST',
  url: 'https://open-ai21.p.rapidapi.com/texttoimage2',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': 'b61cc4d1abmsha3d5138bdb19adcp1f1c14jsn2be057e19bfc',
    'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com',
  },
  data: encodedParams, 
};

async function makeApiRequest() {
  try {
    const response = await axios.request(options);

    res.send({"data":response.data})
    console.log(response.data);
  } catch (error) {
    console.error(error);
    res.json({"Error":"true"})
  }
}
makeApiRequest();

}
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