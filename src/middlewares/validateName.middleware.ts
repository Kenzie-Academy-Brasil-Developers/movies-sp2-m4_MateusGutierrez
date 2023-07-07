import { NextFunction, Request, Response } from "express"
import { IMoviesResult, IMovies, IMoviesCreate } from "../interfaces/interface"
import {client} from "../database/database"
import { AppError } from "../error"
import { QueryResult } from "pg"

export const validateName = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const payload: IMovies | IMoviesCreate = req.body
    const queryString: string = `SELECT * FROM movies WHERE name = $1;`;
    const queryResult: QueryResult = await client.query(queryString, [payload.name])
    
        if(queryResult.rowCount > 0){
            const error: string = "Movie name already existis."
            throw new AppError(error, 400)
        }
    
    return next()
}

