import { Injectable, inject } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { Profile } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';
import { GetProfile, UpdateProfile } from './profile.actions';

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

    readonly store = inject(Store);

    @Selector()
    static profile(state: ProfileStateModel): Profile | null {
        return state.profile;
    }

    @Selector()
    static profileImage(state: ProfileStateModel): string | undefined {
        return state.profile?.image;
    }

    @Action(GetProfile)
    onGetProfile({ patchState }: StateContext<ProfileStateModel>): Observable<Profile> {
        return this.profileService.getProfile().pipe(
            tap(profile => {
                patchState({ profile: profile });
            })
        );
    }

    @Action(UpdateProfile)
    onUpdateProfile({ patchState }: StateContext<ProfileStateModel>, { payload }: UpdateProfile): void {
        patchState({ profile: payload });
        this.store.dispatch(new Navigate(['profile']));
        // return this.profileService.updateProfile(payload).pipe(
        //     switchMap(() => this.store.dispatch(new Navigate(['profile'])))
        // );
    }
}
