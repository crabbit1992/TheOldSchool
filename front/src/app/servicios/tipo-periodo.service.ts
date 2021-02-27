import { Injectable } from '@angular/core';
import { TipoPeriodo } from '../modelos/tipo-periodo';
import { HttpClient }from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class TipoPeriodoService {

  readonly URL_API='http://209.145.52.133:3000/Inicio/TipoPeriodo';

  constructor(private http: HttpClient) { }

  getTipoPeriodo(){
    return this.http.get(this.URL_API)
  }
}
