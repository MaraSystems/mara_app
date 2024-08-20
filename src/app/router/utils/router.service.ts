import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvTypes } from 'src/app/general/utils/models/env';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  env = environment.env;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  navigate(url: string) {    
    if (this.env === EnvTypes.TESTING) {
      return;
    }

    this.router.navigateByUrl(url);
  }
}
