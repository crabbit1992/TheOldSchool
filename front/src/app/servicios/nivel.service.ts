import { Injectable } from '@angular/core';
import { Nivel } from '../modelos/nivel';
import {HttpClient }from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class NivelService {
  selectedNivel: Nivel;
  nivel:Nivel[];
  readonly URL_API='http://localhost:3000/Inicio/Nivel';

  constructor(private http: HttpClient) {
    this.selectedNivel=new Nivel();
  }

  getNivel(){
    return this.http.get(this.URL_API)
  }

  postNivel(nivel:Nivel){
    return this.http.post(this.URL_API,nivel)
  }

  putNivel(nivel:Nivel){
    return this.http.put(this.URL_API + `/${nivel._id}`,nivel)
  }

  removeNivel(_id:string){
    return this.http.delete(this.URL_API + `/${_id}`)
  }

}
