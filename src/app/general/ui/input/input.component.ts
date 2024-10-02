import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
  @Output() changed = new EventEmitter();
  @Input() note = '';
  @Input() edit = false;

  get showData() {
    const flag = !!this.control.value || this.edit;        
    return flag;
  }

  isValid() {
    const { invalid, touched } = this.control;    
    return invalid && touched;
  }

  focus(element: HTMLElement, input: HTMLElement = element) {    
    element.classList.remove('empty');
    input.focus();    
  }

  blur(element: HTMLElement, input: HTMLElement = element) {
    if (!this.control.value) {
      element.classList.add('empty');
    }
    input.blur();
  }

  ngOnChanges(changes: SimpleChanges): void {}
}
