import { Injectable } from '@angular/core';
import { Evaluacion } from '../modelos/evaluacion';
import { Libro, GetLibro } from '../modelos/libro';
import { Tema, GetTema } from '../modelos/tema';

import {HttpClient }from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  readonly URL_API='http://localhost:3000/Inicio/evaluacion';
  readonly URL_API_getEvaluacionesHbl='http://localhost:3000/Inicio/evaluacion/getEvaluacionesHbl';

  libro:Libro=new Libro();
  tema:GetTema=new GetTema();

  constructor(private http: HttpClient) { }

  getEvaluacion(libCod :string, temCod :string){
    return this.http.get(this.URL_API + `/${libCod}-${temCod}`);
  };

  getEvaluacionesHbl(libCod :string, temCod :string){
    return this.http.get(this.URL_API_getEvaluacionesHbl + `/${libCod}-${temCod}`);
  };
  
  postEvaluacion(evaluacion:Evaluacion){
    return this.http.post(this.URL_API, evaluacion);
  };

  putEvaluacion(evaluacion:Evaluacion){
    return this.http.put(this.URL_API + `/${evaluacion._id}`,evaluacion)
  };

  removeEvaluacion(id:string, idNota:string){
    return this.http.delete(this.URL_API + `/${id}-${idNota}`);
  };


}
