import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
  @Input() icon = '';
  @Input() data: any = {};
  values: string[] = [];
  keys: string[] = [];

  constructor(
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.values = Object.values(this.data);
    this.keys = Object.keys(this.data);
    this.el.nativeElement.style.gridTemplateColumns = `repeat(${this.values.length}, 1fr)`;
  }
}
