//Modulos Generales
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modulo Bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';



import { GrupoComponent } from './formularios/grupo/grupo.component';
import { BienvenidaComponent } from './formularios/bienvenida/bienvenida.component';
import { PendientesComponent } from './formularios/pendientes/pendientes.component';
import { FormsModule } from '../../node_modules/@angular/forms';

// Importar HttpClientModule
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    GrupoComponent,
    BienvenidaComponent,
    PendientesComponent
  ],
  imports: [
    //General
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //Bootstrap
    NgbModule, NgbPaginationModule, NgbAlertModule,
    //HTTP Cliente
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
