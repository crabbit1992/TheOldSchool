import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { GaleriaCol } from '../modelos/galeria-col';

@Injectable({
  providedIn: 'root'
})
export class GaleriaColService {

  readonly URL_API='http://localhost:3000/Inicio/colegioImg';
  readonly URL_API_definirPtCentro='http://localhost:3000/Inicio/colegioImg/definirPtCentro';
  readonly URL_API_definirPtIzquierda='http://localhost:3000/Inicio/colegioImg/definirPtIzquierda';
  readonly URL_API_definirPtDerecha='http://localhost:3000/Inicio/colegioImg/definirPtDerecha';

  readonly URL_API_getImages='http://localhost:3000/Inicio/colegioImg/getImages';

  readonly URL_API_getPortadas='http://localhost:3000/Inicio/colegioImg/getPortadas';
  readonly URL_API_getAnuncios='http://localhost:3000/Inicio/colegioImg/getAnuncios';


  readonly URL_API_getImagenesFiltro='http://localhost:3000/Inicio/colegioImg/getImagenesFiltro';
  

  optionModal: string;
  imgSelected:object;

  constructor(private http: HttpClient) { }

  createFoto(titulo: string, descripcion: string,tpoImgCod: string ,image: File, colCod: string) {
    const fd = new FormData();

    fd.append('colImgTtl', titulo);
    fd.append('colImgDes', descripcion);
    fd.append('tpoImgCod', tpoImgCod);
    fd.append('image', image);
    fd.append('colCod', colCod);

    const objImage={
      colImgTtl:titulo,
      colImgDes:descripcion,
      tpoImgCod:tpoImgCod,
      image:image,
      colCod:colCod
    }
    console.log(objImage);
    return this.http.post(this.URL_API, fd);
  }

  getImgsFiltros(obj : object){
    return this.http.post(this.URL_API_getImagenesFiltro, obj);
  }

  definirPtCentro(foto :GaleriaCol){
    return this.http.post(this.URL_API_definirPtCentro, foto);
  }

  definirPtIzquierda(foto :GaleriaCol){
    return this.http.post(this.URL_API_definirPtIzquierda, foto);
  }

  definirPtDerecha(foto :GaleriaCol){
    return this.http.post(this.URL_API_definirPtDerecha, foto);
  }

  GetFotos(colCod: string){
    return this.http.get(this.URL_API + `/${colCod}`);
  }

  getImagenes(colCod: string){
    return this.http.get(this.URL_API_getImages + `/${colCod}`);
  }

  getPortadas(colCod: string){
    return this.http.get(this.URL_API_getPortadas + `/${colCod}`);
  }

  getAnuncios(colCod: string){
    return this.http.get(this.URL_API_getAnuncios + `/${colCod}`);
  }



  editFoto(imagen: GaleriaCol){
    return this.http.put(this.URL_API + `/${imagen._id}`,imagen)
  }

  eliminarFoto(id: string,colCod: string){
    return this.http.delete(this.URL_API + `/${id}-${colCod}`)
  }

}
