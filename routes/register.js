import express from "express"
import {register} from "../controller/allcontrollers.js"
export const registerRouter = express.Router()

registerRouter.post("/",register)