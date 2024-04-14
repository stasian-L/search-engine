export class Search {
    static readonly type = '[Serp] Search query';
    constructor(public payload: string) {}
}
