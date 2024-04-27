import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { ModelFormGroup } from '../../../@shared/utils/utility-types';
import { User } from '../../interfaces/user.interface';
import { Login } from '../../store/state/auth.actions';

type UserLoginFormGroup = ModelFormGroup<Pick<User, 'username'> & { password: string }>;

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatInputModule, MatIconModule, ReactiveFormsModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    fb = inject(FormBuilder);

    store = inject(Store);

    form: UserLoginFormGroup = this.fb.nonNullable.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    });

    onSubmit(): void {
        this.store.dispatch(new Login({ ...this.form.getRawValue(), grant_type: 'password' }));
    }
}
