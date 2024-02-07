import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() list: string[] = [];
  @Output() select = new EventEmitter<string>();
  @Input() selected = 0;

  ngOnInit(): void {
    
  }

  public selectTab(i: number) {
    this.select.emit(this.list[i]);
    this.selected = i;
  }
}
