import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() label = true;
  @Input() measure: string = '';
  @Input() type: 'text' | 'email' | 'date' | 'phone' | 'number' = 'text';
  @Input() control!: FormControl;
  @Input() required!: boolean;

  isValid() {
    const { invalid, touched } = this.control;    
    return invalid && touched;
  }
}
