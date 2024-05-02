import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { SkipLoading } from '../../@core/intercepters/loading.interceptor';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    readonly httpClient = inject(HttpClient);

    getProfile(): Observable<Profile> {
        return this.httpClient.get<Profile>(`profile`, {
            context: new HttpContext().set(SkipLoading, true)
        });
    }

    updateProfile(_profile: any): Observable<any> {
        return EMPTY;
    }
}
