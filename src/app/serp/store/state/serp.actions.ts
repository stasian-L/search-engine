export class Search {
    static readonly type = '[Serp] Search query';
    constructor(public payload: string) {}
}

export class PageChange {
    static readonly type = '[Serp] Page changed';
    constructor(public page: number) {}
}
