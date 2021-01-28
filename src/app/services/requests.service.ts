import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpleadoModel } from '../models/empleado.model';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  endPoint = environment.endpoint;

  constructor(private http: HttpClient) { }
  /* se coloca .json para indicarle a firebase que queremos utilizar el RESTful API */
  crearEmpleado(empleado: EmpleadoModel) {
    return this.http.post(`${ this.endPoint }/empleados.json`, empleado)
          .pipe(
            map( (resp: any) => {
              empleado.id = resp.name;
              return empleado;
            })
          );
  }

  actualizarEmpleado(empleado: EmpleadoModel) {
    const temp = {
      ... empleado
    };
    delete temp.id;
    return this.http.put(`${ this.endPoint }/empleados/${empleado.id}.json`, empleado);
  }

  getEmpleados() {
      return this.http.get(`${ this.endPoint }/empleados.json`)
      .pipe( map( this.crearArreglo));
  }

  crearArreglo(empleadosObj: object) {
    if (empleadosObj === null) { return []; }
    const empleados: EmpleadoModel[] = [];
    Object.keys( empleadosObj).forEach(key =>{
      const empleado: EmpleadoModel = empleadosObj[key];
      empleado.id = key;
      empleados.push(empleado);
    });

    return empleados;
  }

  getEmpleadoPorId(id: string) {
    return this.http.get(`${ this.endPoint }/empleados/${id}.json`);
  }

  borrarEmpleado(id: string) {
    return this.http.delete(`${ this.endPoint }/empleados/${id}.json`);
  }
}
