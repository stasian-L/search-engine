export interface SearchInterface {
    url: string;
    status: string;
    rawHtml: string;
    text: string;
    title: string;
    keywords: any[];
    description: string;
    language: string;
    lastCrawledTimestamp: number;
    outgoingLinks: string[];
}
