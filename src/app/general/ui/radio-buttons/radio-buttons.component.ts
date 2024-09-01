import { Component, Input, SimpleChanges } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { KeyValue } from '@angular/common';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss'],
})
export class RadioButtonsComponent extends SelectComponent {
}
