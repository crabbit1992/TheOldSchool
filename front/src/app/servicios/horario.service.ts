import { Injectable } from '@angular/core';
import { Horario } from '../modelos/horario';
import {HttpClient }from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  readonly URL_API='http://localhost:3000/Inicio/Horario';
  readonly URL_API_putHorario='http://localhost:3000/Inicio/Horario/putHorario';
  readonly URL_API_deleteHorario='http://localhost:3000/Inicio/Horario/deleteHorario';
  
  
  constructor(private http: HttpClient) { }

  getHorario(colCod:string, alvCod:string){
    return this.http.get(this.URL_API + `/${colCod}-${alvCod}`);
  }


  createHorario(horario:Horario){
    return this.http.post(this.URL_API,horario);
  }

  putHorario(horario:Horario){
    return this.http.post(this.URL_API_putHorario,horario);
  }

  removeHorario(horario:Horario){
    return this.http.post(this.URL_API_deleteHorario,horario);
  }
}
