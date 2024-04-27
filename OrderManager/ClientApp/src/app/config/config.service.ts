import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddOrderRequest } from '../models/requests/addOrdini.request';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  apiAddress: string = 'http://localhost:5006/api/';
  constructor(private http: HttpClient) {}

  // Prodotti
  async getProdotti() {
    var configUrl = this.apiAddress + 'prodotti';
    return this.http.get(configUrl);
  }

  async importProdotti(formData: FormData) {
    try {
      var configUrl =
        this.apiAddress + 'prodotti/ImportProdottiFromExcelStream';
      await this.http.post<any>(configUrl, formData).subscribe({
        next: () => {
          console.log('Richiesta eseguita');
        },
        error: (error) => {
          throw error;
        },
      });
    } catch (error) {
      throw error;
    }
  }

  // Clienti
  async getClienti() {
    var configUrl = this.apiAddress + 'clienti';
    return this.http.get(configUrl);
  }

  // Ordini
  async getOrdini() {
    var configUrl = this.apiAddress + 'ordini';
    return this.http.get(configUrl);
  }

  async aggiungiOrdine(request: AddOrderRequest) {
    try {
      var configUrl = this.apiAddress + 'ordini/AddOrder';
      return await this.http.post<any>(configUrl, request).subscribe({
        next: () => {
          console.log('Aggiunta effettuata');
        },
        error: (error) => {
          throw error;
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
