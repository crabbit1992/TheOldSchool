import { Injectable } from '@angular/core';
import { Matricula } from '../modelos/matricula';
import {HttpClient }from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  selectedMatricula: Matricula;
  matricula:Matricula[];

  OptSelected:string;
  ObjFltSeleccionados:object;


  readonly URL_API='http://209.145.52.133:3000/Inicio/Matricula';
  readonly URL_API_MatriculasAlu='http://209.145.52.133:3000/Inicio/Matricula/AluPorAula';
  readonly URL_API_GetMatriculas='http://209.145.52.133:3000/Inicio/Matricula/GetMatriculas'; 
  readonly URL_API_MisMatriculas='http://209.145.52.133:3000/Inicio/Matricula/MisMatriculas'; 


  constructor(private http: HttpClient) { 
    this.selectedMatricula=new Matricula();
  }

  getMatriculasCol(colCod :string,prdCod:string){
    return this.http.get(this.URL_API + `/${colCod}-${prdCod}`)
  }

  getMatriculasColAlum(colCod :string,aluCod:string){
    return this.http.get(this.URL_API + `/${aluCod}-${colCod}`)
  }

  getMisMatriculas(perRepCod:string){
    return this.http.get(this.URL_API_MisMatriculas + `/${perRepCod}`);
  }

  getAlumnosPorAula(colCod :string, graCod:string,  nivCod :string, secCod:string, turCod:string){
    console.log(colCod);
    console.log(graCod);
    console.log(nivCod);
    console.log(secCod);
    return this.http.get(this.URL_API_MatriculasAlu + `/${colCod}-${graCod}-${nivCod}-${secCod}-${turCod}`)
  }

  postMatricula(matricula:Matricula){
    return this.http.post(this.URL_API,matricula)
  }

  postObtenerMatriculas(objParametros:object){
    return this.http.post(this.URL_API_GetMatriculas,objParametros)
  }

  putMatricula(matricula:Matricula){
    return this.http.put(this.URL_API + `/${matricula._id}`,matricula)
  }

  removeMatricula(_id:string){
    return this.http.delete(this.URL_API + `/${_id}`)
  }

}
