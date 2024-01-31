import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})
export class SwitcherComponent implements OnInit {
  @Input() totalItems = 0;
  @Input() current = 0;
  @Output() selected = new EventEmitter<Number>();
  
  initial = 0;
  items: number[] = [];

  ngOnInit(): void {
    this.items = Array(this.totalItems).fill(0);
  }

  select(i: number) {
    this.current = i;
    this.selected.emit(i);
  }
}
