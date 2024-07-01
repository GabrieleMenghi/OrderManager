import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
    var data = await this.configService.getClienti();
    this.clienti = data as Array<Cliente>;
    this.dataSource.data = this.clienti;
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
