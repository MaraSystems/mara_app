import { Component } from '@angular/core';

@Component({
  selector: 'app-home-works',
  templateUrl: './home-works.component.html',
  styleUrls: ['./home-works.component.scss']
})
export class HomeWorksComponent {
  list = [
    {
      description: 'Dignissim dictum nisi mattis nunc. Pellentesque non amet lorem nibh augue quis bibendum.. Pellentesque non amet lorem nibh augue quis bibendum.',
      image: '../../../assets/images/image_4.png',
      action: 'Login',
      background: 'var(--color-dark-variant)',
      link: '/login'
    },
    {
      description: 'Dignissim dictum nisi mattis nunc. Pellentesque non amet lorem nibh augue quis bibendum.. Pellentesque non amet lorem nibh augue quis bibendum.',
      image: '../../../assets/images/image_5.png',
      action: 'Explore',
      background: 'var(--color-light)',
      link: '/showcase'
    },
    {
      description: 'Dignissim dictum nisi mattis nunc. Pellentesque non amet lorem nibh augue quis bibendum.. Pellentesque non amet lorem nibh augue quis bibendum.',
      image: '../../../assets/images/image_6.png',
      action: 'Register',
      background: 'var(--color-dark-variant)',
      link: '/register'
    }
  ]
}
