import { Injectable } from '@angular/core';
import { HttpClient }from '@angular/common/http';

/* Modelos */
import { TipoNotaCurso } from '../modelos/tipo-nota-curso';

@Injectable({
  providedIn: 'root'
})
export class TipoNotaCursoService {

  readonly URL_API='http://localhost:3000/Inicio/TipoNotaCurso';

  constructor(private http: HttpClient) { }

  postTipoNota(tipoNotaCurso : TipoNotaCurso){
    return this.http.post(this.URL_API,tipoNotaCurso);
  }

  getTipoNota(aulVirCod:string, curCod:string, colCod:string){
    return this.http.get(this.URL_API + `/${aulVirCod}-${curCod}-${colCod}`);
  }

  editTipoNota(tipoNotaCurso : TipoNotaCurso){
    return this.http.put(this.URL_API + `/${tipoNotaCurso._id}`,tipoNotaCurso);
  }

  deleteTipoNota(_id:string){
    return this.http.delete(this.URL_API + `/${_id}`)
  }

}
