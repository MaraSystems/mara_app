import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit{
  @Input() list: string[] = [];
  @Output() select = new EventEmitter<string>();
  @Input() active = 0;

  ngOnInit(): void {
    if (this.active === -1) {
      this.active = 0;
    }    
  }

  tab(i: number) {
    if (i < 0 || i > this.list.length - 1) {
      throw new Error('Not in range');
    }
    this.select.emit(this.list[i]);
    this.active = i;
  }
}
