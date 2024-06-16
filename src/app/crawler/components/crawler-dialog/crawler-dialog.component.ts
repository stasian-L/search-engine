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
        MatDividerModule
    ],
    templateUrl: './crawler-dialog.component.html',
    styleUrl: './crawler-dialog.component.scss'
})
export class CrawlerDialogComponent implements AfterViewInit {
    readonly dialogRef = inject(MatDialogRef);

    private readonly fb = inject(FormBuilder);

    urlsForm = this.fb.nonNullable.group({
        useDepth: this.fb.control(false),
        useSameDomain: this.fb.control(false),
        crawlDepth: this.fb.control({ value: 1, disabled: true }),
        seedUrls: this.fb.nonNullable.array([this.fb.nonNullable.control('', [Validators.required, Validators.pattern(URL_REGEXP)])], this.ValidateDomainArray)
    });

    get urlControls() {
        return (this.urlsForm.get('seedUrls') as FormArray).controls;
    }

    ngAfterViewInit(): void {
        this.urlsForm.controls.useDepth.setValue(false);
    }

    addUrl(): void {
        const control = this.fb.control('', [Validators.required, Validators.pattern(URL_REGEXP)]);
        (this.urlsForm.get('seedUrls') as FormArray).push(control);
    }

    removeUrl(index: number) {
        if (this.urlsForm.controls.seedUrls.length > 1) {
            (this.urlsForm.get('seedUrls') as FormArray).removeAt(index);
        }
    }

    onSameUrlValueChanged() {
        if (this.urlsForm.controls.useSameDomain) {
            //this.urlsForm.controls.seedUrls.addValidators(Validators)
        }
    }

    toggleFormControl(controlName: string, value: boolean): void {
        if (value) {
            this.urlsForm.get(controlName)?.enable();
        } else {
            this.urlsForm.get(controlName)?.disable();
        }
    }

    onSubmit(): void {
        console.log(this.urlsForm.value);
        if (this.urlsForm.invalid) {
            return;
        }

        if (this.urlsForm.controls.useDepth) {
        }

        if (this.urlsForm.controls.useSameDomain) {
        }
        console.log({ urls: this.urlsForm.controls.seedUrls.value, crawlDepth: this.urlsForm.controls.crawlDepth.value });

        this.dialogRef.close({ seedUrls: this.urlsForm.controls.seedUrls.value, crawlDepth: 2 });
    }

    ValidateDomainArray() {
        return (c: AbstractControl): { [key: string]: any } | null => {
            if (this.getSameDomainUrls(c.value)) return null;

            return { sameDomain: { valid: false } };
        };
    }

    // private getSameDomainUrls(urls: string[]): boolean {
    //     return urls
    //         .filter(url => url.includes('://'))
    //         .every(url => new URL(url).hostname === new URL(this.getSeedUrls()[0].value).hostname);
    // }


    private getSameDomainUrls(urls: string[]): boolean {
        if (urls.length === 0) return false;

        const firstUrl = new URL(urls[0]);
        return urls.every(url => new URL(url).hostname === firstUrl.hostname);
    }

}
