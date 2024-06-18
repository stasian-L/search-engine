import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { SetSuccess } from '../../../@shared/store/state/toastr.actions';
import { Job, JobAPIResponse } from '../../interfaces/job.interface';
import { CrawlerService } from '../../services/crawler.service';
import { CancelJob, CreateJob, GetAllJobs, GetJob } from './crawler.actions';

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

    store = inject(Store);

    @Selector()
    static jobs(model: CrawlerStateModel): Job[] {
        return model.jobs;
    }

    @Action(CreateJob)
    onCreateJob({ dispatch }: StateContext<CrawlerStateModel>, { payload }: CreateJob): Observable<any> {
        return this.crawlerService
            .createJob({ ...payload })
            .pipe(tap(() => dispatch(new SetSuccess('Job created successfully!'))));
    }

    @Action(GetAllJobs)
    onGetAllJobs({ patchState }: StateContext<CrawlerStateModel>): Observable<JobAPIResponse[]> {
        return this.crawlerService.getAllJobs().pipe(
            tap(jobs => {
                //jobs.forEach(job => this.calculateStatus(job));
                patchState({ jobs });
            })
        );
    }

    @Action(GetJob)
    onGetJob({ getState, setState }: StateContext<CrawlerStateModel>, { payload }: GetJob): Observable<JobAPIResponse> {
        return this.crawlerService.getJob(payload).pipe(
            tap(() => {
                const state = getState();
                setState({ jobs: [...state.jobs] });
            })
        );
    }

    @Action(CancelJob)
    onCancelJob({ dispatch }: StateContext<CrawlerStateModel>, { payload }: CancelJob): Observable<any> {
        return this.crawlerService.cancelJob(payload).pipe(
            tap(() => {
                dispatch([new GetAllJobs(), new SetSuccess('Job canceled successfully!')])
            })
        );
    }

    // private calculateStatus(job: Job): void {
    //     if (job) {
    //         if (job.status === 'CANCELLED') {
    //             job.crawlStatus = 'cancelled';
    //             return;
    //         }

    //         const percentage = ((job.processedUrls ?? 0) / (job.totalUrls ?? 1)) * 100;
    //         if (percentage === 100) {
    //             job.crawlStatus = 'completed';
    //         } else if (percentage < 100) {
    //             job.crawlStatus = 'crawling';
    //         } else {
    //             job.crawlStatus = 'error';
    //         }
    //     }
    // }
}
