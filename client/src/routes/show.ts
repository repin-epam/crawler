import express, {Request, Response} from "express";
import {ShowService} from "../types";
import decorator from "../utils/asyncRouteDecorator";

export default function(service: ShowService, logger: any): express.Router {
    const router: express.Router  = express.Router();

    router.get("/", decorator(async function(req: Request, res: Response) {
        let page = req.query.page;
        page = !!page ? (parseInt(page) ? parseInt(page) : 0) : 0;
        logger.debug("Request for page %s", page);
        const shows = await service.getPagedShows(page);
        res.send(shows);
    }));
    return router;
}
