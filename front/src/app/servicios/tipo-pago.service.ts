import { Injectable } from '@angular/core';
import { TipoPago } from '../modelos/tipo-pago';
import { HttpClient }from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {

  readonly URL_API='http://209.145.52.133:3000/Inicio/TipoPago';

  constructor(private http: HttpClient) { }

  getTipoPagos(colCod:string){
    return this.http.get(this.URL_API+ `/${colCod}`);
  }

  postTipoPago(tipoPago:TipoPago){
    return this.http.post(this.URL_API, tipoPago);
  }

  editTipoPago(tipoPago : TipoPago){
    return this.http.put(this.URL_API + `/${tipoPago._id}`,tipoPago);
  }

  deleteTipoPago(_id:string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}

