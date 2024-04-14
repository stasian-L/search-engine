import { Injectable, inject } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Search } from './serp.actions';
import { SerpService } from '../../services/serp.service';

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
    serpService = inject(SerpService);

    @Action(Search)
    onSearch({}: StateContext<SerpStateModel>, { payload }: Search) {
        return this.serpService.search(payload);
    }
}
