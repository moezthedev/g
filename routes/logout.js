
import express from "express"
import {Logout} from "../controller/allcontrollers.js"

export const logoutRouter = express.Router();

logoutRouter.get("/",Logout)


