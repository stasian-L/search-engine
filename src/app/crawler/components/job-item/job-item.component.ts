import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Job } from '../../interfaces/job.interface';
import { JoinPipe } from "../../../@shared/pipes/join.pipe";

@Component({
    selector: 'app-job-item',
    standalone: true,
    templateUrl: './job-item.component.html',
    styleUrl: './job-item.component.scss',
    imports: [MatIconModule, MatButtonModule, JoinPipe]
})
export class JobItemComponent {
    @Input({ required: true }) job: Job | null = null;

    cancelJob(): void {}
}
