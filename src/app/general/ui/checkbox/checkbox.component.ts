import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent extends InputComponent {
}
