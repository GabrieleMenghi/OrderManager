import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AddOrderRequest } from '../models/requests/addOrdini.request';
import { Observable, finalize, firstValueFrom } from 'rxjs';
import { Prodotto } from '../models/prodotto.model';

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

  /*async aggiungiOrdine(request: AddOrderRequest) {
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
  }*/

  async aggiungiOrdine(request: AddOrderRequest) {
    try {
      var configUrl = this.apiAddress + 'ordini/AddOrder';
      this.http
        .post(configUrl, request, { responseType: 'blob' })
        .pipe(
          finalize(() => {
            // Cleanup
          })
        )
        .subscribe({
          next: (response: Blob) => {
            if (response) {
              // Creazione di un oggetto Blob dal tipo di risposta ricevuto (blob)
              const blob = new Blob([response], { type: 'application/pdf' });

              // Creazione di un oggetto URL dal blob
              const url = window.URL.createObjectURL(blob);

              // Creazione di un link temporaneo per il download del file
              const link = document.createElement('a');
              link.href = url;
              link.download = 'Prova.pdf';

              // Aggiunta del link alla pagina e click su di esso per avviare il download
              document.body.appendChild(link);
              link.click();

              // Rimozione del link dalla pagina dopo il download
              document.body.removeChild(link);
            } else {
              // Se la risposta è undefined, gestisci l'errore
              throw new Error('La risposta dal server è vuota.');
            }
          },
          error: (error) => {
            // Gestisci gli errori
            throw error;
          },
        });
    } catch (error) {
      throw error;
    }
  }

  // async modificaProdotto(prodotto: Prodotto) {
  //   try {
  //     var configUrl = this.apiAddress + 'prodotti/ModificaProdotto';
  //     await this.http.post<any>(configUrl, prodotto).subscribe({
  //       next: () => {},
  //       error: (error) => {
  //         throw error;
  //       },
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async modificaProdottoAsync(prodotto: Prodotto): Promise<Prodotto> {
    const configUrl = this.apiAddress + 'prodotti/ModificaProdotto';
    const updatedProduct = await firstValueFrom(this.http.post<Prodotto>(configUrl, prodotto));
    return updatedProduct;
  }

  async eliminaProdottoAsync(prodotto: Prodotto) {
    const configUrl = this.apiAddress + 'prodotti/EliminaProdotto';
    await firstValueFrom(this.http.post<any>(configUrl, prodotto));
  }
}
