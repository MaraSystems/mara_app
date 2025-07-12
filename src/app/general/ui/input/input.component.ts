import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, OnDestroy {
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() label = true;
  @Input() measure: string = '';
  @Input() type: 'text' | 'email' | 'date' | 'phone' | 'number' | 'checkbox' = 'text';
  @Input() control!: FormControl;
  @Input() required!: boolean;
  @Output() changed = new EventEmitter();
  @Input() note = '';
  @Input() edit = false;

  controlElement!: HTMLElement;

  constructor(public host: ElementRef<HTMLElement>) {}

  get showData() {
    const flag = !!this.control.value || this.edit;
    return flag;
  }

  isValid() {
    const { invalid, touched } = this.control;
    return invalid && touched;
  }

  onDocumentClick(event: MouseEvent) {}

  ngOnInit(): void {
    document.addEventListener('click', (event) => this.onDocumentClick(event), false);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', (event) => this.onDocumentClick(event), false);
  }

  focus() {
    this.edit = true;
    this.controlElement.focus();
    this.controlElement.classList.remove('empty');
  }

  blur() {
    this.edit = false;
    if (!this.control.value) {
      this.controlElement.blur();
      this.controlElement.classList.add('empty');
    }
  }
}
