import { NextFunction, Request, Response } from "express"
import { IMoviesResult, IMovies, IMoviesCreate } from "./interface"
import {client} from "./database"

export const validateId = async (req: Request, res: Response, next: NextFunction ): Promise<Response | void> => {
    const  { id} = req.params
    const queryResult: IMoviesResult = await client.query(
        `SELECT * FROM movies WHERE id = $1 `, [id]
    )
    const movie: IMovies = queryResult.rows[0]

    if(!movie){
        return res.status(404).json({"error": "Movie not found!"})
    }

    res.locals = {...res.locals, foundMovies: movie}
    return next()
}


export const validateName = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const payload: IMovies | IMoviesCreate = req.body
    const queryString: string = `SELECT * FROM movies WHERE name = $1;`;
    const queryResult: IMoviesResult = await client.query(queryString, [payload.name])
    
        if(queryResult.rowCount > 0){
            const error: string = "Movie name already existis."
            return res.status(409).json({error})
        }
    
    return next()
}

