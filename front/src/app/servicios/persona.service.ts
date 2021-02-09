import { Injectable } from '@angular/core';
import { Persona } from '../modelos/persona';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {HttpClient,HttpErrorResponse,HttpHeaders }from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class PersonaService {

  headers=new HttpHeaders();

  selectedPersona: Persona;
  personas:Persona[];
  readonly URL_API='http://localhost:3000/Inicio/Persona';
  
  constructor(private http: HttpClient) { 
    this.selectedPersona=new Persona();
   // this.headers.append("Content-Type","application/json");
   // this.headers.append("Authorization","Bearer: "+localStorage.getItem("token"));
  }

  
  getPersonas(token:any): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.URL_API)
  }

  getPersona(_id :string){
    return this.http.get(this.URL_API + `/${_id}`)
  } 
 
  getPersonaDni(dni:string):Observable<Persona>{
    return this.http.get<Persona>(this.URL_API+ `/${dni}`).pipe(
      tap(data => 
      catchError(this.handleError)
      ));
  }

  postPersona(persona:Persona){
    return this.http.post(this.URL_API,persona)
  }

  putPersona(persona:Persona){
    return this.http.put(this.URL_API + `/${persona._id}`,persona)
  }

  removePersona(_id:string){
    return this.http.delete(this.URL_API + `/${_id}`)
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
