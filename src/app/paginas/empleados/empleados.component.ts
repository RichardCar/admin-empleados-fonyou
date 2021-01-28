import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { EmpleadoModel } from 'src/app/models/empleado.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: EmpleadoModel[] = [];
  cargando = false;

  constructor(private requestService: RequestsService) { }

  ngOnInit() {
    this.cargando = true;
    this.requestService.getEmpleados().subscribe(resp => {
      console.log(resp);
      this.empleados = resp;
      this.cargando = false;
    });
  }

  borrarEmpleado(empleado: EmpleadoModel, index: number) {
    Swal.fire({
      title: '¿Está seguro?',
      icon: 'question',
      text: `Está seguro que desea borrar a ${empleado.nombre}`,
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if (resp.value) {
        this.requestService.borrarEmpleado(empleado.id).subscribe( resp => {
          this.empleados.splice(index, 1);
        });
      }
    }
    );
  }

}
