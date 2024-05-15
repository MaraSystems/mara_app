import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})
export class SwitcherComponent implements OnInit {
  @Input() totalItems = 0;
  @Input() active = 0;
  @Output() select = new EventEmitter<number>();
  
  initial = 0;
  items: number[] = [];

  ngOnInit(): void {
    this.items = Array(this.totalItems).fill(0);
  }

  switch(i: number) {    
    if (i < 0 || i > this.totalItems - 1) {
      throw new Error('Not in range');
    }
    this.active = i;    
    this.select.emit(i);
  }
}
