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
  title = 'Simplified Projects';
  descripton = 'Contractor simplifies projects and ensures payments with user-friendly features, including Escrow for financial peace of mind.';

  constructor(
    public sliderService: SliderService
  ){

  }

  ngOnInit(): void {}
}
