import { Injectable } from '@angular/core';
import { EvaluacionTema } from '../modelos/evaluacion-tema';
import {HttpClient }from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EvaluacionTemaService {

  readonly URL_API='http://localhost:3000/Inicio/evaluacionTema';
  readonly URL_API_evaAluNota='http://localhost:3000/Inicio/evaluacionTema/evaAluNota';
  readonly URL_API_getEvaTemAula='http://localhost:3000/Inicio/evaluacionTema/getEvaTemAula';

  constructor(private http: HttpClient) { }

  getEvaluacionTema(temCod :string, prdCod :string){
    return this.http.get(this.URL_API + `/${temCod}-${prdCod}`);
  };

  getEvaTemAula(objEvaTemAula:object){
    return this.http.post(this.URL_API_getEvaTemAula, objEvaTemAula);
  };

  getEvaAluNota(prdCod :string,temCod :string,  perRepCod :string){
    return this.http.get(this.URL_API_evaAluNota + `/${prdCod}-${temCod}-${perRepCod}`);
  };
  
  postEvaluacionTema(evaluacionTema:EvaluacionTema){
    return this.http.post(this.URL_API, evaluacionTema);
  };

  removeEvaluacionTema(id:string, idNota:string){
    return this.http.delete(this.URL_API + `/${id}-${idNota}`);
  };

}
