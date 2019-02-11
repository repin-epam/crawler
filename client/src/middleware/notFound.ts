import {Request, Response} from "express";
import createError from "http-errors";

export default function notFound(req: Request, res: Response, next: (err?: any) => void) {
    next(createError(404));
}
