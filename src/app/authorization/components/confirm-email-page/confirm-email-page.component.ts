import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    selector: 'app-confirm-email-page',
    standalone: true,
    imports: [MatButtonModule, RouterModule],
    templateUrl: './confirm-email-page.component.html',
    styleUrls: ['./confirm-email-page.component.scss', '../../styles/auth-form.scss'],
    host: { class: 'register' }
})
export class ConfirmEmailPageComponent {
    private readonly activatedRoute = inject(ActivatedRoute);

    readonly email = this.activatedRoute.snapshot.params['email'];
}
