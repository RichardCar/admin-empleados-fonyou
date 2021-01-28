import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadoComponent } from './paginas/empleado/empleado.component';
import { EmpleadosComponent } from './paginas/empleados/empleados.component';

const routes: Routes = [
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'empleado/:id', component: EmpleadoComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'empleados'}

];

@NgModule({
  imports: [ RouterModule.forRoot( routes )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
