import { Component, Input, OnChanges, ElementRef, SimpleChanges } from '@angular/core';
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

  constructor(
    override host: ElementRef<HTMLElement>
  ) {
    super(host);
  }

  public override onDocumentClick(event: MouseEvent) {
    const clicked = this.host.nativeElement.contains(event.target as Node);
    if (clicked) {
      this.focus();
    } else {
      this.blur();
    }
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.controlElement = this.host.nativeElement.querySelector('.form-control-data') as HTMLElement;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.useList();
  }

  useList() {
    this.keys = [];
    this.values = [];
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
