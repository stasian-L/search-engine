export class GetProfile {
    static readonly type = '[Profile] Get user profile';
}

export class UpdateProfile {
    static readonly type = '[Profile] Update user profile';
    constructor(public payload: any) {}
}
