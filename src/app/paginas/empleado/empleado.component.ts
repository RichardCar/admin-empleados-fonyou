import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmpleadoModel } from 'src/app/models/empleado.model';
import { RequestsService } from 'src/app/services/requests.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  empleado: EmpleadoModel = new EmpleadoModel();

  constructor(private requestService: RequestsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const id =  this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.requestService.getEmpleadoPorId(id).subscribe((resp: EmpleadoModel) => {
        if (resp !== null) {
          this.empleado = resp;
          this.empleado.id = id;
        } else {
          this.router.navigate(['/empleados']);
        }
        
      });
    }
  }

  Guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Form inválido');
      return;
    }
    console.log(form);
    console.log(this.empleado);

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      allowOutsideClick: false,
      icon: 'info'
    });
    Swal.showLoading();

    let peticion: Observable<any>;
    if (this.empleado.id) {
      peticion =  this.requestService.actualizarEmpleado(this.empleado);
    } else {
      peticion = this.requestService.crearEmpleado(this.empleado);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.empleado.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
    });
  }

}
