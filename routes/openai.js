
import express from "express"
import {OpenAi} from "../controller/allcontrollers.js"

export const openAiRouter = express.Router();

openAiRouter.get("/:text",OpenAi)


