import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-counter',
  templateUrl: './icon-counter.component.html',
  styleUrls: ['./icon-counter.component.scss']
})
export class IconCounterComponent implements OnInit{
  @Input() icon!: string;
  @Input() value!: number;
  @Input() active = false;

  ngOnInit(): void {
  }
}
