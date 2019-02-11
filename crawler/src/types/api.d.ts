import {ApiShowResult} from "./index";

export interface HTTPAdapter {
    retrieveShow(id: number): Promise<ApiShowResult>;
}

export interface MongoAdapter {
    storeShow(show: ApiShowResult): Promise<void>;
}
