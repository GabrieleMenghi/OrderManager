import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { FormBuilder } from '@angular/forms';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrl: './clienti.component.css'
})
export class ClientiComponent implements OnInit{
  clienti: Array<Cliente> = [];
  public filteredClienti: Array<Cliente> = [];
  public currentItems: Array<Cliente> = [];
  binding: any;
  public totalItems: number = 0;
  public pageSize: number = 25;

  constructor(
    private configService: ConfigService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    (await this.configService.getClienti()).subscribe((data) => {
      this.clienti = data as Array<Cliente>;
      this.filteredClienti = this.clienti;
      this.currentItems = this.filteredClienti;
    });

    // Numero totale di elementi
    this.totalItems = this.filteredClienti.length;

    this.onPageChange({pageIndex: 0, pageSize: this.pageSize}); // Chiamata iniziale per impostare correttamente gli elementi della pagina corrente
  }

  public clientiSearchText: any;

  searchClientiForm = this.formBuilder.group({
    clientiSearchText: '',
  });

  onTextChange() {
    if (this.clientiSearchText) {
      const searchText = this.clientiSearchText.toLowerCase(); // Converti il testo di ricerca in minuscolo
      this.filteredClienti = this.clienti.filter(
        (p) => p.nome.toLowerCase().includes(searchText) // Controlla se la descrizione contiene il testo di ricerca
      );
      this.currentItems = this.filteredClienti;
      this.onPageChange({ pageIndex: 0, pageSize: this.pageSize }); // Riporta alla prima pagina dopo la ricerca
    } else {
      // Se il campo di ricerca è vuoto, mostra tutti i prodotti
      this.filteredClienti = this.clienti;
      this.currentItems = this.filteredClienti;
      this.onPageChange({ pageIndex: 0, pageSize: this.pageSize }); // Riporta alla prima pagina dopo la ricerca
    }
    this.totalItems = this.filteredClienti.length;
  }

  pageSizeOptions: number[] = [5, 10, 25, 100];

  // Metodo chiamato quando cambia la pagina
  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    // Estrai gli elementi corrispondenti alla pagina corrente
    // Se items è un array di oggetti
    this.currentItems = this.filteredClienti.slice(startIndex, endIndex);
    // Se items è un array di stringhe o numeri
    // this.currentItems = this.items.slice(startIndex, endIndex);
    this.pageSize = event.pageSize;
  }
}
