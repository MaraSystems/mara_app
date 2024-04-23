import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-warn',
  templateUrl: './warn.component.html',
  styleUrls: ['./warn.component.scss']
})
export class WarnComponent {
  @Input() title = '';
  @Input() description = '';

  @Output() proceed = new EventEmitter();
}
