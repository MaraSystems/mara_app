import { TestBed } from '@angular/core/testing';

import { SliderService } from './slider.service';

describe('SliderService', () => {
  let sliderService: SliderService;
  const slide = document.createElement('span');
  slide.classList.add('slide');

  beforeEach(() => {
    TestBed.configureTestingModule({});
    sliderService = TestBed.inject(SliderService);
    sliderService.slides = Array(3).fill(slide.cloneNode(true));
    sliderService.slides[0].classList.add('active-slide');
  });

  it('should be created', () => {
    expect(sliderService).toBeTruthy();
  });

  it('should get next position as 1 when current position is 0', () => {
    const next = sliderService.nextPostion(1);
    expect(next).toEqual(1);
  });

  it('should get next position as 2 when current position is 1', () => {
    sliderService.currentSlideIndex = 1;
    const next = sliderService.nextPostion(1);
    expect(next).toEqual(2);
  });

  it('should slide to slide to 1 when active slide is 0', () => {
    sliderService.slide(1); 
    expect(sliderService.currentSlideIndex).toBe(1);
  });

  it('should slide to slide to 0 when active slide is 2 and change is 1', () => {
    sliderService.currentSlideIndex = 2;
    sliderService.slide(1); 
    expect(sliderService.currentSlideIndex).toBe(0);
  });
});
