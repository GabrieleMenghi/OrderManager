import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { ConfigService } from '../../config/config.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Prodotto } from '../../models/prodotto.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProdottoSelezionatoPerOrdine } from '../../models/prodottoSelezionatoPerOrdine.model';
import { AddOrderRequest } from '../../models/requests/addOrdini.request';
import { Ordine, RigaOrdine } from '../../models/ordine.model';

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrl: './ordini.component.css',
})
export class OrdiniComponent implements OnInit, AfterViewInit {
  // Clienti
  clientsControl = new FormControl('', [Validators.required]);
  clienti: Array<Cliente> = [];
  options: string[] = this.clienti.map((x) => x.nome);
  clientsFilteredOptions: Observable<string[]>;

  fareFattura: boolean = false;
  totaleOrdine: number;

  displayedColumns: string[] = [
    'codice',
    'descrizione',
    'prezzo',
    'unitaMisura',
    'quantita',
    'aggiungi',
  ];
  dataSource: MatTableDataSource<Prodotto>;
  prodotti: Array<Prodotto> = [];
  unitaDiMisuraList: Array<string> = ['PZ', 'CT'];

  selectedProdottiPerOrdine: Array<ProdottoSelezionatoPerOrdine> = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private configService: ConfigService) {
    this.dataSource = new MatTableDataSource(this.prodotti);
  }

  ff() {
    this.fareFattura = !this.fareFattura;
  }

  async ngOnInit() {
    this.clientsFilteredOptions = this.clientsControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterClients(value || ''))
    );

    (await this.configService.getClienti()).subscribe((data) => {
      this.clienti = data as Array<Cliente>;
      // Assegna i nomi dei clienti a options dopo aver ottenuto i dati
      this.options = this.clienti.map((x) => x.nome);
      // Emette un evento di valueChanges per forzare l'aggiornamento della lista filtrata
      this.clientsControl.setValue('');
    });

    (await this.configService.getProdotti()).subscribe((data) => {
      this.prodotti = data as Array<Prodotto>;
      this.dataSource.data = this.prodotti;
    });
  }

  filterClients(value: string): string[] {
    const filterValue = value.toLowerCase();

    if (!filterValue) {
      // Restituisci tutti i clienti quando non c'è testo
      return this.options;
    } else {
      return this.options.filter((option) =>
        option.toLowerCase().includes(filterValue)
      );
    }
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

  aggiungiRigaOrdine(row: any) {
    var selectedProdottiCodici = this.selectedProdottiPerOrdine.map(
      (x) => x.prodotto.codice
    );
    if (!selectedProdottiCodici.includes(row.codice)) {
      var prodottoId = this.getProdottoIdByCodice(row.codice)
      var prodotto = new Prodotto(prodottoId, row.codice, row.descrizione, row.prezzo);
      var rigaOrdineToAdd =
        ProdottoSelezionatoPerOrdine.ProdottoSelezionatoPerOrdineFactory(
          prodotto,
          row.unitaMisura,
          row.quantita
        );
      this.selectedProdottiPerOrdine.push(rigaOrdineToAdd);
      this.totaleOrdine = this.selectedProdottiPerOrdine.reduce(
        (sum, current) => sum + current.prodotto.prezzo * current.quantita,
        0
      );
    }
  }

  rimuoviRigaOrdine(selRow: any) {
    var rigaOrdineToDelete = this.selectedProdottiPerOrdine.find((x) => x.prodotto.codice === selRow.prodotto.codice);
    if (rigaOrdineToDelete) {
      const index = this.selectedProdottiPerOrdine.indexOf(rigaOrdineToDelete, 0);
      if (index > -1) {
        this.selectedProdottiPerOrdine.splice(index, 1);
        this.totaleOrdine = this.selectedProdottiPerOrdine.reduce(
          (sum, current) => sum + current.prodotto.prezzo * current.quantita,
          0
        );
      }
    }
  }

  // Ordini
  async creaOrdine() {
    var dateNow = new Date();
    const dateNowString = dateNow.toLocaleString('it-IT');
    var clienteSelected = this.clienti.filter(x => x.nome === this.clientsControl.value)[0];
    var righeOrdine = this.selectedProdottiPerOrdine.map(x => RigaOrdine.RigaOrdineFactoryCreate(x.prodotto.prodottoId, x.unitaMisura, x.quantita));
    var ordine = Ordine.OrdineFactoryCreate(dateNowString, clienteSelected.clienteId, this.fareFattura, righeOrdine, "");
    var addOrderRequest: AddOrderRequest = new AddOrderRequest(ordine);
    console.log(this.selectedProdottiPerOrdine);

    await this.configService.aggiungiOrdine(addOrderRequest);
  }

  getProdottoIdByCodice(codice: string): number{
    var prodotto = this.prodotti.filter(x => x.codice === codice)[0];
    return prodotto.prodottoId;
  }
}

/*
  MatFormFieldControl<ProdottoList>
  //private touchedCallback: Function;
  //@ViewChild('inputTrigger', { read: MatAutocompleteTrigger })
  private _placeholder: string;

  private changeCallback: Function;
  //this.changeCallback(this.selectedItems);

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>,
    private cd: ChangeDetectorRef,
    private configService: ConfigService
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    fm.monitor(elRef.nativeElement, true).subscribe((origin) => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  @Input() set value(value: any) {
    if (value) {
      this.selectedItems = value;
    }
    this.stateChanges.next();
  }
  get value() {
    return this.selectedItems;
  }

  ngOnDestroy() {
    this.fm.stopMonitoring(this.elRef.nativeElement);
    this.stateChanges.complete();
  }

  writeValue(value: any) {
    console.log(value, 'Inside writeValue');
  }
  registerOnChange(fn: Function) {
    this.changeCallback = fn;
  }
  registerOnTouched(fn: Function) {
    this.touchedCallback = fn;
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  clicker() {
    this.inputTrigger.openPanel();
  }
  */

/* Old working products selection - autocomplete + checkboxes

  // Prodotti
  productsControl = new FormControl();
  prodotti: Array<Prodotto> = [];
  productsList: ProdottoList[] = [];
  selectedProducts: ProdottoList[] = new Array<ProdottoList>();
  filteredProducts: ProdottoList[];
  lastProductsFilter = '';
  displayedProducts: ProdottoList[] = [];


  this.productsList = this.prodotti.map((x) => new ProdottoList(x, false));
      this.filteredProducts = this.productsList;
      this.productsControl.valueChanges
        .pipe(
          startWith<string | ProdottoList[]>(''),
          map((value) =>
            typeof value === 'string' ? value : this.lastProductsFilter
          ),
          map((filter) => this.filterProdotti(filter))
        )
        .subscribe((data) => (this.filteredProducts = data));


  // Prodotti
  filterProdotti(filter: string): ProdottoList[] {
    this.lastProductsFilter = filter;
    if (filter) {
      const filteredResults = this.productsList.filter((option) => {
        return (
          option.prodotto.descrizione
            .toLowerCase()
            .indexOf(filter.toLowerCase()) >= 0
        );
      });
      // Aggiorna solo i risultati filtrati
      this.filteredProducts = filteredResults;
    } else {
      // Se il filtro è vuoto, usa l'intero set di prodotti
      this.filteredProducts = this.productsList.slice();
    }
    // Mostra solo i primi 20 risultati filtrati
    this.displayedProducts = this.filteredProducts.slice(0, 20);
    return this.displayedProducts;
  }

  optionClicked(event: Event, item: ProdottoList) {
    event.stopPropagation();
    this.toggleSelection(item);
  }

  toggleSelection(item: ProdottoList) {
    item.selected = !item.selected;
    if (item.selected) {
      this.selectedProducts.push(item);
    } else {
      const i = this.selectedProducts.findIndex(
        (value) => value.prodotto.descrizione === item.prodotto.descrizione
      );
      this.selectedProducts.splice(i, 1);
    }
  }

  export class ProdottoList {
  constructor(public prodotto: Prodotto, public selected?: boolean) {
    if (selected === undefined) selected = false;
  }
}
  */
