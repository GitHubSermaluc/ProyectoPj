import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoComponent } from './formularios/grupo/grupo.component';
import { BienvenidaComponent } from './formularios/bienvenida/bienvenida.component';
import { PendientesComponent } from './formularios/pendientes/pendientes.component';

const routes: Routes = [
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'pendientes', component: PendientesComponent },
  { path: 'grupo', component: GrupoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
