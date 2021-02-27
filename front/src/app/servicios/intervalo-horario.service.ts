import { Injectable } from '@angular/core';
import { IntervaloHorario } from '../modelos/intervalo-horario';
import {HttpClient }from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class IntervaloHorarioService {

  readonly URL_API='http://209.145.52.133:3000/Inicio/IntervaloHorario';

  constructor(private http: HttpClient) { }

  getIntervaloHorario(colCod:string){
    return this.http.get(this.URL_API + `/${colCod}`)
  }

  postIntervaloHorario(intervaloHorario:IntervaloHorario){
    return this.http.post(this.URL_API,intervaloHorario)
  }

  putIntervaloHorario(intervaloHorario:IntervaloHorario){
    return this.http.put(this.URL_API + `/${intervaloHorario._id}`,intervaloHorario)
  }

}
