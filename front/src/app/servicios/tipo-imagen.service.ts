import { Injectable } from '@angular/core';

import { TipoImagen } from '../modelos/tipo-imagen';
import { HttpClient }from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoImagenService {

  readonly URL_API='http://209.145.52.133:3000/Inicio/tipoImagen';

  constructor(private http: HttpClient) { }

  getTipoImagen(){
    return this.http.get(this.URL_API)
  }

}
 