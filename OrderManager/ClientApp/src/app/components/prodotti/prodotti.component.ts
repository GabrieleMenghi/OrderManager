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
  binding: any;

  constructor(
    private configService: ConfigService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.configService
      .getProdotti()
      .subscribe((data) => (this.prodotti = data as Array<Prodotto>));

    console.log(this.prodotti);
  }

  public prodottiSearchText: any;

  searchProdottiForm = this.formBuilder.group({
    prodottiSearchText: '',
  });

  onTextChange() {
    if (this.prodottiSearchText) {
      const searchText = this.prodottiSearchText.toLowerCase(); // Converti il testo di ricerca in minuscolo
      this.filteredProdotti = this.prodotti.filter((p) =>
        p.descrizione.toLowerCase().includes(searchText) // Controlla se la descrizione contiene il testo di ricerca
      );
    } else {
      // Se il campo di ricerca è vuoto, mostra tutti i prodotti
      this.filteredProdotti = this.prodotti;
    }
  }
}
