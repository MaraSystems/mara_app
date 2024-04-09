import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-counter',
  templateUrl: './icon-counter.component.html',
  styleUrls: ['./icon-counter.component.scss']
})
export class IconCounterComponent {
  @Input() icon!: string;
  @Input() value!: number;
}
