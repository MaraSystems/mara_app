import { Component, Input } from '@angular/core';
import { Auth } from 'src/app/auth/utils/models/auth.model';

@Component({
  selector: 'app-home-works',
  templateUrl: './home-works.component.html',
  styleUrls: ['./home-works.component.scss']
})
export class HomeWorksComponent {
  @Input() auth: Auth | undefined;

  list = [
    {
      description: 'Users can securely deposit funds into an escrow account managed by Contractor. Upon mutual agreement that contract terms are fulfilled, the funds are released, guaranteeing a secure and reliable payment process.',
      image: '../../../../assets/images/home-works-payment.png',
      action: 'Login',
      background: 'var(--color-dark-variant)',
      link: '/auth'
    },
    {
      description: 'Contractor simplifies project with an easy-to-use escrow feature, allowing users to set up and manage payments with confidence, knowing their funds are protected until the contract terms are met.',
      image: '../../../../assets/images/home-works-projects.png',
      action: 'Explore',
      background: 'var(--color-light)',
      link: '/showcase'
    },
    {
      description: 'Our secure platform enables users to confidently create and manage contracts, with the added security of the escrow feature for peace of mind and seamless project navigation.',
      image: '../../../../assets/images/home-works-contract.png',
      action: 'Register',
      background: 'var(--color-dark-variant)',
      link: '/clients/register'
    }
  ]
}
