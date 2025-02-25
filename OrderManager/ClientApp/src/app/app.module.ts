import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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
import { StoricoOrdiniComponent } from './components/storico-ordini/storico-ordini.component';
import { ModaleModificaProdottoComponent } from './components/modali/modale-modifica-prodotto/modale-modifica-prodotto.component';
import { ModaleEliminaProdottoComponent } from './components/modali/modale-elimina-prodotto/modale-elimina-prodotto.component';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './config/interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, ProdottiComponent, HomeComponent, ImportComponent, ClientiComponent, OrdiniComponent, StoricoOrdiniComponent, ModaleModificaProdottoComponent, ModaleEliminaProdottoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    SidebarComponent,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' })
  ],
  providers: [
    provideClientHydration(), 
    provideAnimationsAsync(), 
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
