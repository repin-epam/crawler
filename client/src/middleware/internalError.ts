import {Request, Response} from "express";
import {ErrorMiddleware, HTTPError} from "../types";

export default function internalError(): ErrorMiddleware {
    return function(error: HTTPError, req: Request, res: Response, next: (err?: any) => void) {
        res.status(error.status || 500);
        res.json({errors: {
                error: {},
                message: error.message,
            }});

    };
}
