import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  getProdotti() {
    var configUrl = 'http://localhost:5006/prodotti';
    return this.http.get(configUrl);
  }
}
