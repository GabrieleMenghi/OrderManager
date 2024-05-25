import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Prodotto } from '../../models/prodotto.model';
import { ConfigService } from '../../config/config.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ModaleModificaProdottoComponent } from '../modali/modale-modifica-prodotto/modale-modifica-prodotto.component';
import { ModaleEliminaProdottoComponent } from '../modali/modale-elimina-prodotto/modale-elimina-prodotto.component';

@Component({
  selector: 'app-prodotti',
  styleUrl: './prodotti.component.css',
  templateUrl: './prodotti.component.html',
})
export class ProdottiComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['codice', 'descrizione', 'prezzo', 'modifica', 'elimina'];
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

  constructor(private configService: ConfigService, private dialog: MatDialog) {
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

  openDialogModify(row: any) {
    const dialogRef = this.dialog.open(ModaleModificaProdottoComponent, {
      data: {
        prodottoId: 0,
        codice: row.codice,
        descrizione: row.descrizione,
        prezzo: row.prezzo,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result)
        console.log('Prodotto modificato con successo codice: ' + result.codice + ' desc: ' + result.descrizione + ' prezzo: ' + result.prezzo);
    });
  }

  openDialogDelete(row: any) {
    const dialogRef = this.dialog.open(ModaleEliminaProdottoComponent, {
      data: {
        prodottoId: 0,
        codice: row.codice,
        descrizione: row.descrizione,
        prezzo: row.prezzo,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result)
        console.log('Prodotto eliminato con successo');
    });
  }
}
