import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
})
export class MessageInputComponent implements OnInit, OnDestroy {
  @Input() wait = false;
  @Output() send = new EventEmitter();
  input!: HTMLInputElement;

  constructor(
    private el: ElementRef
  ){}

  ngOnInit(): void {
    const [input] = Array.from((this.el.nativeElement as HTMLElement).getElementsByTagName('input'));
    this.input = input;
    this.input.addEventListener('keypress', this.submit.bind(this));
  }

  ngOnDestroy(): void {
    this.input.removeEventListener('keypress', this.submit.bind(this));
  }

  submit(event: KeyboardEvent) {
    if (event.keyCode === 13 && this.input.value) {
      this.sendMessage();
    }
  }

  sendMessage() {
    this.send.emit(this.input.value);
    this.input.value = '';
  }
}
