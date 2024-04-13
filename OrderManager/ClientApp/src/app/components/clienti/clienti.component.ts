/*import { Component, OnInit } from '@angular/core';
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
      // Numero totale di elementi
      this.totalItems = this.filteredClienti.length;
  
      this.onPageChange({pageIndex: 0, pageSize: this.pageSize}); // Chiamata iniziale per impostare correttamente gli elementi della pagina corrente
    });

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
}*/

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Prodotto } from '../../models/prodotto.model';
import { ConfigService } from '../../config/config.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrl: './clienti.component.css'
})
export class ClientiComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['codice', 'nome', 'indirizzo', 'telefono', 'partitaIva', 'codiceFiscale'];
  dataSource: MatTableDataSource<Cliente>;
  clienti: Array<Cliente> = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  async ngOnInit() {
    (await this.configService.getClienti()).subscribe((data) => {
      this.clienti = data as Array<Cliente>;
      this.dataSource.data = this.clienti;
    });
  }

  constructor(private configService: ConfigService) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.clienti);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
