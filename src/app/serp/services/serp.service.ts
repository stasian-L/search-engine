import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SerpService {
    http = inject(HttpClient);

    private baseUrl = 'https://api.realworld.io/api/';

    search(query: string): Observable<any> {
        return this.http.get(`${this.baseUrl}search/documents?query=${query}`);
    }
}
