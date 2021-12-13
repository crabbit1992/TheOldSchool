import { Injectable } from '@angular/core';
import { TipoNota } from '../modelos/tipo-nota';
import { HttpClient }from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoNotaService {

  readonly URL_API='http://localhost:3000/Inicio/TipoNota';

  constructor(private http: HttpClient) { }

  getTipoNota(){
    return this.http.get(this.URL_API)
  }
}
