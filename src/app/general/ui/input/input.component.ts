import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnChanges {
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() label = true;
  @Input() measure: string = '';
  @Input() type: 'text' | 'email' | 'date' | 'phone' | 'number' | 'checkbox' = 'text';
  @Input() control!: FormControl;
  @Input() required!: boolean;

  isValid() {
    const { invalid, touched } = this.control;    
    return invalid && touched;
  }

  ngOnChanges(changes: SimpleChanges): void {    
  }
}
