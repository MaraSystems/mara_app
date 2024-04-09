import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {
  @Input() list: string[] = [];

  constructor(
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.el.nativeElement.style.gridTemplateColumns = `repeat(${this.list.length}, 1fr)`;
  }
}
