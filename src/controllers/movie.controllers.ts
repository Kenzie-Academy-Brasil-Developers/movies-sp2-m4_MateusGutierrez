import { Request, Response } from "express";
import { IMovies} from "../interfaces/interface";
import { createMovies,readMovies, updateMovies,deleteMovies } from "../services/index";


export const create = async (req: Request, res: Response): Promise<Response> => {
    const movie: IMovies = await createMovies(req.body)
    return res.status(201).json(movie)
}

export const read = async (req: Request, res: Response): Promise<Response> => {
    const movies: IMovies[] = await readMovies(req.body.category)
    return res.status(200).json(movies)
}

export const retrieve = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json(res.locals.foundMovies)
}

export const update = async (req: Request, res: Response): Promise<Response> => {
    const movie: IMovies = await updateMovies(req.body, req.params.id)
    return res.status(200).json(movie)
}

export const destroy = async (req: Request, res: Response): Promise<Response> => {
   await deleteMovies(req.params.id)
   return res.status(204).json()
}