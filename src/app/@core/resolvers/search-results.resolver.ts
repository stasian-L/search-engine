import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { Search } from '../../serp/store/state/serp.actions';

export const searchResultsResolver: ResolveFn<boolean> = route => {
    console.warn(route.queryParams['searchTerm']);

    inject(Store).dispatch(new Search(route.queryParams['searchTerm']));
    return true;
};
