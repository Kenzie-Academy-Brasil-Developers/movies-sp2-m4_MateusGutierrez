import { NextFunction, Request, Response } from "express"
import { IMoviesResult, IMovies} from "../interfaces/interface"
import {client} from "../database/database"
import { NotFound } from "../error"
import { QueryResult } from "pg"

export const validateId = async (req: Request, res: Response, next: NextFunction ): Promise<Response | void> => {
    const  { id} = req.params
    const queryResult: QueryResult = await client.query(
        `SELECT * FROM movies WHERE id = $1 `, [id]
    )
    const movie: IMovies = queryResult.rows[0]

    if(!movie){
        throw new NotFound("Movie not found!")
    }

    res.locals = {...res.locals, foundMovies: movie}
    return next()
}


