import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-keyvalue',
  templateUrl: './keyvalue.component.html',
  styleUrls: ['./keyvalue.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KeyvalueComponent),
      multi: true
    }
  ]
})
export class KeyvalueComponent extends InputComponent {
  @Input() edit = false;
  @Input() list: any[] | undefined;

  constructor (){
    super();
  }
}
