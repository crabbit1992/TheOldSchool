import { Injectable } from '@angular/core';
import { Perfil } from '../modelos/perfil';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {HttpClient,HttpErrorResponse,HttpHeaders }from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  selectedPerfil: Perfil;
  perfiles:Perfil[];

  sendCargo:string;

  readonly URL_API='http://localhost:3000/Inicio/Perfil';
  readonly URL_API_DeshabilitarPerfil='http://localhost:3000/Inicio/Perfil/DeshabilitarPerfil';
  readonly URL_API_HabilitarPerfil='http://localhost:3000/Inicio/Perfil/HabilitarPerfil';
  readonly URL_API_getPlfSegunCargo='http://localhost:3000/Inicio/Perfil/getPlfSegunCargo';
  readonly URL_API_listPfl='http://localhost:3000/Inicio/Perfil/listPfl';
  
  objeto:string;

  opcBarraModalSelected:string="";

  constructor(private http: HttpClient) {
    this.selectedPerfil=new Perfil();
   }

   guardarTemporal(object: string){
    this.objeto=object;
    console.log(this.objeto);
   }

   getPerfilColegio(perRepCod:string) {
     
    return this.http.get(this.URL_API + `/${perRepCod}`) 
  }

  getPerfilUsuarioColegio(perRepCod:string,colCod:string) {
    console.log(perRepCod + colCod);
    return this.http.get(this.URL_API + `/${perRepCod}-${colCod}`)
  }

  getListaPerfiles(perRepCod:String) {
    return this.http.get(this.URL_API_listPfl + `/${perRepCod}`)
  }
 
  getPerfilesColegio(colCod:string){
    return this.http.get('http://localhost:3000/Inicio/Perfil/perCol' + `/${colCod}`)
  }

  DeshabilitarPerfil(objetoDeshabilitar:object){
    return this.http.post(this.URL_API_DeshabilitarPerfil,objetoDeshabilitar)
  }

  HabilitarPerfil(objetoHabilitar:object){
    return this.http.post(this.URL_API_HabilitarPerfil,objetoHabilitar)
  }

  getPlfSegunCargo(objetoCargo:object){
    return this.http.post(this.URL_API_getPlfSegunCargo,objetoCargo)
  }

 
}
