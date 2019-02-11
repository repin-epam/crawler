import { expect } from "chai";
import "mocha";
import {ShowServiceImpl} from "../../src/service/ShowServiceImpl";
import {MongoAdapterMock} from "../helpers/MongoAdapterMock";
import {resultData, testData} from "../helpers/testData";

import loggerMock from "../helpers/LoggerMock";

describe("ShowServiceImpl", () => {
    it("should return shows in correct format", async () => {
        const service =  new ShowServiceImpl(new MongoAdapterMock(testData), loggerMock);
        const result = await service.getPagedShows(0);
        expect(result).to.deep.equal(resultData);
    });
});
