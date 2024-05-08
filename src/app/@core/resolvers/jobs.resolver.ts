import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Store } from "@ngxs/store";
import { GetAllJobs } from "../../crawler/store/state/crawler.actions";

export const jobsResolver: ResolveFn<boolean> = () => {
    inject(Store).dispatch(new GetAllJobs());
    return true;
}
