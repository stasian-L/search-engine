export type JobAPIResponse = Exclude<Job, 'crawlStatus'>;

export type CrawlType = 'URL_WITH_DEPTH';

const CrawlStatus = {
    Crawling: 'crawling',
    Completed: 'completed',
    Error: 'error'
} as const;

export type CrawlStatusKeys = (typeof CrawlStatus)[keyof typeof CrawlStatus];

export interface Job {
    jobId: number;
    crawlDepth: number;
    processedUrls: number;
    totalUrls: number;
    crawlType: CrawlType;
    seedUrls: string[];
    crawlStatus: CrawlStatusKeys;
}
