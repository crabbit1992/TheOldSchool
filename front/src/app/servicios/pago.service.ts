import { Injectable } from '@angular/core';
import { Pago } from '../modelos/pago';
import { HttpClient }from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PagoService {

  optPago:string="";
  optPagoSelected:string="";

  readonly URL_API='http://localhost:3000/Inicio/Pago';
  readonly URL_API_filterPago='http://localhost:3000/Inicio/Pago/filterPago';
  readonly URL_API_getPagoUser='http://localhost:3000/Inicio/Pago/getPagoUser';

  constructor(private http: HttpClient) { }

  getPagos(colCod:string){
    return this.http.get(this.URL_API+ `/${colCod}`)
  }
  
  filterPago(id:string, colCod:string){
    return this.http.get(this.URL_API_filterPago+ `/${id}-${colCod}`)
  }

  getPagoUser(pgoPerAso:string, colCod:string){
    return this.http.get(this.URL_API_getPagoUser+ `/${pgoPerAso}-${colCod}`)
  }
  

  postPago(pago:Pago){
    return this.http.post(this.URL_API,pago)
  }

}
