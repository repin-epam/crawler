import {Request, Response} from "express";
import {Middleware, Route} from "../types";

export default function(route: Route): Middleware {
    return async (req: Request, res: Response, next: (err?: any) => void) => {
        try {
            await route(req, res);
        } catch (err) {
            next(err);
        }
    };
}
