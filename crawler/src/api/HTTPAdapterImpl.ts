import {ApiShowResult, HTTPClient, HTTPConfig} from "../types";
import {HTTPAdapter} from "../types/api";
import delay from "../utils/delay";

export class HTTPAdapterImpl implements HTTPAdapter {
    private client: HTTPClient;
    private config: HTTPConfig;
    private logger: any;

    constructor(client: HTTPClient, config: HTTPConfig, logger: any) {
        this.logger = logger;
        this.client = client;
        this.config = config;
    }

    public async retrieveShow(id: number): Promise<ApiShowResult> {
        this.logger.debug("starting request %s", this.getUrl(id));
        const url = this.getUrl(id);
        const response = await this.loadWithRetries(url);
        if (response.error) {
            throw response.error;
        }
        return await response;
    }

    private getUrl(id: number): string {
        return `${this.config.host}${this.config.endpoint}${id}?${this.config.options}`;
    }

    private async loadWithRetries(url: string, attempt: number = 0) {
        return await this.client.get(url)
            .then((res) => res.data)
            .catch(async (error) => {
                if (error.response) {
                    if (error.response.status !== this.config.skipRetryError && attempt <= this.config.attempts) {
                        await delay(this.config.errorTimeout);
                        this.logger.warn("Retrying download %s %s %s ", error.response.status, url, attempt);
                        return this.loadWithRetries(url, attempt + 1 );
                    } else {
                        return {
                            error: {
                                status: error.response.status,
                            }
                        };
                    }
                } else {
                    return {error};
                }
            });

    }
}
