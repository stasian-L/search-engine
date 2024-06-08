import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-email-confirmed',
    standalone: true,
    imports: [MatButtonModule, RouterModule],
    templateUrl: './email-confirmed.component.html',
    styleUrls: ['./email-confirmed.component.scss', '../../styles/auth-form.scss']
})
export class EmailConfirmedComponent {}
