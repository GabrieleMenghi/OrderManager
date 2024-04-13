import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ConfigService } from '../../config/config.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrl: './ordini.component.css',
})
export class OrdiniComponent implements OnInit {
  clienti: Array<Cliente> = [];
  options: string[] = this.clienti.map((x) => x.nome);
  myClientsControl = new FormControl('',[Validators.required]);
  clientsFilteredOptions: Observable<string[]>;
  isSelectionMade: boolean = false;

  constructor(private configService: ConfigService) {}

  async ngOnInit() {
    this.clientsFilteredOptions = this.myClientsControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterClients(value || ''))
    );

    (await this.configService.getClienti()).subscribe((data) => {
      this.clienti = data as Array<Cliente>;
      // Assegna i nomi dei clienti a options dopo aver ottenuto i dati
      this.options = this.clienti.map((x) => x.nome);
      // Emette un evento di valueChanges per forzare l'aggiornamento della lista filtrata
      this.myClientsControl.setValue('');
    });
  }

  private _filterClients(value: string): string[] {
    const filterValue = value.toLowerCase();

    if (!filterValue) {
      return this.options; // Restituisci tutti i clienti quando non c'è testo
    } else {
      return this.options.filter((option) =>
        option.toLowerCase().includes(filterValue)
      );
    }
  }
}