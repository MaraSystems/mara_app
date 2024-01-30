import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit{
  time = 0;
  flag = false;

  ngOnInit(): void {
  }

  public request() {
    this.flag = true;
    console.log(this.flag);
    
  }
}
