import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UploadWidgetOnUpdateEvent, UploadWidgetResult } from '@bytescale/upload-widget';
import { UploadWidgetModule } from '@bytescale/upload-widget-angular';

@Component({
    selector: 'app-image-upload',
    standalone: true,
    imports: [UploadWidgetModule, MatIconModule, MatButtonModule],
    templateUrl: './image-upload.component.html',
    styleUrl: './image-upload.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: ImageUploadComponent
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageUploadComponent implements ControlValueAccessor {
    cdr = inject(ChangeDetectorRef);

    @Input() readonly = false;

    path = '';

    options = {
        apiKey: 'free', // Get API keys from: www.bytescale.com
        multi: false,
        showFinishButton: false,
        showRemoveButton: true,
        editor: {
            images: {
                allowResizeOnMove: false, // True by default. If false, prevents cropper from resizing when moved.
                preview: false, // True by default if cropping is enabled. Previews PDFs and videos too.
                crop: false
            }
        },
        styles: {
            colors: {
                primary: '#3f51b5'
            }
        },
        locale: {
            uploadFileBtn: 'Upload an Image'
        }
    };

    readonly defaultPhoto = 'assets/images/empty-profile.png';

    onUpdate = (event: UploadWidgetOnUpdateEvent) => {
        if (!this.disabled) {
            this.path = event?.uploadedFiles[0]?.fileUrl;
            this.onChange(event?.uploadedFiles[0]?.fileUrl);
        }
        console.log(JSON.stringify(event?.uploadedFiles));
        this.markAsTouched();
        this.cdr.detectChanges();
    };

    onComplete = (files: UploadWidgetResult[]) => {
        alert(files.map(x => x.fileUrl).join('\n'));
    };
    width = '550px';
    height = '130px';

    onChange = (_path: string) => {
        this.path = _path;
    };

    onTouched = () => {};

    touched = false;

    disabled = false;

    writeValue(path: string): void {
        this.path = path;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    markAsTouched() {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }
}
