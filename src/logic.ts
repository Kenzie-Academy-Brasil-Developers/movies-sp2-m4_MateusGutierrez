import { Request, Response } from "express";
import { IMovies, IMoviesCreate, IMoviesResult, IMoviesUpdate } from "./interface";
import format from "pg-format"
import { client } from "./database"

export const createMovies = async (req: Request, res: Response): Promise<Response> => {
    const payload: IMoviesCreate = req.body;

    const queryFormat: string = format(
        `INSERT INTO movies (%I) VALUES (%L) RETURNING *;`,
        Object.keys(payload),
        Object.values(payload)
    );
    const queryResult: IMoviesResult = await client.query(queryFormat)
    return res.status(201).json(queryResult.rows[0])
}

export const readMovies = async (req: Request, res: Response): Promise<Response> => {
    const queryString: string = `SELECT * FROM movies;`;
    const queryResult = await client.query(queryString)
        if(req.query.category && req.query.category !== "outra categoria"){
            const categoryString: string = `SELECT * FROM movies WHERE category = $1;`
            const categoryResult = await client.query(categoryString, [req.query.category])
            return res.status(200).json(categoryResult.rows)
        }else{
            return res.status(200).json(queryResult.rows)
        }
}

export const retrieveMovies = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json(res.locals.foundMovies)
}

export const updateMovies = async (req: Request, res: Response): Promise<Response> => {
    const payload: IMoviesUpdate = req.body

    const queryFormat: string = format(
        `UPDATE movies SET (%I) = ROW(%L) WHERE id = $1 RETURNING *;`,
        Object.keys(payload),
        Object.values(payload)
    )
    const queryResult: IMoviesResult = await client.query(queryFormat, [req.params.id])
    return res.status(200).json(queryResult.rows[0])
}

export const deleteMovies = async (req: Request, res: Response): Promise<Response> => {
    await client.query(`DELETE FROM movies WHERE id = $1`, [req.params.id])
    return res.status(204).json()
}