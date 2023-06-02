import "dotenv/config"
import express, { Application } from "express"
import { createMovies, deleteMovies, readMovies, retrieveMovies, updateMovies } from "./logic"
import { validateId, validateName } from "./middlewares"
import { startDatabase } from "./database"

const app: Application = express()
app.use(express.json())

app.post("/movies", validateName,createMovies)

app.get("/movies", readMovies)

app.use("/movies/:id", validateId)
app.get("/movies/:id", retrieveMovies)

app.patch("/movies/:id",validateName,updateMovies)

app.delete("/movies/:id", deleteMovies)

app.listen(process.env.PORT, async () => {
    await startDatabase()
    console.log('Server is running')
})