import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import * as CryptoJS from 'crypto-js';

import { 
    NucleoImg,
    NucleoPortada,
    NucleoArea,
    NucleoCurso, 
    NucleoCurricula } from '../modelos/mnt-admin-crabb';


@Injectable({
  providedIn: 'root'
})
export class MntAdminCrabbService {

  readonly URL_API_NucleoImagen='http://209.145.52.133:3000/MntAdmin_crabb/NucleoImagen';
  readonly URL_API_NucleoPortada='http://209.145.52.133:3000/MntAdmin_crabb/NucleoPortada';
  readonly URL_API_NucleoArea='http://209.145.52.133:3000/MntAdmin_crabb/NucleoArea';
  readonly URL_API_NucleoCurso='http://209.145.52.133:3000/MntAdmin_crabb/NucleoCurso';
  readonly URL_API_NucleoCurricula='http://209.145.52.133:3000/MntAdmin_crabb/NucleoCurricula';

  readonly pass= "siddharta53";

  constructor(private http: HttpClient) { }

  encript(dat : string):string{

    console.log(dat);
    //console.log("este es el pass : " + pass);
    const dato= dat.toString();

    const pass=this.pass

    console.log(dato);
    console.log("Este es el pass : "+pass);


    const datEncript= CryptoJS.AES.encrypt(dato.trim(),pass.trim()).toString();

    return datEncript;

  }

  decript(dat : string):string{

    console.log(dat);
    //console.log("este es el pass : " + pass);
    const dato= dat.toString();

    const pass=this.pass

    console.log(dato);
    console.log("Este es el pass : "+pass);


    const datEncript= CryptoJS.AES.decrypt(dato.trim(),pass.trim()).toString(CryptoJS.enc.Utf8);

    return datEncript;

  }




    /** Servicios de Nucleo Imagen */

  createFoto(titulo: string, descripcion: string,image: File) {
    const fd = new FormData();

    console.log("Lado de el servicio")
    console.log(titulo);
    console.log(descripcion);
    console.log(image);

    fd.append('ncoImgTtl', titulo);
    fd.append('ncoImgDes', descripcion);
    fd.append('image', image);
    console.log(fd);
    return this.http.post(this.URL_API_NucleoImagen, fd);
  }

  getNucleoImagenes(){
    return this.http.get(this.URL_API_NucleoImagen);
  }

  editFoto(imagen: NucleoImg){
    return this.http.put(this.URL_API_NucleoImagen + `/${imagen._id}`,imagen)
  }

  eliminarFoto(id: string){
    return this.http.delete(this.URL_API_NucleoImagen + `/${id}`)
  }

  /** Servicios de Nucleo Portada */

  getPortadas(){
    return this.http.get(this.URL_API_NucleoPortada)
  }

  postPortada(nucleoPortada:NucleoPortada){
    return this.http.post(this.URL_API_NucleoPortada,nucleoPortada)
  }

  putPortada(nucleoPortada:NucleoPortada){
    return this.http.put(this.URL_API_NucleoPortada + `/${nucleoPortada._id}`,nucleoPortada)
  }

  deletePortada(_id){
    return this.http.delete(this.URL_API_NucleoPortada + `/${_id}`)
  }

  /** Servicios de Nucleo Area*/
   getAreas(){
    return this.http.get(this.URL_API_NucleoArea)
  }

  postArea(nucleoArea:NucleoArea){
    return this.http.post(this.URL_API_NucleoArea,nucleoArea)
  }

  putArea(nucleoArea:NucleoArea){
    return this.http.put(this.URL_API_NucleoArea + `/${nucleoArea._id}`,nucleoArea)
  }

  deleteArea(_id){
    return this.http.delete(this.URL_API_NucleoArea + `/${_id}`)
  }


  /** Servicios de Nucleo Curso*/
  getCursos(){
    return this.http.get(this.URL_API_NucleoCurso)
  }

  getCursosArea(areCod:string,){
    return this.http.get(this.URL_API_NucleoCurso  + `/${areCod}`)
  }

  postCurso(nucleoCurso:NucleoCurso){
    return this.http.post(this.URL_API_NucleoCurso,nucleoCurso)
  }

  putCurso(nucleoCurso:NucleoCurso){
    return this.http.put(this.URL_API_NucleoCurso + `/${nucleoCurso._id}`,nucleoCurso)
  }

  deleteCurso(_id){
    return this.http.delete(this.URL_API_NucleoCurricula + `/${_id}`)
  }

  /** Servicios de Nucleo Curricula*/
  getCuriculaPrd(prd:string){
    return this.http.get(this.URL_API_NucleoCurricula  + `/${prd}`)
  }
  getCuriculaPrdAreCod(prd:string,areCod:string){

    const objectCurricula= {
      prd:prd,
      areCod:areCod
    }

    return this.http.post(this.URL_API_NucleoCurricula+'/getByAreCod',objectCurricula)
  }

  postCurricula(nucleoCurricula:NucleoCurricula){
    return this.http.post(this.URL_API_NucleoCurricula,nucleoCurricula)
  }

  putCurricula(nucleoCurricula:NucleoCurricula){
    return this.http.put(this.URL_API_NucleoCurricula + `/${nucleoCurricula._id}`,nucleoCurricula)
  }

  deleteCurricula(_id){
    return this.http.delete(this.URL_API_NucleoCurricula + `/${_id}`)
  }


}
