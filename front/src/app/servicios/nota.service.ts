import { Injectable } from '@angular/core';
import { Nota } from '../modelos/nota';
import {HttpClient }from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class NotaService {

  readonly URL_API='http://localhost:3000/Inicio/Nota';
  readonly URL_API_hstSgnTpoNta='http://localhost:3000/Inicio/Nota/hst';

  constructor(private http: HttpClient) { }

  opcionElegida: {};

  postNota(nota:Nota){
    return this.http.post(this.URL_API,nota)
  }

  deleteNota(id: string){
    return this.http.delete(this.URL_API + `/${id}`)
  }

  getDetNotasSegunTipo(perRepCod:string,curCod:string, nroClo:string){
    return this.http.get(this.URL_API +`/${perRepCod}-${curCod}-${nroClo}`)
  }

  getHstSgnTpoNta(perRepCod:string,tpoNotCurCod:string,nroClo:string){
    return this.http.get(this.URL_API_hstSgnTpoNta +`/${perRepCod}-${tpoNotCurCod}-${nroClo}`)
  }


}
