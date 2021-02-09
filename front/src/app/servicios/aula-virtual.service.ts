import { Injectable } from '@angular/core';
import {HttpClient }from '@angular/common/http'

import { AulaVirtual,GetAulaVirtual } from '../modelos/aula-virtual';



@Injectable({
  providedIn: 'root'
})
export class AulaVirtualService {

  OptSelected:string;
  ObjFltSeleccionados:object;

  constructor(private http: HttpClient) { }

  readonly URL_API='http://localhost:3000/Inicio/AulaVirtual';
  readonly URL_API_RegAulVir='http://localhost:3000/Inicio/AulaVirtual/RegAulVir';
  readonly URL_API_HabilitarAula='http://localhost:3000/Inicio/AulaVirtual/HabilitarAula';
  readonly URL_API_DeshabilitarAulasss='http://localhost:3000/Inicio/AulaVirtual/DeshabilitarAula';

  getAulasVirtCol(colCod :string){
    return this.http.get(this.URL_API + `/${colCod}`)
  }

  postObtenerAulas(objParametros:object){
    return this.http.post(this.URL_API,objParametros);
  }

  CreateAulVir( aulaVirtual:AulaVirtual){
    return this.http.post(this.URL_API_RegAulVir,aulaVirtual);
  }

  putAula( aulaVirtual:AulaVirtual){
    console.log("entro al servicio edit");
    return this.http.put(this.URL_API + `/${aulaVirtual._id}`,aulaVirtual)
  }

  habilitarAula(aulaVirtual:GetAulaVirtual){
    return this.http.post(this.URL_API_HabilitarAula, aulaVirtual);

  }

  deshabilitarAula(aulaVirtual:GetAulaVirtual){
    return this.http.post(this.URL_API_DeshabilitarAulasss, aulaVirtual);
  }

}
