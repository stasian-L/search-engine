import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { SerpAction } from './serp.actions';

export class SerpStateModel {
    public items: string[];
}

const defaults = {
    items: []
};

@State<SerpStateModel>({
    name: 'serp',
    defaults
})
@Injectable()
export class SerpState {
    @Action(SerpAction)
    add({ getState, setState }: StateContext<SerpStateModel>, { payload }: SerpAction) {
        const state = getState();
        setState({ items: [...state.items, payload] });
    }
}
