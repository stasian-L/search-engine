import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { SerpService } from '../../services/serp.service';
import { PageChange, Search } from './serp.actions';

export class SerpStateModel {
    query: string = '';
    results: any[] = [];
    end: boolean = false;
}

const defaults = {
    query: '',
    results: [],
    end: false
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

    @Selector()
    static end(model: SerpStateModel): boolean {
        return model.end;
    }

    @Action(Search)
    onSearch({ patchState }: StateContext<SerpStateModel>, { payload }: Search): Observable<any> {
        patchState({ query: payload });
        return this.serpService.search(payload).pipe(
            tap(x => {
                if (x.length === 0) {
                    patchState({ end: true });
                } else {
                    patchState({ end: false });
                }
                patchState({ results: x });
            })
        );
    }

    @Action(PageChange)
    onPageChange({ getState, patchState }: StateContext<SerpStateModel>, { page }: PageChange): Observable<any> {
        const { query, results } = getState();
        return this.serpService.search(query, page).pipe(
            tap(x => {
                if (x.length === 0) {
                    patchState({ end: true });
                }
                patchState({ results: [...results, ...x] });
            })
        );
    }
}
