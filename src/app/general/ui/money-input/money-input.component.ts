import { Component, Input } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { FormControl } from '@angular/forms';
import { emailPattern } from '../../utils/lib/patterns';

@Component({
  selector: 'app-money-input',
  templateUrl: './money-input.component.html',
  styleUrls: ['./money-input.component.scss'],
})
export class MoneyInputComponent extends InputComponent {
  @Input() override control!: FormControl;
  edit = false;
}
