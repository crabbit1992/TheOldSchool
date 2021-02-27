import { Injectable } from '@angular/core';
import { Grado } from '../modelos/grado';
import {HttpClient }from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GradoService {

  selectedGrado: Grado;
  grados:Grado[];
  readonly URL_API='http://209.145.52.133:3000/Inicio/Grado';

  constructor(private http: HttpClient) {

    this.selectedGrado=new Grado();

   }

  getGrados(){
    return this.http.get(this.URL_API)
  }

  postGrado(grado:Grado){
    return this.http.post(this.URL_API,grado)
  }

  putGrado(grado:Grado){
    return this.http.put(this.URL_API + `/${grado._id}`,grado)
  }

  removeGrado(_id:string){
    return this.http.delete(this.URL_API + `/${_id}`)
  }

}
