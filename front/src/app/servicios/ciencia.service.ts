import { Injectable } from '@angular/core';
import { Ciencia } from '../modelos/ciencia';
import {HttpClient }from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CienciaService {
  selectedCiencia: Ciencia;
  ciencia:Ciencia[];

  readonly URL_API='http://localhost:3000/Inicio/Ciencia';
  readonly URL_API_GetCiencia='http://localhost:3000/Inicio/Ciencia/GetCiencia';

  constructor(private http: HttpClient) {}

  getCienciasCol(){
    return this.http.get(this.URL_API)
  }

  getCiencia(objCiencia: object){
    return this.http.post(this.URL_API_GetCiencia,objCiencia)
  }

  postCiencia(ciencia:Ciencia){
    return this.http.post(this.URL_API,ciencia)
  }

  putCiencia(ciencia:Ciencia){
    return this.http.put(this.URL_API + `/${ciencia._id}`,ciencia)
  }

/**   removeCiencia(_id:string){
    return this.http.delete(this.URL_API + `/${_id}`)
  }
*/

}
