import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { Auth } from '../models/auth.model';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAccessService {
  auth!: Auth;

  getAuth() {
    const text = localStorage.getItem('auth');
    if (!text) {
      return throwError(() => 'No Auth');
    }

    this.auth = JSON.parse(text as string);
    return of({ success: true, data: this.auth });
  }

  logout() {
    return of(true);
  }
}
