import { Component } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrl: './import.component.css',
})
export class ImportComponent {
  file: any;

  constructor(
    public configService: ConfigService,
    private _snackBar: MatSnackBar
  ) {}

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    const allowedExtensions = ['.xlsx', '.xlsm'];

    // Verifica se l'estensione del file selezionato è tra quelle consentite
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (fileExtension && allowedExtensions.includes('.' + fileExtension)) {
        // Il file ha un'estensione consentita, puoi procedere con il tuo codice
        this.file = selectedFile;
      } else {
        // Il file ha un'estensione non consentita
        alert('Sono consentiti solo file .xlsx o .xlsm');
        event.target.value = null;
      }
    }
  }

  async importProdotti() {
    try {
      if (this.file) {
        const formData: FormData = new FormData();
        formData.append('file', this.file);

        await this.configService.importProdotti(formData);

        this._snackBar.open('Import completato', 'Close', {duration: 2000});
      }
    } catch (error) {
      this._snackBar.open('Import in errore: ' + error);
    }
  }
}
