import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { upload } from '../../utils/lib/upload';
import { FileType } from 'src/app/attachment/utils/models/file-type';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent extends InputComponent implements OnInit {
  @Input() multiple = false;
  @Input() fileTypes: FileType[] = Object.keys(FileType) as FileType[];

  src = '';
  accept: string[] = [];

  override ngOnInit(): void {
    this.accept = this.fileTypes.map(type => (FileType as any)[type]);
  }

  async upload(event: any) {
    this.control.markAllAsTouched();
    this.control.markAsDirty();

    const files = Array.from(event.target.files);
    const dataList = await Promise.all(files.map(async (file: any) => upload(file)));
    this.src = dataList[0];
    this.control.setValue(this.multiple ? dataList : this.src);
  }
}
