import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-values',
  templateUrl: './home-values.component.html',
  styleUrls: ['./home-values.component.scss']
})
export class HomeValuesComponent implements OnInit {
  currentSlideIndex = 0;
  direction = 'normal';
  animationInterval: any = null;
  animationPause = 5000;
  animationDuration = 3000;

  slides = [
    {
      title: '1. Confident Collaboration, Secured Transactions',
      descripton: 'Contractor introduces Escrow, ensuring secure payments and fostering confidence in collaborative project management.',
      image: '../../../assets/images/slide_1.png',
    },
    {
      title: '2. Effortless Project Guarantee:',
      descripton: 'Contractor streamlines projects, guarantees payments with intuitive features, including Escrow for financial confidence.',
      image: '../../../assets/images/feature_1.png',
    },
    {
      title: '3. Trustworthy Contracting, Peace of Mind',
      descripton: 'Trust Contractor for secure, trustworthy contracts. Escrow ensures peace of mind, making project navigation seamless and stress-free.',
      image: '../../../assets/images/feature_2.png',
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
    this.animateSliding();
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
