import { Injectable } from '@angular/core';
import { Seccion } from '../modelos/seccion';
import {HttpClient }from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  selectedSeccion: Seccion;
  seccion:Seccion[];
  readonly URL_API='http://localhost:3000/Inicio/Seccion';

  constructor(private http: HttpClient) {
    this.selectedSeccion=new Seccion();
   }

   getSeccion(){
    return this.http.get(this.URL_API)
  }

  postSeccion(seccion:Seccion){
    return this.http.post(this.URL_API,seccion)
  }

  putSeccion(seccion:Seccion){
    return this.http.put(this.URL_API + `/${seccion._id}`,seccion)
  }

  removeSeccion(_id:string){
    return this.http.delete(this.URL_API + `/${_id}`)
  }

}
