import {ApiShowResult} from "../../src/types";
import {MongoAdapter} from "../../src/types/api";

export class MongoAdapterMock implements MongoAdapter {
    public storage: ApiShowResult[];
    constructor() {
        this.storage = [];
    }
    public async storeShow(show: ApiShowResult) {
        this.storage.push(show);
    }

}
