import { CreateJobRequest } from '../../services/crawler.service';

export class CreateJob {
    static readonly type = '[Crawler] Create job';
    constructor(public payload: CreateJobRequest) {}
}

export class GetAllJobs {
    static readonly type = '[Crawler] Get all jobs';
}

export class GetJob {
    static readonly type = '[Crawler] Get job';
    constructor(public payload: number) {}
}

export class CancelJob {
    static readonly type = '[Crawler] Cancel job';
    constructor(public payload: number) {}
}
