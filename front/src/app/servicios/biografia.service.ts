import { Injectable } from '@angular/core';
import { 
   QuienesSomos,GetQuienesSomos,
   Actividades,GetActividades,
   BioNiveles,GetBioNivel,
   BioTaller,
   BioInfraestructura,
   BioAnuncio,
   objEmblema,
   getObjImgPfl,
   objImgPfl,
   BioPortada
   } from '../modelos/biografia';


import {HttpClient }from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BiografiaService {

  readonly URL_API_addEmblema='http://localhost:3000/Inicio/Colegio/Emblema';
  readonly URL_API_imgPfl='http://localhost:3000/Inicio/Colegio/imgPfl';

  readonly URL_API_QuienesSomos='http://localhost:3000/Inicio/BioQuienesSomos';
  readonly URL_API_Actividad='http://localhost:3000/Inicio/BioActividad';
  readonly URL_API_BioNivel='http://localhost:3000/Inicio/BioNivel';
  readonly URL_API_getBioNivelSgnNiv='http://localhost:3000/Inicio/BioNivel/getBioNivelSgnNiv';

  readonly URL_API_BioTaller='http://localhost:3000/Inicio/BioTaller';
  readonly URL_API_getBioTallerSgnNiv='http://localhost:3000/Inicio/BioTaller/getBioTallerSgnNiv';

  readonly URL_API_BioInfraestructura='http://localhost:3000/Inicio/BioInfraestructura';

  readonly URL_API_BioAnuncio='http://localhost:3000/Inicio/BioAnuncio';
  readonly URL_API_BioPortada='http://localhost:3000/Inicio/BioPortada';
  
  varRes_modalInicio:number=0;

  constructor(private http: HttpClient) { }

  
  /** Quienes somos */
  getQuienesSomos(colCod: string){
    return this.http.get(this.URL_API_QuienesSomos+ `/${colCod}`)
  }

  postQuienesSomos(quienesSomos:QuienesSomos){
    return this.http.post(this.URL_API_QuienesSomos,quienesSomos)
  }

  putQuienesSomos(quienesSomos:QuienesSomos){
    return this.http.put(this.URL_API_QuienesSomos + `/${quienesSomos._id}`,quienesSomos)
  }

  /** Actividades */
  getActividadesFind(colCod: string,){
    return this.http.get(this.URL_API_Actividad+ `/${colCod}`)
  }

  getActividades(colCod: string,actTpo: string){
    return this.http.get(this.URL_API_Actividad+'/actTpo'+`/${colCod}-${actTpo}`)
  }

  postActividad(actividades:Actividades){
    return this.http.post(this.URL_API_Actividad,actividades)
  }

  putActividad(actividades:Actividades){
    return this.http.put(this.URL_API_Actividad + `/${actividades._id}`,actividades)
  }

  removeActividad(_id:string){
    return this.http.delete(this.URL_API_Actividad + `/${_id}`)
  }

  /** Nivel */
  getNivel(colCod: string, nivOpt:string,){
    return this.http.get(this.URL_API_BioNivel+ `/${colCod}-${nivOpt}`)
  }

  getNivelAll(colCod: string){
    return this.http.get(this.URL_API_BioNivel+'/allNiv'+ `/${colCod}`)
  }
  
  getNivelSgnNiv(colCod: string, nivOpt:string,nivTtl){
    return this.http.get(this.URL_API_getBioNivelSgnNiv+ `/${colCod}-${nivOpt}-${nivTtl}`)
  }

  postNivel(nivel:BioNiveles){
    return this.http.post(this.URL_API_BioNivel,nivel)
  }

  putNivel(nivel:BioNiveles){
    return this.http.put(this.URL_API_BioNivel + `/${nivel._id}`,nivel)
  }

  deleteNivel(_id){
    return this.http.delete(this.URL_API_BioNivel + `/${_id}`)
  }

  /** Taller */
  getTaller(colCod: string, talOpt:string,){
    return this.http.get(this.URL_API_BioTaller+ `/${colCod}-${talOpt}`)
  }

  getTalleres(colCod: string){
    return this.http.get(this.URL_API_BioTaller+'/talleresAll'+`/${colCod}`)
  }

  postTaller(bioTaller:BioTaller){
    return this.http.post(this.URL_API_BioTaller,bioTaller)
  }

  putTaller(bioTaller:BioTaller){
    return this.http.put(this.URL_API_BioTaller + `/${bioTaller._id}`,bioTaller)
  }

  deleteTaller(_id){
    return this.http.delete(this.URL_API_BioTaller + `/${_id}`)
  }

  /** Infraestructura */
  getInfraestructura(colCod: string, infTpo:string,){
    return this.http.get(this.URL_API_BioInfraestructura+ `/${colCod}-${infTpo}`)
  }

  getInfraestructuras(colCod: string){
    return this.http.get(this.URL_API_BioInfraestructura+'/infraestructurasAll'+ `/${colCod}`)
  }

  postInfraestructura(bioInfraestructura:BioInfraestructura){
    return this.http.post(this.URL_API_BioInfraestructura,bioInfraestructura)
  }

  putInfraestructura(bioInfraestructura:BioInfraestructura){
    return this.http.put(this.URL_API_BioInfraestructura + `/${bioInfraestructura._id}`,bioInfraestructura)
  }

  deleteInfraestructura(_id){
    return this.http.delete(this.URL_API_BioInfraestructura + `/${_id}`)
  }

  /** Anuncio */
  getAnuncios(colCod: string,){
    return this.http.get(this.URL_API_BioAnuncio+ `/${colCod}`)
  }

  postAnuncio(bioAnuncio:BioAnuncio){
    return this.http.post(this.URL_API_BioAnuncio,bioAnuncio)
  }

  putAnuncio(bioAnuncio:BioAnuncio){
    return this.http.put(this.URL_API_BioAnuncio + `/${bioAnuncio._id}`,bioAnuncio)
  }

  deleteAnuncio(_id){
    return this.http.delete(this.URL_API_BioAnuncio + `/${_id}`)
  }

  /**Emblema */
  addEmblema(obj:objEmblema){
    return this.http.post(this.URL_API_addEmblema,obj)
  }

  getEmblema(colCod: string,){
    return this.http.get(this.URL_API_addEmblema+ `/${colCod}`)
  } 
  
  putEmblema(obj:objEmblema){
    return this.http.put(this.URL_API_addEmblema + `/${obj.colCod}`,obj)
  }

  /** Imagen de perfil */
  addImgPfl(obj:objImgPfl){
    return this.http.post(this.URL_API_imgPfl,obj)
  }

  getImgPfl(colCod: string,){
    return this.http.get(this.URL_API_imgPfl+ `/${colCod}`)
  } 
  
  putImgPfl(obj:objImgPfl){
    return this.http.put(this.URL_API_imgPfl + `/${obj.colCod}`,obj)
  }

  /** Portadas */
  getPortadas(colCod: string,){
    return this.http.get(this.URL_API_BioPortada+ `/${colCod}`)
  }

  getPortadasUrl(colUrl: string,){
    return this.http.get(this.URL_API_BioPortada+'/getByColUrl'+ `/${colUrl}`)
  }

  postPortada(bioPortada:BioPortada){
    return this.http.post(this.URL_API_BioPortada,bioPortada)
  }

  putPortada(bioPortada:BioPortada){
    return this.http.put(this.URL_API_BioPortada + `/${bioPortada._id}`,bioPortada)
  }

  deletePortada(_id){
    return this.http.delete(this.URL_API_BioPortada + `/${_id}`)
  }

}
