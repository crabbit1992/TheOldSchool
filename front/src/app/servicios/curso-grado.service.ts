import { Injectable } from '@angular/core';
import { CursoGrado } from '../modelos/curso-grado';
import { HttpClient }from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursoGradoService {

  readonly URL_API='http://209.145.52.133:3000/Inicio/CursoGrado';
  readonly URL_API_GetCursoGrado='http://209.145.52.133:3000/Inicio/CursoGrado/GetCursoGrado';

  ObjFltSeleccionados:object;

  constructor(private http: HttpClient) { }

  getCursosGrado(colCod:string, graCod: string, nivCod:string){
    return this.http.get(this.URL_API + `/${colCod}-${nivCod}-${graCod}`);
  }

  getCursoGrado(objCursoGrado: object){
    return this.http.post(this.URL_API_GetCursoGrado,objCursoGrado);
  }

  getCursosGradoCol(colCod:string){
    return this.http.get(this.URL_API + `/${colCod}`);
  }

  postCursoGrado(cursoGrado:CursoGrado){
    return this.http.post(this.URL_API,cursoGrado);
  }

  putCurso(cursoGrado:CursoGrado){
    return this.http.put(this.URL_API + `/${cursoGrado._id}`,cursoGrado);
  }

  deleteCursoGrado(_id){
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
