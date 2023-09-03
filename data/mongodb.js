
import mongoose from "mongoose";
export const connectMongoDB = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/",{
        dbName:"users",
        useNewUrlParser: true,
  useUnifiedTopology: true,
    })
.then(()=>{console.log("DB connected")})
.catch((err)=>{console.log(err)})}

