import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Prodotto } from '../../models/prodotto.model';
import { ConfigService } from '../../config/config.service';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ModaleModificaProdottoComponent } from '../modali/modale-modifica-prodotto/modale-modifica-prodotto.component';
import { ModaleEliminaProdottoComponent } from '../modali/modale-elimina-prodotto/modale-elimina-prodotto.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prodotti',
  styleUrl: './prodotti.component.css',
  templateUrl: './prodotti.component.html',
})
export class ProdottiComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'codice',
    'descrizione',
    'prezzo',
    'modifica',
    'elimina',
  ];
  dataSource: MatTableDataSource<Prodotto>;
  prodotti: Array<Prodotto> = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  async ngOnInit() {
    var data = await this.configService.getProdotti();
    this.prodotti = data as Array<Prodotto>;
    this.dataSource.data = this.prodotti;
  }

  constructor(
    private configService: ConfigService, 
    private dialog: MatDialog,
    private toastr: ToastrService) {
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

  async openDialogModify(row: any) {
    const dialogRef = this.dialog.open(ModaleModificaProdottoComponent, {
      data: {
        prodottoId: 0,
        codice: row.codice,
        descrizione: row.descrizione,
        prezzo: row.prezzo,
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          const updatedProduct = await this.configService.modificaProdottoAsync(result);
          const index = this.prodotti.findIndex(p => p.prodottoId === updatedProduct.prodottoId);
          if (index !== -1) {
            this.prodotti[index] = updatedProduct;
            this.dataSource.data = [...this.prodotti];
            this.toastr.success('Modifica completata con successo');
          }
        } catch (error) {
          this.toastr.error('Modifica non riuscita');
        }
      }
    });
  }

  async openDialogDelete(row: any) {
    const dialogRef = this.dialog.open(ModaleEliminaProdottoComponent, {
      data: {
        prodottoId: 0,
        codice: row.codice,
        descrizione: row.descrizione,
        prezzo: row.prezzo,
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if(result)
        try
        {
          await this.configService.eliminaProdottoAsync(row);
          this.toastr.success('Eliminazione completata con successo');
        } catch (error) {
          this.toastr.error('Eliminazione non riuscita');
        }
    });
  }
}
