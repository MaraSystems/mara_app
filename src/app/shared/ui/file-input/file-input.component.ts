import { Component, Input, OnInit } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { upload } from '../../utils/lib/upload';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent extends InputComponent {
  @Input() multiple = false;
  @Input() accept = '';

  src = '';

  async changed(event: any) {
    this.control.markAllAsTouched();
    this.control.markAsDirty();

    const files = Array.from(event.target.files);
    const dataList = await Promise.all(files.map(async (file: any) => upload(file)));    
    this.src = dataList[0];
    this.control.setValue(dataList);    
  }
}
