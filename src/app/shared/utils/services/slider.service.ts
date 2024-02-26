import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  currentSlideIndex = 0;
  direction = 'normal';
  animationInterval: any = null;
  animationPause = 5000;
  animationDuration = 3000;
  slides: HTMLElement[] = [];

  nextPostion(change: number, currentPositon = this.currentSlideIndex){ 
    const newPosition = currentPositon + change;
    const slideCount = this.slides.length;

    const position = newPosition >= slideCount
      ? 0
      : newPosition < 0
          ? slideCount - 1
          : newPosition;
          
    return position;
  }

  slide(change = 1) {
    this.direction = change > 0 ? 'normal' : 'reverse';
    const previousSlideIndex = Array.from(this.slides).findIndex(slide => slide.classList.contains('active-slide') || slide.classList.contains('active-slide-reverse'));
    this.currentSlideIndex = this.nextPostion(change);    
    
    this.slides[previousSlideIndex].style.zIndex = '1';
    this.slides[this.currentSlideIndex].style.zIndex = '1';

    setTimeout(() => {
      this.slides[previousSlideIndex].style.zIndex = '0';
    }, this.animationDuration);
  }

  animateSliding() {
    this.animationInterval = setInterval(() => {
      this.slide();
    }, this.animationDuration + this.animationPause);
  }

  selectSlide($event: any) {
    clearInterval(this.animationInterval);
    const change = $event - this.currentSlideIndex;
    this.slide(change);
    this.animateSliding();
  }
}
