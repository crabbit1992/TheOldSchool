import { Injectable } from '@angular/core';
import { Tema } from '../modelos/tema';
import {HttpClient }from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  readonly URL_API='http://localhost:3000/Inicio/Tema';

  readonly URL_API_AddEvaTema='http://localhost:3000/Inicio/Tema/addEvaTema';
  readonly URL_API_DeleteEvaTema='http://localhost:3000/Inicio/Tema/deleteEvaTema';

  constructor(private http: HttpClient) { }

  getTema(libCod :string){
    return this.http.get(this.URL_API + `/${libCod}`);
  }
  
  postTema(tema:Tema){
    return this.http.post(this.URL_API, tema)
  }

  putTema(tema:Tema){
    return this.http.put(this.URL_API + `/${tema._id}`,tema)
  }

  deleteTema(_id:string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }

  /***************************************************** */

  putAddEvaTema(tema:Tema){
    return this.http.put(this.URL_API_AddEvaTema + `/${tema._id}`,tema)
  }
  putDeleteEvaTema(tema:Tema){
    return this.http.put(this.URL_API_DeleteEvaTema + `/${tema._id}`,tema)
  }


}
