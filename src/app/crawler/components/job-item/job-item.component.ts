import { NgClass, TitleCasePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild, computed, effect, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CircleProgressComponent, NgCircleProgressModule } from 'ng-circle-progress';
import { JoinPipe } from '../../../@shared/pipes/join.pipe';
import { Job } from '../../interfaces/job.interface';

@Component({
    selector: 'app-job-item',
    standalone: true,
    templateUrl: './job-item.component.html',
    styleUrl: './job-item.component.scss',
    imports: [MatIconModule, MatButtonModule, JoinPipe, NgCircleProgressModule, TitleCasePipe, NgClass]
})
export class JobItemComponent implements AfterViewInit {
    @ViewChild(CircleProgressComponent) circleProgress!: CircleProgressComponent;

    cdr = inject(ChangeDetectorRef);
    job = input.required<Job | null>();

    cancelJob = output<number>();

    progr = 0;

    jobUrl = computed<string>(() => {
        if (this.job()?.crawlType === 'URL_WITH_DEPTH') {
          return this.job()?.seedUrls?.at(0) ?? '';
        }

        return new URL(this.job()?.seedUrls?.at(0) ?? '').hostname;
    });

    progress = computed<number>(() => {
        if (!this.job()?.totalUrls || !this.job()?.processedUrls) {
            return 0;
        }
        this.progr = ((this.job()?.processedUrls ?? 0) / (this.job()?.totalUrls ?? 1)) * 100;
        return ((this.job()?.processedUrls ?? 0) / (this.job()?.totalUrls ?? 1)) * 100;
    });

    constructor() {
        effect(() => {
            // this.progress = computed<number>(() => {
            //     if (!this.job()?.totalUrls || !this.job()?.processedUrls) {
            //         return 0;
            //     }
            //     return ((this.job()?.processedUrls ?? 0) / (this.job()?.totalUrls ?? 1)) * 100;
            // });
            //this.circleProgress.draw(this.progr);
        });
    }

    ngAfterViewInit(): void {
        this.circleProgress.draw(this.progr);
        this.cdr.detectChanges();
    }

    onCancelJob(): void {
        this.cancelJob.emit(this.job()?.jobId ?? 0);
    }
}
