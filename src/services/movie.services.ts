import { IMovies, IMoviesCreate, IMoviesResult, IMoviesUpdate } from "../interfaces/interface";
import format from "pg-format"
import { client } from "../database/database"
import { QueryResult } from "pg";

export const createMovies = async (payload: IMoviesCreate): Promise<IMovies> => {

    const queryFormat: string = format(
        `INSERT INTO movies (%I) VALUES (%L) RETURNING *;`,
        Object.keys(payload),
        Object.values(payload)
    );
    const queryResult: QueryResult = await client.query(queryFormat)
    return queryResult.rows[0]
}

export const readMovies = async (category: string): Promise<IMovies[]> => {
    const queryString: string = `SELECT * FROM movies;`;
    const queryResult: QueryResult = await client.query(queryString)
        if(category && category !== "outra categoria"){
            const categoryString: string = `SELECT * FROM movies WHERE category = $1;`
            const categoryResult = await client.query(categoryString, [category])
            return categoryResult.rows
        }else{
            return queryResult.rows
        }
}

export const updateMovies = async (payload: IMoviesUpdate, movieId: string): Promise<IMovies> => {
    const queryFormat: string = format(
        `UPDATE movies SET (%I) = ROW(%L) WHERE id = $1 RETURNING *;`,
        Object.keys(payload),
        Object.values(payload)
    )
    const queryResult: QueryResult = await client.query(queryFormat, [movieId])
    return queryResult.rows[0]
}

export const deleteMovies = async (movieId: string): Promise<void> => {
    await client.query(`DELETE FROM movies WHERE id = $1`, [movieId])
}