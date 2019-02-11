import {Request, Response} from "express";
import {Middleware} from "../types";

export default function requestLogger(logger: any): Middleware {
    return function(req: Request, res: Response, next: (err?: any) => void) {
        logger.info(req.url);
        next();
    };
}
