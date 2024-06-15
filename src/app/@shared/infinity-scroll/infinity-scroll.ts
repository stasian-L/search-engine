import { BehaviorSubject, Observable, debounceTime, exhaustMap, filter, finalize, fromEvent, pipe, startWith, tap } from 'rxjs';

type InfinityScrollDirection = 'horizontal' | 'vertical';

export interface InfinityScrollOptions {
    /**
     * The element that is scrollable.
     */
    element: HTMLElement;
    /**
     * A BehaviorSubject that emits true when loading and false when not loading.
     */
    loading: BehaviorSubject<boolean>;
    /**
     * Indicates how far from the end of the scrollable element the user must be before the loadFn is called.
     */
    threshold: number;
    /**
     * The initial page index to start loading from.
     */
    initialPageIndex: number;
    /**
     * The direction of the scrollable element.
     */
    scrollDirection?: InfinityScrollDirection;
    /**
     * The function that is called when the user scrolls to the end of the scrollable element with respect to the threshold.
     */
    loadFn: (result: InfinityScrollResult) => Observable<any>;
}

export interface InfinityScrollResult {
    /**
     * The next page index.
     */
    pageIndex: number;
    /**
     * A Subject that can be used to indicate that more data should be loaded.
     *
     * Calling `complete()` on this Subject will stop loading more data.
     */
    //loadMore: Subject<void>;
}

export function infinityScroll(options: InfinityScrollOptions) {
    const ensureScrolled = pipe(
        filter(() => !options.loading.value), // ignore scroll event if already loading
        debounceTime(500), // debounce scroll event to prevent lagginess on heavy scroll pages
        // filter(() => isScrollable(options.element, options.scrollDirection)),
        filter(() => {
            const remainingDistance = calculateRemainingDistance(options.element, options.scrollDirection);
            return remainingDistance <= options.threshold;
        })
    );

    const fetchData = pipe(
        exhaustMap((_, index) => {
            options.loading.next(true);
            return options.loadFn({
                pageIndex: options.initialPageIndex + index
            });
        }),
        tap(() => options.loading.next(false)),
        // stop loading if error or explicitly completed (no more data)
        finalize(() => options.loading.next(false))
    );
    return fromEvent(options.element, 'scroll').pipe(startWith(null), ensureScrolled, fetchData);
}

function calculateRemainingDistanceToBottom(element: HTMLElement) {
    const scrollPosition = element.scrollTop;
    const clientHeight = element.clientHeight;
    const totalHeight = element.scrollHeight;
    return totalHeight - (scrollPosition + clientHeight);
}

function calculateRemainingDistanceOnXAxis(element: HTMLElement): number {
    const scrollPosition = Math.abs(element.scrollLeft);
    const clientWidth = element.clientWidth;
    const totalWidth = element.scrollWidth;
    return totalWidth - (scrollPosition + clientWidth);
}

function calculateRemainingDistance(element: HTMLElement, direction: InfinityScrollDirection = 'vertical') {
    if (direction === 'horizontal') {
        return calculateRemainingDistanceOnXAxis(element);
    } else {
        return calculateRemainingDistanceToBottom(element);
    }
}
