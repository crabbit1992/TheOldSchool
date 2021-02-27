import { Injectable } from '@angular/core';
import { AulaCurso } from '../modelos/aula-curso';
import { HttpClient }from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AulaCursoService {

  readonly URL_API='http://209.145.52.133:3000/Inicio/AulaCurso';
  readonly URL_API_MisCursos='http://209.145.52.133:3000/Inicio/AulaCurso/MisCursos';
  readonly URL_API_editDocenteCurso='http://209.145.52.133:3000/Inicio/AulaCurso/editDocenteCurso';
  readonly URL_API_CursosAula='http://209.145.52.133:3000/Inicio/AulaCurso/CursosAula';
  readonly URL_API_DocenteCurso='http://209.145.52.133:3000/Inicio/AulaCurso/DocenteCurso';
  readonly URL_API_AulasDocente='http://209.145.52.133:3000/Inicio/AulaCurso/AulasDocente';
  readonly URL_API_CursosAulaDocente='http://209.145.52.133:3000/Inicio/AulaCurso/CursosAulaDocente';
  readonly URL_API_DocentesPorAula='http://209.145.52.133:3000/Inicio/AulaCurso/DocentesPorAula';

  constructor(private http: HttpClient) { }

  getMisCursos(perRepCod: string){
    return this.http.get(this.URL_API_MisCursos + `/${perRepCod}`)
  }

  getCursosAula(aulVirCod:string, prdCod: string){
    return this.http.get(this.URL_API_CursosAula + `/${aulVirCod}-${prdCod}`)
  }

  getAulasDocente(colCod:string, prfCod:string){
    return this.http.get(this.URL_API_AulasDocente + `/${colCod}-${prfCod}`)
  }

  getCursosAulaDocente(aulVirCod: string, prfCod: string, colCod: string){
    return this.http.get(this.URL_API_CursosAulaDocente + `/${aulVirCod}-${prfCod}-${colCod}`)
  }

  getDocentesPorAula(aulVirCod: string, prdCod: string){
    return this.http.get(this.URL_API_DocentesPorAula + `/${aulVirCod}-${prdCod}`)
  }

  getDocenteCurso(aulVirCod: string, curCod: string){ // Modificar
    return this.http.get(this.URL_API_DocenteCurso + `/${aulVirCod}-${curCod}`)
  }


  postCurso(aulaCurso:AulaCurso){
    return this.http.post(this.URL_API,aulaCurso)
  }

  putCurso(aulaCurso:AulaCurso){
    return this.http.put(this.URL_API_editDocenteCurso + `/${aulaCurso._id}`,aulaCurso)
  }
 
}
