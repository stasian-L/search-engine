import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { JoinPipe } from '../../../@shared/pipes/join.pipe';
import { Job } from '../../interfaces/job.interface';

@Component({
    selector: 'app-job-item',
    standalone: true,
    templateUrl: './job-item.component.html',
    styleUrl: './job-item.component.scss',
    imports: [MatIconModule, MatButtonModule, JoinPipe, NgCircleProgressModule]
})
export class JobItemComponent {
    job = input.required<Job | null>();

    progress = computed<number>(() => {
        if (!this.job()?.totalUrls || !this.job()?.processedUrls) {
            return 0;
        }

        return ((this.job()?.processedUrls ?? 0) / (this.job()?.totalUrls ?? 1)) * 100;
    });

    cancelJob(): void {}
}
