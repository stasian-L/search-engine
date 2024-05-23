import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { ModelFormGroup } from '../../../@shared/utils/utility-types';
import { User } from '../../interfaces/user.interface';
import { Register } from '../../store/state/auth.actions';

type UserRegisterFormGroup = ModelFormGroup<Pick<User, 'firstName' | 'lastName' | 'email'> & { password: string }>;

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatInputModule, MatIconModule, ReactiveFormsModule, RouterModule],
    templateUrl: './register.component.html',
    styleUrl: '../../styles/auth-form.scss',
    host: { class: 'register' }
})
export class RegisterComponent {
    private readonly fb = inject(FormBuilder);

    private readonly store = inject(Store);

    form: UserRegisterFormGroup = this.fb.nonNullable.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
    });

    confirmPassword = new FormControl('', this.matchValidator());

    passwordHide = true;

    onSubmit(): void {
        if (this.form.invalid) {
            return;
        }

        this.store.dispatch(new Register({ ...this.form.getRawValue(), role: 'USER' }));
    }

    private matchValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!this.form.controls.password.value || !control.value) {
                return null;
            }

            return control.value === this.form.controls.password.value ? null : { matching: true };
        };
    }
}
