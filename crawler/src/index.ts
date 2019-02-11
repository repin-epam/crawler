import Axios from "axios";
import {MongoClient} from "mongodb";

import * as config from "config";
import {HTTPAdapterImpl} from "./api/HTTPAdapterImpl";
import {MongoAdapterImpl} from "./api/MongoAdapterImpl";
import {ShowCrawler} from "./crawler/ShowCrawler";
import {initLogger} from "./logger";

async function start() {
    const logger = initLogger(config.logger);
    const client = await MongoClient.connect(config.db.url , { useNewUrlParser: true });
    logger.info("Client connected");

    const httpAdapter = new HTTPAdapterImpl( Axios.create() , config.http, logger);
    const mongoAdapter = new MongoAdapterImpl(client, config.db, logger);

    let offset;
    if (config.app.ignoreLoaded) {
        offset = 0;
    } else {
        offset = (await mongoAdapter.getLastLoadedId()) + 1;
    }

    logger.info("Starting with last loaded %s", offset);
    const crawler = new ShowCrawler(httpAdapter, mongoAdapter, offset , config.crawler, logger);
    crawler.on("done", () => { process.exit(0); });
    crawler.crawl();
}

start();
