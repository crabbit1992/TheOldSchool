import { Injectable } from '@angular/core';
import { Curso } from '../modelos/curso';
import {HttpClient }from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  readonly URL_API='http://209.145.52.133:3000/Inicio/Curso';
  readonly URL_API_GetCurso='http://209.145.52.133:3000/Inicio/Curso/GetCurso';
  
  constructor(private http: HttpClient) { }

  getCursosCol(colCod:string){
    return this.http.get(this.URL_API + `/${colCod}`)
  }

  getCurso(objCurso:object){
    return this.http.post(this.URL_API_GetCurso,objCurso)
  }

  postCurso(curso:Curso){
    return this.http.post(this.URL_API,curso)
  }

  putCurso(curso:Curso){
    return this.http.put(this.URL_API + `/${curso._id}`,curso)
  }
}
