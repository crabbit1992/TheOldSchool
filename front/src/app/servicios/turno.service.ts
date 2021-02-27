import { Injectable } from '@angular/core';
import { Turno } from '../modelos/turno';
import {HttpClient }from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  selectedTurno: Turno;
  turno:Turno[];
  readonly URL_API='http://209.145.52.133:3000/Inicio/Turno';

  constructor(private http: HttpClient) {
    this.selectedTurno=new Turno();
   }

  getTurno(){
    return this.http.get(this.URL_API)
  }

  postTurno(turno:Turno){
    return this.http.post(this.URL_API,turno)
  }

  putTurno(turno:Turno){
    return this.http.put(this.URL_API + `/${turno._id}`,turno)
  }

  removeTurno(_id:string){
    return this.http.delete(this.URL_API + `/${_id}`)
  }
}
