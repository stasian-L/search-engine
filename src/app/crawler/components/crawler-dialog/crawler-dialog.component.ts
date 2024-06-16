import { NgStyle } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { URL_REGEXP } from '../../../@core/constants/regex.const';

@Component({
    selector: 'app-crawler-dialog',
    standalone: true,
    imports: [
        NgStyle,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatIconModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatDividerModule,
        MatTabsModule
    ],
    templateUrl: './crawler-dialog.component.html',
    styleUrl: './crawler-dialog.component.scss'
})
export class CrawlerDialogComponent implements AfterViewInit {
    readonly dialogRef = inject(MatDialogRef);

    private readonly fb = inject(FormBuilder);

    urlForm = this.fb.nonNullable.group({
        useDepth: this.fb.control(false),
        crawlDepth: this.fb.control({ value: 1, disabled: true }),
        seedUrl: this.fb.control('', [Validators.required, Validators.pattern(URL_REGEXP)])
    });

    domainForm = this.fb.nonNullable.group({
        seedUrls: this.fb.nonNullable.array(
            [this.fb.nonNullable.control('', [Validators.required, Validators.pattern(URL_REGEXP)])],
            validateDomainArray
        )
    });

    get urlControls() {
        return this.domainForm.controls.seedUrls.controls;
    }

    ngAfterViewInit(): void {
        this.urlForm.controls.useDepth.setValue(false);
    }

    addUrl(): void {
        const control = this.fb.control('', [Validators.required, Validators.pattern(URL_REGEXP)]);
        (this.domainForm.get('seedUrls') as FormArray).push(control);
    }

    removeUrl(index: number) {
        if (this.domainForm.controls.seedUrls.length > 1) {
            this.domainForm.controls.seedUrls.removeAt(index);
        }
    }

    toggleFormControl(controlName: string, value: boolean): void {
        if (value) {
            this.urlForm.get(controlName)?.enable();
        } else {
            this.urlForm.get(controlName)?.disable();
        }
    }

    onUrlSubmit(): void {
        console.log(this.urlForm.value);
        if (this.urlForm.invalid) {
            return;
        }

        let depth = 1;
        if (this.urlForm.controls.useDepth) {
            depth = this.urlForm.controls.crawlDepth.value ?? 1;
        }
        console.log({ urls: this.urlForm.controls.seedUrl.value, crawlDepth: depth });

        this.dialogRef.close({ seedUrls: [this.urlForm.controls.seedUrl.value], crawlDepth: depth });
    }

    onDomainSubmit(): void {
        console.log(this.domainForm.value);
        if (this.domainForm.invalid) {
            return;
        }
        console.log({ urls: this.domainForm.controls.seedUrls.value });
        this.dialogRef.close({ seedUrls: this.domainForm.controls.seedUrls.value });
    }

    // private getSameDomainUrls(urls: string[]): boolean {
    //     if (urls.length <= 1) return false;

    //     const firstUrl = new URL(urls[0]);
    //     return urls.every(url => new URL(url).hostname === firstUrl.hostname);
    // }
}

