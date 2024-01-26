import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit{
  @Input() name = '';
  @Input() color = 'black';
  @Input() width = '20px';
  @Input() height = '20px';

  ngOnInit(): void {
    
  }
}
