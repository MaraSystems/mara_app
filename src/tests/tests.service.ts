import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NewClient } from 'src/app/client/utils/models/new-client';
import { newClientStub } from './stubs/client.stubs';
import { Login } from 'src/app/auth/utils/models/login.model';
import { LoginAuthAction } from 'src/app/auth/utils/store/auth-store.action';
import { Database } from '@black-ink/lonedb';
import { environment } from 'src/environments/environment';
import { ClientAccessService } from 'src/app/client/utils/access/client-access.service';
import { RegisterClientAction } from 'src/app/client/utils/store/client-store.action';
import { firstValueFrom } from 'rxjs';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { Auth } from 'src/app/auth/utils/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class TestsService {
  db = new Database(`${environment.env}-${environment.appName}`);

  constructor(
    private store: Store,
  ) { 
    this.db.empty();
  }

  async getAuth() {
    const auth =  (await firstValueFrom(this.store.select(selectActiveAuth))) as Auth;
  }

  registerClient(data: Partial<NewClient> = {}) {
    const stub = newClientStub();
    this.store.dispatch(new RegisterClientAction({ ...stub, ...data }));
  }

  login(data: Partial<Login> = {}) {
    const { email } = newClientStub();    
    this.store.dispatch(new LoginAuthAction({ email, password: '12345', ...data }));
  }
}
