import "dotenv/config"
import express, { Application } from "express"
import { movieRouter } from "./routers"
import { handleError } from "./middlewares/handleErrors.middlewares"
import "express-async-errors"


export const app: Application = express()
app.use(express.json())

app.use("/movies", movieRouter)

app.use(handleError)
