import { Component, Input } from '@angular/core';
import { Auth } from 'src/app/auth/utils/models/auth.model';

@Component({
  selector: 'app-home-benefits',
  templateUrl: './home-benefits.component.html',
  styleUrls: ['./home-benefits.component.scss']
})
export class HomeBenefitsComponent {
  list = [
    {
      name: 'Financial Security',
      description: 'By using our escrow feature, users can trust that their payments are secure until contract terms are fulfilled, minimizing financial disputes and ensuring fair and reliable transactions',
      image: '../../../../assets/images/home-benefits-payment.png',
    },
    {
      name: 'Project Efficiency',
      description: 'Our platform simplifies project tasks, helping users handle contracts and payments efficiently, leading to time savings and decreased administrative workload.',
      image: '../../../../assets/images/home-benefits-projects.png',
    },
    {
      name: 'Trust and Confidence',
      description: 'Contractor builds trust, creating a collaborative environment where all parties can confidently engage in projects, knowing their interests are protected during contract execution.',
      image: '../../../../assets/images/home-benefits-contract.png',
    }
  ]

}
