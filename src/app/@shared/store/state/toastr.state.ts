import { Injectable, inject } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { SetError, SetSuccess } from './toastr.actions';

export class ToastrStateModel {}

@State<any>({
    name: 'toast',
    defaults: []
})
@Injectable()
export class ToastrState {
    private toastService = inject(ToastrService);

    @Action(SetSuccess)
    onSetSuccess(_: StateContext<ToastrStateModel>, { payload }: SetSuccess): void {
        this.toastService.success(payload);
    }

    @Action(SetError)
    onSetError(_: StateContext<ToastrStateModel>, { payload }: SetError): void {
        this.toastService.error(payload);
    }
}
