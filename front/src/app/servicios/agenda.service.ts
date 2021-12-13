import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse }from '@angular/common/http'
import { Agenda } from '../modelos/agenda';


@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  readonly URL_API='http://localhost:3000/Inicio/Agenda';
  readonly URL_API_agendaCurso='http://localhost:3000/Inicio/Agenda/agendaCurso';

  constructor( private http: HttpClient ) { }

  //save agenda
  saveAgenda(agenda:Agenda) {
    return this.http.post<any>(this.URL_API, agenda);
  }

  // 
  getAgenda(idAgenda: string) {
  return this.http.get<any>(this.URL_API + `/${idAgenda}`);
  }

  getAgendas(alvCod: string, curCod: string) {
    return this.http.get<any>(this.URL_API_agendaCurso + `/${alvCod}-${curCod}`);
  }


  /************************************************************************************************ */


}
