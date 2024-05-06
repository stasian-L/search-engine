import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-confirm-email-page',
    standalone: true,
    imports: [MatButtonModule, RouterModule],
    templateUrl: './confirm-email-page.component.html',
    styleUrl: './confirm-email-page.component.scss'
})
export class ConfirmEmailPageComponent {}
