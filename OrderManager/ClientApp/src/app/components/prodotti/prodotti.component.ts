import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../config/config.service';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css',
})
export class ProdottiComponent implements OnInit {
  prodotti: any;
  binding: any;

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.configService
      .getProdotti()
      .subscribe((data) => (this.prodotti = data));

      console.log(this.prodotti);
  }
}
