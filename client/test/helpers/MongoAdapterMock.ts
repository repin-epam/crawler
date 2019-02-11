import {MongoAdapter, StoredShow} from "../../src/types";

export class MongoAdapterMock implements MongoAdapter {
    public results: StoredShow[];
    public throwsError: boolean;
    constructor(results: StoredShow[], throwsError: boolean = false) {
        this.results = results;
        this.throwsError = throwsError;
    }
    public findShowsPage(page: number): Promise<StoredShow[]> {
        if (this.throwsError) {
            return Promise.reject("ERROR");
        } else {
            return Promise.resolve(this.results);
        }

    }

}
