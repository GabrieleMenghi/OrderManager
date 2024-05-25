import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Prodotto } from '../../../models/prodotto.model';

@Component({
  selector: 'app-modale-elimina-prodotto',
  templateUrl: './modale-elimina-prodotto.component.html',
  styleUrl: './modale-elimina-prodotto.component.css',
})
export class ModaleEliminaProdottoComponent {
  elimina: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<ModaleEliminaProdottoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Prodotto
  ) {}

  ngOnInit() {}

  conferma() {
    this.elimina = true;
    this.dialogRef.close(this.elimina);
  }

  close() {
    this.dialogRef.close();
  }
}
