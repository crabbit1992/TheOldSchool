import { Injectable } from '@angular/core';
import { Pago } from '../modelos/pago';
import { HttpClient }from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PagoService {

  optPago:string="";
  optPagoSelected:string="";

  readonly URL_API='http://209.145.52.133:3000/Inicio/Pago';
  readonly URL_API_filterPago='http://209.145.52.133:3000/Inicio/Pago/filterPago';

  constructor(private http: HttpClient) { }

  getPagos(colCod:string){
    return this.http.get(this.URL_API+ `/${colCod}`)
  }
  
  filterPago(id:string, colCod:string){
    return this.http.get(this.URL_API_filterPago+ `/${id}-${colCod}`)
  }

  postPago(pago:Pago){
    return this.http.post(this.URL_API,pago)
  }

}
