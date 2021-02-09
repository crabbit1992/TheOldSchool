import { Injectable } from '@angular/core';
import {Administrador,Director,SubDirector,Profesor,Auxiliar,Alumno,Coordinador,Secretaria, Apoderado} from '../modelos/cargos';
import {HttpClient,HttpErrorResponse }from '@angular/common/http';
import { Observable, throwError, observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MantenimientoCargoService {
  selectedAdmin: Administrador;
  selectedDirec: Director;
  selectedSubDir: SubDirector;
  selectedCoordinador: Coordinador;
  selectedProf: Profesor;
  selectedAuxi: Auxiliar;
  selectedAlum: Alumno;

  Admin:Administrador[];
  Direc:Director[];
  SubDir:SubDirector[];
  Coordi:Coordinador[];
  Prof:Profesor[];
  Auxi:Auxiliar[];
  Alum:Alumno[];
  status: string;

  opcionSelected:string;

  readonly URL_API_ADMIN='http://localhost:3000/Inicio/Administrador';
  readonly URL_API_DIREC='http://localhost:3000/Inicio/Director';
  readonly URL_API_COORD='http://localhost:3000/Inicio/Coordinador';
  readonly URL_API_SUBDIREC='http://localhost:3000/Inicio/SubDirector';
  readonly URL_API_PROFESOR='http://localhost:3000/Inicio/Profesor';
  readonly URL_API_AUXI='http://localhost:3000/Inicio/Auxiliar';
  readonly URL_API_ALUM='http://localhost:3000/Inicio/Alumno';
  readonly URL_API_SECRE='http://localhost:3000/Inicio/Secretaria';

  readonly URL_API_APOD='http://localhost:3000/Inicio/Apoderado';
  readonly URL_API_asignarAprdo='http://localhost:3000/Inicio/Alumno/asignarAprdo';
  readonly URL_API_dltApo='http://localhost:3000/Inicio/Alumno/dltApo';
  readonly URL_API_getAlumnosApoderado='http://localhost:3000/Inicio/Alumno/getAlumnosApoderado';
  
  constructor(private http: HttpClient) { 
    this.selectedAdmin=new Administrador();
    this.selectedDirec=new Director();
    this.selectedSubDir=new SubDirector();
    this.selectedCoordinador=new Coordinador();
    this.selectedProf=new Profesor();
    this.selectedAuxi=new Auxiliar();
    this.selectedAlum=new Alumno();
  }

  opcionElegida(opcion: string){
    return this.opcionSelected=opcion;
  }

  /** Servicio de administradores*/
  getAdministradores(): Observable<Administrador[]> {
    return this.http.get<Administrador[]>(this.URL_API_ADMIN).pipe(
      tap(data => 
      catchError(this.handleError)
      ));
  }
  createAdministrador(admin:Administrador){
    return this.http.post(this.URL_API_ADMIN,admin)
  }

  putAdministrador(admin:Administrador){
    return this.http.put(this.URL_API_ADMIN + `/${admin._id}`,admin)
  }

  /**Servicio de Directores */
  getDirectores(): Observable<Director[]> {
    return this.http.get<Director[]>(this.URL_API_DIREC).pipe(
      tap(data => 
      catchError(this.handleError)
      ));
  }
  createDirector(Dir:Director){
    console.log("sss");
    console.log(Dir);
    return this.http.post(this.URL_API_DIREC,Dir)
  }
  
  /**Servicio de SubDirectores */
  getSubDirectores(): Observable<SubDirector[]> {
    return this.http.get<SubDirector[]>(this.URL_API_SUBDIREC).pipe(
      tap(data => {

      },
      catchError(this.handleError)
      ));
  }
  createSubDirector(SubDir:SubDirector){
    return this.http.post(this.URL_API_SUBDIREC,SubDir)
  }

  /**Servicio de Coordinadores */
  getSubCoordinadores(): Observable<Coordinador[]> {
    return this.http.get<Coordinador[]>(this.URL_API_COORD).pipe(
      tap(data => 
      catchError(this.handleError)
      ));
  }
  createCoordinador(Coordinador:Coordinador){
    return this.http.post(this.URL_API_COORD,Coordinador)
  }

  /**Servicio de Profesores */
  getProfesores(colCod: string){
    return this.http.get(this.URL_API_PROFESOR + `/${colCod}`).pipe(
      tap(data => 
      catchError(this.handleError)
      ));
  }
  createProfesor(Profesor:Profesor){
    return this.http.post(this.URL_API_PROFESOR,Profesor)
  }

  /**Servicio de Auxiliares */
  getAuxiliares(): Observable<Auxiliar[]> {
    return this.http.get<Auxiliar[]>(this.URL_API_AUXI).pipe(
      tap(data => 
      catchError(this.handleError)
      ));
  }
  createAuxiliar(Auxiliar:Auxiliar){
    return this.http.post(this.URL_API_AUXI,Auxiliar)
  }

  /**Servicio de Alumnos */
  getAlumnosColegio(colCod:string){
    return this.http.get(this.URL_API_ALUM + `/${colCod}`)
  }

  createAlumno(Alumno:Alumno){
    return this.http.post(this.URL_API_ALUM,Alumno)
  }

  /**Servicio de Secretaria */
  getSecretariasColegio(colCod:string){
    return this.http.get(this.URL_API_SECRE + `/${colCod}`)
  }

  createSecretaria(secretaria:Secretaria){
    return this.http.post(this.URL_API_SECRE,secretaria)
  }

  /**Servicio de Apoderado */
  getApoderadoColegio(colCod:string){
    return this.http.get(this.URL_API_APOD + `/${colCod}`)
  }

  createApoderado(apoderado:Apoderado){
    return this.http.post(this.URL_API_APOD,apoderado);
  }

  asignarApoderado(aluCod: string, apoCod: string){
    const objApoderado={
      apoCod:apoCod,
      aluCod:aluCod
    }
    return this.http.post(this.URL_API_asignarAprdo,objApoderado)
  }

  getAlumnosApoderado(colCod:string, perRepCod:string){
    return this.http.get(this.URL_API_getAlumnosApoderado + `/${colCod}-${perRepCod}`)
  }

  deleteApoderado(aluCod:string){
    return this.http.get(this.URL_API_dltApo + `/${aluCod}`)
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
