import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  host = 'http://localhost:3000';

  constructor(
    private httpClient: HttpClient
  ) { }

  public request<T, K>(method: string, endpoint: string, data?: K) {
    const url = `${this.host}/${endpoint}`;
    return this.httpClient.request<T>(method.toUpperCase(), url, {
      body: data
    });
  }
}
