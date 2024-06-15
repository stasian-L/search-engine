import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { NgxPaginationModule } from 'ngx-pagination';
import { BehaviorSubject, finalize, map, Observable, takeWhile } from 'rxjs';
import { infinityScroll } from '../../../@shared/infinity-scroll/infinity-scroll';
import { PageChange, Search } from '../../store/state/serp.actions';
import { SerpState } from '../../store/state/serp.state';
import { ResultListComponent } from '../result-list/result-list.component';
import { SearchHeaderComponent } from '../serp-header/search-header.component';
@Component({
    selector: 'app-serp',
    standalone: true,
    imports: [AsyncPipe, ResultListComponent, SearchHeaderComponent, NgxPaginationModule, MatProgressSpinnerModule],
    templateUrl: './serp.component.html',
    styleUrl: './serp.component.scss'
})
export class SerpComponent implements OnInit, AfterViewInit {
    destroyRef = inject(DestroyRef);

    store = inject(Store);

    actions$ = inject(Actions);

    results$ = this.store.select(SerpState.results);

    loadingIndicator$ = new BehaviorSubject(false);

    infinityScroll$!: Observable<any>;

    @ViewChild('elements', { static: true }) listEl!: ElementRef;

    end = false;

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.infinityScroll$ = infinityScroll({
            initialPageIndex: 1,
            threshold: 50,
            element: this.listEl.nativeElement,
            loading: this.loadingIndicator$,
            loadFn: result => {
                return this.store.dispatch(new PageChange(result.pageIndex)).pipe(map(x => x.serp));
            }
        });
        this.initSubscriptions();
        this.actions$.pipe(ofActionDispatched(Search), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            this.initSubscriptions();
            window.scrollTo(0, 0);
        });
    }

    private initSubscriptions() {
        this.store
            .select(SerpState.end)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(x => (this.end = x));
        this.infinityScroll$
            .pipe(
                takeWhile(() => !this.end),
                takeUntilDestroyed(this.destroyRef),
                finalize(() => console.log('finalize'))
            )
            .subscribe(x => console.log('scroll', x));
        this.loadingIndicator$
            .pipe(
                takeWhile(() => !this.end),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(x => console.log('loading', x));
    }
}
