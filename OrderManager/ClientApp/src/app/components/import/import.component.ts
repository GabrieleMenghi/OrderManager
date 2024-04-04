import { Component } from '@angular/core';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrl: './import.component.css'
})
export class ImportComponent {
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    const allowedExtensions = ['.xlsx', '.xlsm'];

    // Verifica se l'estensione del file selezionato è tra quelle consentite
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (fileExtension && allowedExtensions.includes('.' + fileExtension)) {
        // Il file ha un'estensione consentita, puoi procedere con il tuo codice
      } else {
        // Il file ha un'estensione non consentita
        alert("Sono consentiti solo file .xlsx o .xlsm");
        event.target.value = null;
      }
    }
  }
}
