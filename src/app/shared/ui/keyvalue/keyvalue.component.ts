import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyvalue',
  templateUrl: './keyvalue.component.html',
  styleUrls: ['./keyvalue.component.scss']
})
export class KeyvalueComponent implements OnInit{
  @Input() object: any = {};
  list: { key: string, value: string }[] = [];

  constructor (){}

  ngOnInit(): void {
    this.list = Object.keys(this.object).map(key => ({ key, value: this.object[key] as string }));
  }
}
