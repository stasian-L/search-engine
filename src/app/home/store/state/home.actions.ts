export class HomeAction {
    static readonly type = '[Home] Add item';
    constructor(public payload: string) {}
}

export class AddShortcut {
    static readonly type = '[Home] Add shortcut item';
    constructor(public payload: string) {}
}
