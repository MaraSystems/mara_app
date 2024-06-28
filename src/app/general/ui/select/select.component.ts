import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends InputComponent implements OnChanges {
  @Input() list!: Array<string | KeyValue<string, string>>;
  keys: string[] = [];
  values: string[] = [];

  
  public override ngOnChanges(changes: SimpleChanges): void {
    this.useList();
  }

  useList() {
    for (const item of this.list) {
      if (typeof item !== 'string') {
        this.keys.push(item.key);
        this.values.push(item.value);
      }
      else {
        this.keys.push(item);
        this.values.push(item);
      }
    }     
  }
}
