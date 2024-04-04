import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { HomeComponent } from './components/home/home.component';
import { ImportComponent } from './components/import/import.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'prodotti',component:ProdottiComponent},
  {path:'import',component:ImportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
