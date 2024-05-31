import { Component } from '@angular/core';
import { UploadWidgetOnUpdateEvent, UploadWidgetResult } from '@bytescale/upload-widget';
import { UploadWidgetModule } from '@bytescale/upload-widget-angular';

@Component({
    selector: 'app-image-upload',
    standalone: true,
    imports: [UploadWidgetModule],
    templateUrl: './image-upload.component.html',
    styleUrl: './image-upload.component.scss'
})
export class ImageUploadComponent {
    options = {
        apiKey: 'free', // Get API keys from: www.bytescale.com
        multi: false,
        showFinishButton: true
    };
    onUpdate = (event: UploadWidgetOnUpdateEvent) => {
        console.log(JSON.stringify(event));
    };
    onComplete = (files: UploadWidgetResult[]) => {
        alert(files.map(x => x.fileUrl).join('\n'));
    };
    width = '550px';
    height = '130px';
}
