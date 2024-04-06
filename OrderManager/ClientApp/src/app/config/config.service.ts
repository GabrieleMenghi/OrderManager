import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  async getProdotti() {
    var configUrl = 'http://localhost:5006/api/prodotti';
    return this.http.get(configUrl);
  }

  async importProdotti(formData: FormData) {
    try {
      var configUrl = 'http://localhost:5006/api/prodotti/ImportProdottiFromExcelStream';
      await this.http.post<any>(configUrl, formData).subscribe({
        next: () => {
          console.log('Richiesta eseguita');
        },
        error: (error) => {
          throw error;
        }
      });

    } catch (error) {
      throw error;
    }
  }
}
