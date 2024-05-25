import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Prodotto } from '../../../models/prodotto.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modale-modifica-prodotto',
  templateUrl: './modale-modifica-prodotto.component.html',
  styleUrl: './modale-modifica-prodotto.component.css'
})
export class ModaleModificaProdottoComponent {
  form: FormGroup;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<ModaleModificaProdottoComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Prodotto) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      codice: this.data.codice,
      descrizione: this.data.descrizione,
      prezzo: this.data.prezzo
  });
  }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
}
