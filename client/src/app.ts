import express from "express";
import internalError from "./middleware/internalError";
import internalErrorReport from "./middleware/internalErrorReport";
import requestLogger from "./middleware/logger";
import showRoute from "./routes/show";
import {ShowService} from "./types";

import errorLogger from "./middleware/errorLogger";
import notFound from "./middleware/notFound";

export default function createApplication(service: ShowService, logger: any, isProd: boolean): express.Application {
    const app: express.Application = express();
    app.use(requestLogger(logger));
    app.use(express.json());

    app.use("/show", showRoute(service, logger));
    app.use(errorLogger(logger));
    app.use(notFound);
    if (!isProd) {
        app.use(internalErrorReport());
    }
    app.use(internalError());

    return app;
}
