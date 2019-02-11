import "mocha";
import {ShowServiceImpl} from "../../src/service/ShowServiceImpl";
import {MongoAdapterMock} from "../helpers/MongoAdapterMock";
import {resultData, testData} from "../helpers/testData";

import request from "supertest";
import createApplication from "../../src/app";
import loggerMock from "../helpers/LoggerMock";

describe("GET /show", function() {
    it("responds with json", function(done) {
        const service =  new ShowServiceImpl(new MongoAdapterMock(testData), loggerMock);
        const app = createApplication(service, loggerMock, true);
        request(app)
            .get("/show")
            .expect("Content-Type", /json/)
            .expect(200, resultData, done);
    });

    it("responds with internal error", function(done) {
        const service =  new ShowServiceImpl(new MongoAdapterMock(testData, true), loggerMock);
        const app = createApplication(service, loggerMock, true);
        request(app)
            .get("/show")
            .expect(500, done);
    });
});

describe("GET /_show", function() {
    it("responds with not found error", function(done) {
        const service =  new ShowServiceImpl(new MongoAdapterMock(testData), loggerMock);
        const app = createApplication(service, loggerMock, true);
        request(app)
            .get("/_show")
            .expect(404, done);
    });
});
