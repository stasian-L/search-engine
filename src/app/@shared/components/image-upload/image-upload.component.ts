import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UploadWidgetOnUpdateEvent, UploadWidgetResult } from '@bytescale/upload-widget';
import { UploadWidgetModule } from '@bytescale/upload-widget-angular';

@Component({
    selector: 'app-image-upload',
    standalone: true,
    imports: [UploadWidgetModule],
    templateUrl: './image-upload.component.html',
    styleUrl: './image-upload.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: ImageUploadComponent
        }
    ]
})
export class ImageUploadComponent implements ControlValueAccessor {
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
        }
    };

    onUpdate = (event: UploadWidgetOnUpdateEvent) => {
        this.markAsTouched();
        if (!this.disabled) {
            this.path = event?.uploadedFiles[0]?.fileUrl;
            this.onChange(this.path);
        }
        console.log(JSON.stringify(event?.uploadedFiles));
    };

    onComplete = (files: UploadWidgetResult[]) => {
        alert(files.map(x => x.fileUrl).join('\n'));
    };
    width = '550px';
    height = '130px';

    onChange = (_path: string) => {};

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
