import {Request, Response} from "express";

export interface ShowService {
    getPagedShows(page: number): Promise<Show[]>;
}

export interface Show {
    id: number;
    name: string;
    cast: Actor[];
}

export interface Actor {
    id: number;
    name: string;
    birthday: string;
}

export interface DbConfig {
    collection: string;
    pageSize: number;
}

export interface MongoAdapter {
    findShowsPage(page: number): Promise<StoredShow[]>;
}

interface Role {
    person: Actor;
}

export interface StoredShow {
    id: number;
    name: string;
    _embedded: {
        cast: Role[]
    };
}

export interface HTTPError extends Error {
    status?: number;
}
export type Middleware = (req: Request, res: Response, next: (err?: any) => void) => void;
export type ErrorMiddleware = (error: HTTPError, req: Request, res: Response, next: (err?: any) => void) => void;
export type Route = (req: Request, res: Response) => void;
