import { Component } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrl: './import.component.css',
})
export class ImportComponent {
  file: any;

  constructor(
    public configService: ConfigService,
    private toastr: ToastrService
  ) {}

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    const allowedExtensions = ['.xlsx', '.xlsm'];

    // Cambia la label del file input
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const fileName = input.files[0].name;
      const fileNameSpan = document.getElementById('file-name');
      if (fileNameSpan) {
        fileNameSpan.textContent = fileName;
      }
    }

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

        this.toastr.success("Import prodotti compleato con successo");
      }
    } catch (error) {
    }
    finally{
      
    }
  }

}
