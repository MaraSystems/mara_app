import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() name: string = '';
  @Input() label = true;
  @Input() measure: string = '';
  @Input() type: 'text' | 'email' | 'date' | 'phone' | 'number' = 'text';
  @Input() control!: FormControl;

  isValid() {
    const { invalid, touched } = this.control;    
    return invalid && touched;
  }
}
