import { Injectable, inject } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { Job, JobAPIResponse } from '../../../authorization/interfaces/job.interface';
import { CrawlerService } from '../../services/crawler.service';
import { CreateJob, GetAllJobs, GetJob } from './crawler.actions';

export class CrawlerStateModel {
    public jobs: Job[] = [];
}

const defaults: CrawlerStateModel = {
    jobs: []
};

@State<CrawlerStateModel>({
    name: 'crawler',
    defaults
})
@Injectable()
export class CrawlerState {
    crawlerService = inject(CrawlerService);

    @Action(CreateJob)
    onCreateJob({}: StateContext<CrawlerStateModel>, { payload }: CreateJob): Observable<void> {
        return this.crawlerService.createJob(payload).pipe();
    }

    @Action(GetAllJobs)
    onGetAllJobs({ patchState }: StateContext<CrawlerStateModel>): Observable<JobAPIResponse[]> {
        return this.crawlerService.getAllJobs().pipe(
            tap(jobs => {
                patchState({ jobs });
            })
        );
    }

    @Action(GetJob)
    onGetJob({ getState, setState }: StateContext<CrawlerStateModel>, { payload }: GetJob): Observable<JobAPIResponse[]> {
        return this.crawlerService.getJob(payload).pipe(
            tap(() => {
                const state = getState();
                setState({ jobs: [...state.jobs] });
            })
        );
    }
}
