import express from "express"
import {loginRouter} from "./routes/login.js"
import {logoutRouter} from "./routes/logout.js"
import {registerRouter} from "./routes/register.js"
import {connectMongoDB} from "./data/mongodb.js"
import cookieParser from "cookie-parser";
const app = express();

//Connect Mongodb
connectMongoDB()
//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use("/login",loginRouter)
app.use("/register",registerRouter)
app.use("/logout",logoutRouter)
//Listen

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})