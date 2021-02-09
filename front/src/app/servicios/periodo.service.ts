import { Injectable } from '@angular/core';
import { Periodo } from '../modelos/periodo';
import {HttpClient,HttpErrorResponse,HttpHeaders }from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  selectedPeriodo: Periodo;
  periodo:Periodo[];

  optSelectedModal:string;

  readonly URL_API='http://localhost:3000/Inicio/Periodo';
  readonly URL_API_ultimoPrd='http://localhost:3000/Inicio/Periodo/ultimoPrd';

  constructor(private http: HttpClient) {
    this.selectedPeriodo=new Periodo();
   }

  getPeriodoUltimo(colCod:string){
    return this.http.get(this.URL_API_ultimoPrd + `/${colCod}`)
  }

  getPeriodoActual(prdAnio:string,colCod:string){
    return this.http.get(this.URL_API + `/${prdAnio}-${colCod}`)
   }

  getPeriodosColegio(colCod:string){
    return this.http.get(this.URL_API + `/${colCod}`)
   }

  postPeriodo(periodo:Periodo){
    return this.http.post(this.URL_API,periodo)
  }

  putPeriodo(periodo:Periodo){
    return this.http.put(this.URL_API+`/${periodo._id}`,periodo)
  }


}
