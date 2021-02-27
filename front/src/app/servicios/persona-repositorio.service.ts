import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse }from '@angular/common/http';
import { Observable, throwError, observable } from 'rxjs';
import { PersonaRepositorio } from '../modelos/persona-repositorio';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PersonaRepositorioService {

  selectedPersona: PersonaRepositorio;
  personas:PersonaRepositorio[];
  status: string;
  readonly URL_API='http://209.145.52.133:3000/Inicio/RepositorioPersonas';
  readonly URL_API_ById='http://209.145.52.133:3000/Inicio/RepositorioPersonas/ById';
  
  constructor(private http: HttpClient) { 
    this.selectedPersona=new PersonaRepositorio();
  }

  getPersonas(): Observable<PersonaRepositorio[]> {
    return this.http.get<PersonaRepositorio[]>(this.URL_API).pipe(
      tap(data => 
      catchError(this.handleError)
      ));
  }


  getPersonaDni(dni:string):Observable<PersonaRepositorio>{
    return this.http.get<PersonaRepositorio>(this.URL_API+ `/${dni}`).pipe(
      tap(data => 
      catchError(this.handleError)
      ));
  }

  getPersona(_id :string){
    return this.http.get(this.URL_API+ `/${_id}`)
  }

  getPersonaById(id :string){
    return this.http.get(this.URL_API_ById+ `/${id}`)
  }


  postPersona(persona:PersonaRepositorio){
    return this.http.post(this.URL_API,persona)
  }

  putPersona(persona:PersonaRepositorio){
    return this.http.put(this.URL_API + `/${persona._id}`,persona)
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
