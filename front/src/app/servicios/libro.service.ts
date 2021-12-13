import { Injectable } from '@angular/core';
import { Libro } from '../modelos/libro';
import {HttpClient }from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class LibroService {

  curCod: string;
  nivCod: string;
  graCod: string;
  colCod: string;

  readonly URL_API='http://localhost:3000/Inicio/Libro';
  readonly URL_API_getLibrosCur='http://localhost:3000/Inicio/Libro/getLibrosCur';
  readonly URL_API_librosFiltro='http://localhost:3000/Inicio/Libro/librosFiltro';

  constructor(private http: HttpClient) { }

  getLibrosCol(colCod :string){
    return this.http.get(this.URL_API + `/${colCod}`)
  }

  getLibrosCur(objLibro :object){
    return this.http.post(this.URL_API_getLibrosCur, objLibro)
  }
  
  postLibrosFiltro(libro:Libro){
    return this.http.post(this.URL_API_librosFiltro,libro)
  }

  postLibro(libro:Libro){
    return this.http.post(this.URL_API,libro)
  }

  putLibro(libro:Libro){
    return this.http.put(this.URL_API + `/${libro._id}`,libro)
  }

  removeLibro(_id:string){
    return this.http.delete(this.URL_API + `/${_id}`)
  }

}
