import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SerpService {
    http = inject(HttpClient);

    search(query: string): Observable<any> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer l9mR4XRVUKOOBEKQzwZM2wOjQkZVe1mVIGVdtSof16o43p8i01W49D5bKs2X'
            })
        };
        return this.http
            .post(
                'https://api.serphouse.com/serp/live',
                {
                    data: {
                        q: query,
                        domain: 'google.com',
                        loc: 'Abernathy,Texas,United States',
                        lang: 'en',
                        device: 'desktop',
                        serp_type: 'web',
                        page: '1',
                        verbatim: '0'
                    }
                },
                options
            )
            .pipe(tap(console.warn), map(x => x.results.results.organic));
    }
}
