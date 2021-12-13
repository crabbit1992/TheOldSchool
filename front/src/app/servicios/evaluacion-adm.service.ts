import { Injectable } from '@angular/core';
import {HttpClient }from '@angular/common/http'

import { EvaluacionAdm } from '../modelos/evaluacion-adm';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionAdmService {

  readonly URL_API='http://localhost:3000/Inicio/evaluacionAdm';

  constructor(private http: HttpClient) { }

  getEvaluacionAdm(libCod :string, temCod :string){
    return this.http.get(this.URL_API + `/${libCod}-${temCod}`);
  };
  

  putEvaluacionAdm(evaluacionAdm:EvaluacionAdm){
    return this.http.put(this.URL_API + `/${evaluacionAdm._id}`,evaluacionAdm)
  };
   
}
