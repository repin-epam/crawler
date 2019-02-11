import * as config from "config";
import express from "express";
import {MongoClient} from "mongodb";
import {MongoAdapterImpl} from "./api/MongoAdapterImpl";
import createApplication from "./app";
import {initLogger} from "./logger";
import {ShowServiceImpl} from "./service/ShowServiceImpl";

async function start() {
    const logger = initLogger(config.logger);
    const client = await MongoClient.connect(config.db.url , { useNewUrlParser: true });
    const adapter = new MongoAdapterImpl(client, config.db, logger);
    const service = new ShowServiceImpl(adapter, logger);
    const isProd = process.env.NODE_ENV === "production";

    logger.info("Client connected");
    const app: express.Application = createApplication(service, logger, isProd);

    app.listen(config.http.port, config.http.host , () => {
        logger.info("Listening to  %s:%s", config.http.host, config.http.port);
    });

}

start();
