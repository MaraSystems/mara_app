import { Component, Input, OnInit } from '@angular/core';
import { Auth } from 'src/app/auth/utils/models/auth.model';
import { SliderService } from 'src/app/general/utils/services/slider.service';

@Component({
  selector: 'app-home-values',
  templateUrl: './home-values.component.html',
  styleUrls: ['./home-values.component.scss']
})
export class HomeValuesComponent implements OnInit {
  @Input() auth: Auth | undefined;
  list = [
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

  get slides () {
    return Array.from(document.getElementsByClassName('slide')) as HTMLElement[];
  }

  constructor(
    public sliderService: SliderService
  ){
    this.sliderService.slides = this.slides;
  }

  ngOnInit(): void {
    // this.animateSliding();

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
