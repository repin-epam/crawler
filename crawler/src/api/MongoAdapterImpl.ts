import {Collection, MongoClient} from "mongodb";
import {ApiShowResult, DbConfig} from "../types";
import {MongoAdapter} from "../types/api";

export class MongoAdapterImpl implements MongoAdapter {
    private collection: Collection;
    private logger: any;

    constructor(client: MongoClient, config: DbConfig, logger: any) {
        this.logger = logger;
        this.collection = client.db().collection(config.collection);
    }

    public async storeShow(show: ApiShowResult): Promise<void> {
        const {id} = show;
        const result = await this.collection.findOneAndReplace({id}, show);
        this.logger.debug("Record replaced %s", !!result.value);
        if (!result.value) {
            await this.collection.insertOne(show);
        }
    }

    public async getLastLoadedId(): Promise<number> {
        const results: ApiShowResult[]  = await this.collection.find().sort({id: -1}).limit(1).toArray();
        if (results.length > 0) {
            return results[0].id;
        } else {
            return 0;
        }
    }
}
