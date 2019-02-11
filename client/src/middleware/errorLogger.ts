import {Request, Response} from "express";
import {ErrorMiddleware, HTTPError} from "../types";

export default function errorLogger(logger: any): ErrorMiddleware {
    return function(error: HTTPError, req: Request, res: Response, next: (err?: any) => void) {
        logger.error("Error occured: ", error);
        next(error);
    };
}
