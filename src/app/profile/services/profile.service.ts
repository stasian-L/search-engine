import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileComponent } from '../components/profile/profile.component';
import { ProfileAPIResponse } from '../interfaces/profile.interface';

@Injectable({
    providedIn: ProfileComponent
})
export class ProfileService {
    readonly httpClient = inject(HttpClient);

    getProfile(username: string): Observable<ProfileAPIResponse> {
        return this.httpClient.get<ProfileAPIResponse>(`profiles/${username}`);
    }
}
