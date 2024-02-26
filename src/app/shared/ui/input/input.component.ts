import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() unit: string = '';
  @Input() type: string = '';
  @Input() disabled = false;
  @Input() invalid = false;

  onChange: any = (value: any) => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {  
    this.value = obj;    
  }

  registerOnChange(fn: any): void {        
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
