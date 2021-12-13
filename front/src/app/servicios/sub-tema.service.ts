import { Injectable } from '@angular/core';
import { Subtema } from '../modelos/subtema';
import {HttpClient }from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SubTemaService {

  readonly URL_API='http://localhost:3000/Inicio/SubTema';

  constructor(private http: HttpClient) { }

  getSubTema(temCod :string, libCod :string){
    return this.http.get(this.URL_API + `/${temCod}-${libCod}`);
  }

  postSubTema( subtema: Subtema,image: File) {
    const fd = new FormData();

    fd.append('libCod', subtema.libCod);
    fd.append('temCod', subtema.temCod);
    fd.append('nroOrd', subtema.nroOrd);
    fd.append('subTemTtl', subtema.subTemTtl);
    fd.append('subTemDes', subtema.subTemDes);
    fd.append('image', image);

    return this.http.post(this.URL_API,fd);
  }

  putSubTema(subtema:Subtema,image: File){

    const fd = new FormData();

    fd.append('libCod', subtema.libCod);
    fd.append('temCod', subtema.temCod);
    fd.append('nroOrd', subtema.nroOrd);
    fd.append('subTemTtl', subtema.subTemTtl);
    fd.append('subTemDes', subtema.subTemDes);
    fd.append('image', image);

    return this.http.put(this.URL_API + `/${subtema._id}`,fd);
  }

  removeSubTema(_id:string){
    return this.http.delete(this.URL_API + `/${_id}`)
  }

}
