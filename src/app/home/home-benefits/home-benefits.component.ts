import { Component } from '@angular/core';

@Component({
  selector: 'app-home-benefits',
  templateUrl: './home-benefits.component.html',
  styleUrls: ['./home-benefits.component.scss']
})
export class HomeBenefitsComponent {
  list = [
    {
      name: 'A Benefit',
      description: 'Dignissim dictum nisi mattis nunc. Pellentesque non amet lorem nibh augue quis bibendum.. Pellentesque non amet lorem nibh augue quis bibendum.',
      image: '../../../assets/images/image_4.png',
    },
    {
      name: 'A Benefit',
      description: 'Dignissim dictum nisi mattis nunc. Pellentesque non amet lorem nibh augue quis bibendum.. Pellentesque non amet lorem nibh augue quis bibendum.',
      image: '../../../assets/images/image_5.png',
    },
    {
      name: 'A Benefit',
      description: 'Dignissim dictum nisi mattis nunc. Pellentesque non amet lorem nibh augue quis bibendum.. Pellentesque non amet lorem nibh augue quis bibendum.',
      image: '../../../assets/images/image_6.png',
    }
  ]

}
