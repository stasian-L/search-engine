import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { append, patch } from '@ngxs/store/operators';
import { AddShortcut } from './home.actions';

export class HomeStateModel {
    shortcuts: { url: string }[] = [];
}

const defaults = {
    shortcuts: [{ url: 'https://www.youtube.com/' }]
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

    @Action(AddShortcut)
    onAddShortcut({ setState }: StateContext<HomeStateModel>, { payload }: AddShortcut) {
        setState(
            patch({
                shortcuts: append([{ url: payload }])
            })
        );
    }
}
