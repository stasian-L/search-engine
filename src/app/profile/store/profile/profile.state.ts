import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { Profile } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';
import { GetProfile } from './profile.actions';

export class ProfileStateModel {
    public profile: Profile | null = null;
}

const defaults = {
    profile: null
};

@State<ProfileStateModel>({
    name: 'profile',
    defaults
})
@Injectable()
export class ProfileState {
    readonly profileService = inject(ProfileService);

    @Selector()
    static profile(state: ProfileStateModel): Profile | null {
        return state.profile;
    }

    @Action(GetProfile)
    onGetProfile({ patchState }: StateContext<ProfileStateModel>, { payload }: GetProfile): Observable<Profile> {
        return this.profileService.getProfile(payload).pipe(
            tap(profile => {
                patchState({ profile: profile });
            })
        );
    }
}
