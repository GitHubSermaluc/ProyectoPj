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

//Grillas
import { AgGridModule } from 'ag-grid-angular';


//Editor Numerico Grilla
import { NumericEditorComponent } from './functiones/numeric-editor.component';
import { CheckboxCellComponent } from './functiones/checkbox-cell.component';
import { NumberEditorComponent } from './functiones/number-editor.component';



@NgModule({
  declarations: [
    AppComponent,
    GrupoComponent,
    BienvenidaComponent,
    PendientesComponent,
    NumericEditorComponent,
    CheckboxCellComponent,
    NumberEditorComponent,
    
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
    //Grillas
    AgGridModule.withComponents([NumericEditorComponent, CheckboxCellComponent, NumberEditorComponent])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
