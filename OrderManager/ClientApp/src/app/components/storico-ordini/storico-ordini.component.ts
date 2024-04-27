import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { Ordine } from '../../models/ordine.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-storico-ordini',
  templateUrl: './storico-ordini.component.html',
  styleUrl: './storico-ordini.component.css',
})
export class StoricoOrdiniComponent implements OnInit{
  ordini: Array<Ordine> = [];
  dataSource: MatTableDataSource<Ordine>;
  displayedColumns: string[] = ['ordineId', 'data', 'clienteId'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  clienti: Array<Cliente> = [];


  constructor(private configService: ConfigService) {
    this.dataSource = new MatTableDataSource(this.ordini);
  }

  async ngOnInit() {
    (await this.configService.getOrdini()).subscribe((data) => {
      this.ordini = data as Array<Ordine>;
      this.dataSource.data = this.ordini;
    });

    (await this.configService.getClienti()).subscribe((data) => {
      this.clienti = data as Array<Cliente>;
    });
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

  getClienteNameById(clienteId: number): string{
    var cliente = this.clienti.filter(x => x.clienteId === clienteId)[0];
    return cliente.nome;
  }
}
