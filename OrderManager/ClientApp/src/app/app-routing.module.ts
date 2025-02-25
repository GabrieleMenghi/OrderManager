import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { HomeComponent } from './components/home/home.component';
import { ImportComponent } from './components/import/import.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { OrdiniComponent } from './components/ordini/ordini.component';
import { StoricoOrdiniComponent } from './components/storico-ordini/storico-ordini.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'prodotti',component:ProdottiComponent},
  {path:'import',component:ImportComponent},
  {path:'clienti',component:ClientiComponent},
  {path:'storico-ordini',component:StoricoOrdiniComponent},
  {path:'ordini/:id',component:OrdiniComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
