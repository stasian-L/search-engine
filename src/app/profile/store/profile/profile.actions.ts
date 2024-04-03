export class GetProfile {
    static readonly type = '[Profile] Get user profile';
    constructor(public payload: string) {}
}
