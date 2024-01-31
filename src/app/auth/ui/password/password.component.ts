import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit{
  time = 0;
  flag = false;

  ngOnInit(): void {
  }

  public request() {
    this.flag = true;
    console.log(this.flag);
    
  }
}
