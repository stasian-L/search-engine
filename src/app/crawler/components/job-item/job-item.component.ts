import { NgClass, TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, ViewChild, computed, effect, input } from '@angular/core';
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

    job = input.required<Job | null>();

    cancelJob = output<number>()

    progress = computed<number>(() => {
        if (!this.job()?.totalUrls || !this.job()?.processedUrls) {
            return 0;
        }
        return ((this.job()?.processedUrls ?? 0) / (this.job()?.totalUrls ?? 1)) * 100;
    });

    constructor() {
        effect(() => {
            this.circleProgress.draw(this.progress());
        });
      }

    ngAfterViewInit(): void {
        this.circleProgress.draw(this.progress());
    }

    onCancelJob(): void {
        this.cancelJob.emit(this.job()?.jobId ?? 0);
    }
}
