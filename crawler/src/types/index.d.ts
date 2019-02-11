
export interface ApiShowResult {
    id: number;
    name: string;
    _embedded: object;
}

export interface DbConfig {
    collection: string;
}

export interface HTTPConfig {
    options: string;
    errorTimeout: number;
    attempts: number;
    skipRetryError: number;
    host: string;
    endpoint: string;
}

export interface CrawlerConfig {
    parallelRequests: number;
    notFoundThreshold: number;
    regularTimeout: number;
}

export interface HTTPClient {
    get(url: string): Promise<any>;
}
