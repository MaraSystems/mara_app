import { Component, Input, OnInit } from '@angular/core';
import { Auth } from 'src/app/auth/utils/models/auth.model';

@Component({
  selector: 'app-home-values',
  templateUrl: './home-values.component.html',
  styleUrls: ['./home-values.component.scss']
})
export class HomeValuesComponent implements OnInit {
  @Input() auth: Auth | undefined;

  currentSlideIndex = 0;
  direction = 'normal';
  animationInterval: any = null;
  animationPause = 5000;
  animationDuration = 3000;

  slides = [
    {
      title: 'Trustworthy Contracts',
      descripton: 'Trust Contractor for secure and safe contracts. With Escrow, experience peaceful and seamless transactions.',
      image: '../../../../assets/images/home-value-payment.png',
    },
    {
      title: 'Simplified Projects',
      descripton: 'Contractor simplifies projects and ensures payments with user-friendly features, including Escrow for financial peace of mind.',
      image: '../../../../assets/images/home-value-projects.png',
    },
    {
      title: 'Secured Transactions',
      descripton: 'Contractor introduces Escrow, providing a secure payment solution and instilling trust in collaborative contract management.',
      image: '../../../../assets/images/home-value-contract.png',
    }
  ];

  animations = {
    normal: {
      slideIn: 'slider-in 3s ease-in-out both normal',
      slideOut: 'slider-out 3s ease-in-out both normal',
    },
    reverse: {
      slideIn: 'slider-out 3s ease-in-out both reverse',
      slideOut: 'slider-in 3s ease-in-out both reverse'
    }
  }

  getSlides = () => document.getElementsByClassName('slide');

  constructor(){}

  ngOnInit(): void {
    // this.animateSliding();
  }

  nextPostion(currentPositon: number, change: number){ 
    const newPosition = currentPositon + change;
    const slideCount = this.getSlides().length;

    const position = newPosition >= slideCount
      ? 0
      : newPosition < 0
          ? slideCount - 1
          : newPosition;
          
    return position;
  }

  slide(change = 1) {
    this.direction = change > 0 ? 'normal' : 'reverse';
    const slides = this.getSlides();
    const previousSlideIndex = Array.from(slides).findIndex(slide => slide.classList.contains('active-slide') || slide.classList.contains('active-slide-reverse'));
    this.currentSlideIndex = this.nextPostion(previousSlideIndex, change);    
    (slides[previousSlideIndex] as HTMLElement).style.zIndex = '1';
    (slides[this.currentSlideIndex] as HTMLElement).style.zIndex = '1';

    setTimeout(() => {
      (slides[previousSlideIndex] as HTMLElement).style.zIndex = '0';
    }, this.animationDuration);
  }

  public selectSlide($event: any) {
    clearInterval(this.animationInterval);
    const change = $event - this.currentSlideIndex;
    this.slide(change);
    this.animateSliding();
  }

  animateSliding() {
    this.animationInterval = setInterval(() => {
      this.slide();
    }, this.animationDuration + this.animationPause);
  }

  setBackground(url: string) {
    return {
      background: `linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.80) 100%), url(${url}), lightgray 50%`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }
}
