import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ENVEnum } from 'src/app/shared/utils/models/env.enum';
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
    if (this.env === ENVEnum.TESTING) {
      return;
    }

    this.router.navigateByUrl(url);
  }
}
