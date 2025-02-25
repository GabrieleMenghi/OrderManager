import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AddOrderRequest } from '../models/requests/addOrdini.request';
import { Observable, finalize, firstValueFrom } from 'rxjs';
import { Prodotto } from '../models/prodotto.model';
import { Ordine } from '../models/ordine.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  // apiAddress: string = 'http://localhost:5006/api/'; // Development
  apiAddress: string = 'https://ordermanager-production-0d88.up.railway.app/api/'; // Production
  constructor(private http: HttpClient) {}

  // Prodotti
  async getProdotti() {
    var configUrl = this.apiAddress + 'prodotti';
    return await firstValueFrom(this.http.get(configUrl));
  }

  async importProdotti(formData: FormData) {
    const configUrl = this.apiAddress + 'prodotti/ImportProdottiFromExcelStream';
    await firstValueFrom(this.http.post<any>(configUrl, formData));
  }

  // Clienti
  async getClienti() {
    var configUrl = this.apiAddress + 'clienti';
    return await firstValueFrom(this.http.get(configUrl));
  }

  // Ordini
  async getOrdini() {
    var configUrl = this.apiAddress + 'ordini';
    return await firstValueFrom(this.http.get(configUrl));
  }

  async getOrdine(ordineId: number): Promise<Ordine> {
    var configUrl = this.apiAddress + 'ordini/GetOrdineConRighe/' + ordineId;
    return await firstValueFrom(this.http.get<Ordine>(configUrl));
  }

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
