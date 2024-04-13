import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { MaterialModule } from './material-module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImportComponent } from './components/import/import.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ClientiComponent } from './components/clienti/clienti.component';
import { OrdiniComponent } from './components/ordini/ordini.component';

@NgModule({
  declarations: [AppComponent, ProdottiComponent, HomeComponent, ImportComponent, ClientiComponent, OrdiniComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    SidebarComponent,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
