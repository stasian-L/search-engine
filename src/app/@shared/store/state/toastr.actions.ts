export class SetSuccess {
    static readonly type = '[Toastr] Add item';
    constructor(public payload: string) {}
}

export class SetError {
    static readonly type = '[Toastr] Add item';
    constructor(public payload: string) {}
}
