import {Actor, MongoAdapter, Role, Show, ShowService, StoredShow} from "../types";

export class ShowServiceImpl implements ShowService {
    private storage: MongoAdapter;
    private logger: any;
    constructor(storage: MongoAdapter, logger: any) {
        this.storage = storage;
        this.logger = logger;
    }

    public async getPagedShows(page: number): Promise<Show[]> {
        const rawShows = await this.storage.findShowsPage(page);
        return this.transformShows(rawShows);
    }

    public transformShows(shows: StoredShow[]): Show[] {
        return shows.map((show: StoredShow): Show => {
            return {
                id: show.id,
                name: show.name,
                cast : this.extractCast(show)
            };

        });
    }

    public extractCast(show: StoredShow): Actor[] {
        return show._embedded.cast.map((role: Role): Actor => {
            return {
                id: role.person.id,
                name: role.person.name,
                birthday: role.person.birthday
            };
        }).sort((a: Actor, b: Actor): number => {
            return new Date(a.birthday).getTime() - new Date(b.birthday).getTime();
        });
    }
}
