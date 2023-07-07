import { Router } from "express"
import { validateId } from "../middlewares/validadeId.middlewares"
import { create, destroy, read, retrieve, update } from "../controllers/movie.controllers"
import { validateName } from "../middlewares/validateName.middleware"
export const movieRouter: Router = Router()

movieRouter.post("", validateName,create)

movieRouter.get("", read)

movieRouter.use("/:id", validateId)
movieRouter.get("/:id", retrieve)

movieRouter.patch("/:id",validateName,update)

movieRouter.delete("/:id", destroy)

