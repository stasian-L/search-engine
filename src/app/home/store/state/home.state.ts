import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { append, patch } from '@ngxs/store/operators';
import { AddShortcut, SetMobileView } from './home.actions';

export class HomeStateModel {
    shortcuts: { url: string }[] = [];
    isMobileView = false;
}

const defaults = {
    shortcuts: [{ url: 'https://www.youtube.com/' }],
    isMobileView: false
};

@State<HomeStateModel>({
    name: 'home',
    defaults
})
@Injectable()
export class HomeState {
    @Selector()
    static shortcuts(model: HomeStateModel): { url: string }[] {
        return model.shortcuts;
    }

    @Selector()
    static isMobileView(model: HomeStateModel): boolean {
        return model.isMobileView;
    }

    @Action(AddShortcut)
    onAddShortcut({ setState }: StateContext<HomeStateModel>, { payload }: AddShortcut) {
        setState(
            patch({
                shortcuts: append([{ url: payload }])
            })
        );
    }

    @Action(SetMobileView)
    onSetMobileView({ setState }: StateContext<HomeStateModel>, { payload }: SetMobileView) {
        setState(
            patch({
                isMobileView: payload
            })
        );
    }
}
