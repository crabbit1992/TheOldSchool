import { Injectable } from '@angular/core';
import {HttpClient }from '@angular/common/http';

import { Colegio } from '../modelos/colegio';

@Injectable({
  providedIn: 'root'
})
export class ColegioService {

  UrlOrRedirect:number=0;

  readonly URL_API='http://209.145.52.133:3000/Inicio/Colegio';

  constructor(private http: HttpClient) { }

  getColegios(){
    return this.http.get(this.URL_API)
  }

  getColegio(colUrl:string){
    return this.http.get(this.URL_API+ `/${colUrl}`)
  }

  postColegio(colegio:Colegio){
    return this.http.post(this.URL_API,colegio)
  }

  putColegio(colegio:Colegio){
    return this.http.put(this.URL_API + `/${colegio._id}`,colegio)
  }


  


} 
