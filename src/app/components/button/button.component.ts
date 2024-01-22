import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit{
  @Input() text = 'Button';
  @Input () textSize = '1.25rem';
  @Input() textColor = '#000000';
  @Input() background = '#FFFFFF';
  @Input() elevated = false;
  @Input() icon = '';
  @Input () iconColor = '#FFF000';
  @Input() link = '';

  @Output() onClick = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    
  }
}
