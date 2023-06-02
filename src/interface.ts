import { QueryResult } from "pg"

export interface IMovies {
    id: number,
    name: string,
    category: string,
    duration: number,
    price: number,
}

export type IMoviesCreate = Omit<IMovies, "id">
export type IMoviesUpdate = Partial<IMoviesCreate>
export type IMoviesResult = QueryResult<IMovies>