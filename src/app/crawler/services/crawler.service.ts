import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SkipLoading } from '../../@core/intercepters/loading.interceptor';
import { Job, JobAPIResponse } from '../interfaces/job.interface';

export type CreateJobRequest = Pick<Job, 'crawlDepth' | 'crawlType' | 'seedUrls'>;

@Injectable({
    providedIn: 'root'
})
export class CrawlerService {
    private readonly http = inject(HttpClient);

    createJob(job: CreateJobRequest): Observable<any> {
        return this.http.post<any>('crawl-jobs', job, {
            context: new HttpContext().set(SkipLoading, true)
        });
    }

    getAllJobs(): Observable<JobAPIResponse[]> {
        return this.http.get<JobAPIResponse[]>('crawl-jobs', {
            context: new HttpContext().set(SkipLoading, true)
        });
    }

    getJob(jobId: number): Observable<JobAPIResponse> {
        return this.http.get<JobAPIResponse>(`crawl-jobs/${jobId}`, {
            context: new HttpContext().set(SkipLoading, true)
        });
    }

    cancelJob(jobId: number): Observable<any> {
        return this.http.get<any>(`crawl-jobs/${jobId}/cancel`, {
            context: new HttpContext().set(SkipLoading, true)
        });
    }
}
