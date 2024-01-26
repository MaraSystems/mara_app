import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-testimonials',
  templateUrl: './home-testimonials.component.html',
  styleUrls: ['./home-testimonials.component.scss']
})
export class HomeTestimonialsComponent implements OnInit {
  current = 0;
  testimonials = [
    {
      fullname: 'Sara Sim',
      image: '../../../assets/images/customer_1.png',
      description: 'Dignissim dictum nisi mattis nunc. Pellentesque non amet lorem nibh augue quis bibendum.. Pellentesque non amet lorem nibh augue quis bibendum.'
    },
    {
      fullname: 'Sara Sim',
      image: '../../../assets/images/customer_2.png',
      description: 'Dignissim dictum nisi mattis nunc. Pellentesque non amet lorem nibh augue quis bibendum.. Pellentesque non amet lorem nibh augue quis bibendum.'
    },
    {
      fullname: 'Sara Sim',
      image: '../../../assets/images/customer_3.png',
      description: 'Dignissim dictum nisi mattis nunc. Pellentesque non amet lorem nibh augue quis bibendum.. Pellentesque non amet lorem nibh augue quis bibendum.'
    }
  ];

  ngOnInit(): void {
    
  }

  setCurrent($event: any) {
    this.current = $event;
  }
}
