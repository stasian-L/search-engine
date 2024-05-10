import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../../@shared/components/header/header.component";

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    imports: [MatToolbarModule, RouterOutlet, RouterModule, MatTabsModule, MatIconModule, MatButtonModule, HeaderComponent]
})
export class ProfileComponent {}
