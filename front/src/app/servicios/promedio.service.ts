import { Injectable } from '@angular/core';
import { Promedio } from '../modelos/promedio';
import {HttpClient }from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PromedioService {

  readonly URL_API='http://209.145.52.133:3000/Inicio/Promedio';
  readonly URL_API_MiPromedio='http://209.145.52.133:3000/Inicio/Promedio/PromCursosPorArea';

  /**Promedio Area */
  readonly URL_API_PromSgnNroClo='http://209.145.52.133:3000/Inicio/PromedioArea/PromSgnNroClo';
  readonly URL_API_LibretaPrd='http://209.145.52.133:3000/Inicio/PromedioArea/LibretaPrd';

  constructor(private http: HttpClient) { }

  GetPromedioAreaPorCurso(perRepCod:string, nroClo: string, areCod: string){
    return this.http.get(this.URL_API_MiPromedio+ `/${perRepCod}-${nroClo}-${areCod}`)
  }

  GetPromedioCiclo(alvCod: string, nroClo: string, curCod:string){
    return this.http.get(this.URL_API+ `/${alvCod}-${nroClo}-${curCod}`)
  }

  GetLibreta(perRepCod: string, prdCod: string){
    return this.http.get(this.URL_API_LibretaPrd+ `/${perRepCod}-${prdCod}`)
  }



  GetPromedioAreaCiclo(perRepCod: string, nroClo: string,){
    return this.http.get(this.URL_API_PromSgnNroClo+ `/${perRepCod}-${nroClo}`)
  }


 

}
