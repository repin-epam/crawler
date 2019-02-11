import Axios from "axios";
import { expect } from "chai";
import "mocha";
import nock from "nock";
import {HTTPAdapterImpl} from "../../src/api/HTTPAdapterImpl";
import {ShowCrawler} from "../../src/crawler/ShowCrawler";
import loggerMock from "../helpers/LoggerMock";
import {MongoAdapterMock} from "../helpers/MongoAdapterMock";
import {testData} from "../helpers/testData";

describe("ShowCrawler", () => {
    let mock;
    let show;
    let adapter;
    let storage;

    const httpTestConfig = {
        attempts: 1,
        endpoint: "/shows/",
        errorTimeout: 10,
        host: "http://api.tvmaze.com",
        options: "embed=cast",
        retryErrorCode: 429,
        skipRetryError: 404,
        url: "http://api.tvmaze.com/shows/",
    };

    const crawlerTestConfig = {
        notFoundThreshold: 5,
        offset: 0,
        parallelRequests: 3,
        regularTimeout: 1,
        validShowsCount: 20
    };

    beforeEach(() => {
        mock = nock(httpTestConfig.host);
        show = testData[0];
        adapter = new HTTPAdapterImpl(Axios, httpTestConfig, loggerMock);
        storage =  new MongoAdapterMock();
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it("should load all data and exit when not found", async () => {
        const crawler = new ShowCrawler(adapter, storage, crawlerTestConfig.offset, crawlerTestConfig, loggerMock);
        mock.get((uri: string) => uri.includes(httpTestConfig.endpoint))
            .times(crawlerTestConfig.validShowsCount)
            .reply(200, show);

        mock.get((uri: string) => uri.includes(httpTestConfig.endpoint))
            .times(crawlerTestConfig.notFoundThreshold)
            .reply(404);

        await new Promise((res, rej) => {
            crawler.crawl();
            crawler.on("done", res);
        });

        expect(storage.storage.length).to.equal(crawlerTestConfig.validShowsCount);
    });
});
