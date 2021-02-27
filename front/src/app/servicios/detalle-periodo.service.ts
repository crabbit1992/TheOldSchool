import { Injectable } from '@angular/core';
import { DetallePeriodo } from '../modelos/detalle-periodo';
import {HttpClient }from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DetallePeriodoService {

  readonly URL_API='http://209.145.52.133:3000/Inicio/DetallePeriodo';
  readonly URL_API_GetCiclo='http://209.145.52.133:3000/Inicio/DetallePeriodo/GetCiclo';
  readonly URL_API_getDetPrdSegunFch='http://209.145.52.133:3000/Inicio/DetallePeriodo/getDetPrdSegunFch';

  constructor(private http: HttpClient) {
  }

  postDetallePeriodo(detallePeriodo:DetallePeriodo){
    return this.http.post(this.URL_API,detallePeriodo)
  }

  getDetallePeriodo(idPrd: string){
    return this.http.get(this.URL_API+ `/${idPrd}`)
  }

  getCiclo(idPrd: string){
    return this.http.get(this.URL_API_GetCiclo + `/${idPrd}`)
  }

  getDetPrdSegunFch(idPrd: string){
    return this.http.get(this.URL_API_getDetPrdSegunFch + `/${idPrd}`)
  }

  editDetallePeriodo(detPrd: DetallePeriodo){
    return this.http.put(this.URL_API + `/${detPrd._id}`,detPrd)
  }

  deleteDetallePeriodo(_id){
    return this.http.delete(this.URL_API + `/${_id}`)
  }




}
