import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { SerpService } from '../../services/serp.service';
import { Search } from './serp.actions';

export class SerpStateModel {
    query: string = '';
    results: any[] = [];
}

const defaults = {
    query: '',
    results: []
};

@State<SerpStateModel>({
    name: 'serp',
    defaults
})
@Injectable()
export class SerpState {
    serpService = inject(SerpService);

    store = inject(Store);

    @Selector()
    static results(model: SerpStateModel): any[] {
        return model.results;
    }

    @Selector()
    static query(model: SerpStateModel): string {
        return model.query;
    }

    @Action(Search)
    onSearch({ patchState }: StateContext<SerpStateModel>, { payload }: Search) {
        patchState({ query: payload });
        return this.serpService.search(payload).pipe(
            tap(x => {
                patchState({ results: x });
            })
        );
    }
}
