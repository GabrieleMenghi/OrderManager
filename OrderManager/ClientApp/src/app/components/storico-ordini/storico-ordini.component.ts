import { Component } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { Ordine } from '../../models/ordine.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-storico-ordini',
  templateUrl: './storico-ordini.component.html',
  styleUrl: './storico-ordini.component.css',
})
export class StoricoOrdiniComponent {
  ordini: Ordine[] = [];
  dataSource: MatTableDataSource<Ordine>;
  displayedColumns: string[] = ['ordineId', 'data', 'clienteId'];

  constructor(private configService: ConfigService) {}

  async getOrders() {
    (await this.configService.getOrdini()).subscribe((data) => {
      this.ordini = data as Array<Ordine>;
      this.dataSource.data = this.ordini;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
