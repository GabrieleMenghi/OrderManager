import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { FormBuilder } from '@angular/forms';
import { Prodotto } from '../../models/prodotto.model';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css',
})
export class ProdottiComponent implements OnInit {
  prodotti: Array<Prodotto> = [];
  public filteredProdotti: Array<Prodotto> = [];
  public currentItems: Array<Prodotto> = [];
  binding: any;
  public totalItems: number = 0;
  public pageSize: number = 25;

  constructor(
    private configService: ConfigService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    (await this.configService.getProdotti()).subscribe((data) => {
      this.prodotti = data as Array<Prodotto>;
      this.filteredProdotti = this.prodotti;
      this.currentItems = this.filteredProdotti;
    });

    // Numero totale di elementi
    this.totalItems = this.filteredProdotti.length;

    this.onPageChange({pageIndex: 0, pageSize: this.pageSize}); // Chiamata iniziale per impostare correttamente gli elementi della pagina corrente
  }

  public prodottiSearchText: any;

  searchProdottiForm = this.formBuilder.group({
    prodottiSearchText: '',
  });

  onTextChange() {
    if (this.prodottiSearchText) {
      const searchText = this.prodottiSearchText.toLowerCase(); // Converti il testo di ricerca in minuscolo
      this.filteredProdotti = this.prodotti.filter(
        (p) => p.descrizione.toLowerCase().includes(searchText) // Controlla se la descrizione contiene il testo di ricerca
      );
      this.currentItems = this.filteredProdotti;
      this.onPageChange({ pageIndex: 0, pageSize: this.pageSize }); // Riporta alla prima pagina dopo la ricerca
    } else {
      // Se il campo di ricerca è vuoto, mostra tutti i prodotti
      this.filteredProdotti = this.prodotti;
      this.currentItems = this.filteredProdotti;
      this.onPageChange({ pageIndex: 0, pageSize: this.pageSize }); // Riporta alla prima pagina dopo la ricerca
    }
    this.totalItems = this.filteredProdotti.length;
  }

  pageSizeOptions: number[] = [5, 10, 25, 100];

  // Metodo chiamato quando cambia la pagina
  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    // Estrai gli elementi corrispondenti alla pagina corrente
    // Se items è un array di oggetti
    this.currentItems = this.filteredProdotti.slice(startIndex, endIndex);
    // Se items è un array di stringhe o numeri
    // this.currentItems = this.items.slice(startIndex, endIndex);
    this.pageSize = event.pageSize;
  }
}
