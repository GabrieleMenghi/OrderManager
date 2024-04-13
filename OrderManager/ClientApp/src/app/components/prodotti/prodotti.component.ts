import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Prodotto } from '../../models/prodotto.model';
import { ConfigService } from '../../config/config.service';

@Component({
  selector: 'app-prodotti',
  styleUrl: './prodotti.component.css',
  templateUrl: './prodotti.component.html',
})
export class ProdottiComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['codice', 'descrizione', 'prezzo'];
  dataSource: MatTableDataSource<Prodotto>;
  prodotti: Array<Prodotto> = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  async ngOnInit() {
    (await this.configService.getProdotti()).subscribe((data) => {
      this.prodotti = data as Array<Prodotto>;
      this.dataSource.data = this.prodotti;
    });
  }

  constructor(private configService: ConfigService) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.prodotti);
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
