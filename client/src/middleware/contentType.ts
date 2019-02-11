import {Request, Response} from "express";

export default function contentType(req: Request, res: Response, next: (err?: any) => void) {
    res.contentType("application/json");
    next();
}
