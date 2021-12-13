import { Injectable } from '@angular/core';
import { HistorialRegistro } from '../modelos/historial-registro';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {HttpClient,HttpErrorResponse,HttpHeaders }from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HistorialRegistroService {
  selectedHistoria: HistorialRegistro;
  HistoriaRegistros:HistorialRegistro[];
  readonly URL_API='http://localhost:3000/Inicio/HistorialRegistro';
  constructor(private http: HttpClient) {
    this.selectedHistoria=new HistorialRegistro();
   }

  getHistorias(): Observable<HistorialRegistro[]> {
    return this.http.get<HistorialRegistro[]>(this.URL_API)
  }

  postHistoria(historia:HistorialRegistro){
    return this.http.post(this.URL_API,historia)
  }
}
