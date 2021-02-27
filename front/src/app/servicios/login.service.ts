import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse }from '@angular/common/http'
import { Observable, throwError, observable } from 'rxjs';
import { Login } from '../modelos/login';
import { ResToken } from '../modelos/res-token';
import { catchError, tap, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  selectedtoken: ResToken;
  readonly URL_API='http://209.145.52.133:3000/Inicio/Login';
  constructor(private http: HttpClient ) { }

  postLogin(login:Login){
    return this.http.post<ResToken>(this.URL_API,login).pipe(
      tap(data => 
      catchError(this.handleError)
      ));
  }

  loggedIn() {
    console.log("entro a logged inn");
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
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
