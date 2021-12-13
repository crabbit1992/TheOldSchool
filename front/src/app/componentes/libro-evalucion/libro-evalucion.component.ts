import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { LibroService } from 'src/app/servicios/libro.service';
import { TemaService } from '../../servicios/tema.service';
import { SubTemaService } from '../../servicios/sub-tema.service';
import { EvaluacionService } from '../../servicios/evaluacion.service';
import { EvaluacionAdmService } from '../../servicios/evaluacion-adm.service';
import { EvaluacionTemaService } from '../../servicios/evaluacion-tema.service';
import { PeriodoService } from '../../servicios/periodo.service';
import { MntAdminCrabbService }  from '../../servicios/mnt-admin-crabb.service';


import { Evaluacion, GetEvaluacion } from '../../modelos/evaluacion';
import { Libro, GetLibro } from '../../modelos/libro';
import { Tema, GetTema } from '../../modelos/tema';
import { Subtema, GetSubTema } from '../../modelos/subtema';
import { EvaluacionTema } from '../../modelos/evaluacion-tema';
import { EvaluacionAdm } from '../../modelos/evaluacion-adm';

declare var M: any;

@Component({
  selector: 'app-libro-evalucion',
  templateUrl: './libro-evalucion.component.html',
  styleUrls: ['./libro-evalucion.component.css']
})
export class LibroEvalucionComponent implements OnInit {

  URL: string='http://localhost:3000';

  colCod:string;
  graCod:string;
  nivCod:string;
  curCod:string;

  inputColCod:string;
  perRepCod:string;

  arrayLibro: GetLibro[];
  libroActual: Libro= new Libro();
  libCod:string;

  divlistaLibros:boolean=true;
  divListsubTema:boolean =false;
  divLibroPre:boolean=false;
  divTema:boolean=false;
  divSubTema:boolean=false;
  appEvaluacion:boolean=false;

  /** Referente a Tema */
  ModeloTema: Tema= new Tema();
  arrayTema: GetTema[];
  arraySubTema: GetSubTema[];
  timeEva:string;
  temCodAct:string;
  temActual:GetTema= new GetTema();
  temTtl:string;

  libro:  Libro= new Libro();
  tema:   GetTema= new GetTema();

  arrayEvaluacion: GetEvaluacion[];

  divEvaluacion:boolean=false;
  divResultados:boolean=false;

  lblPuntosTotales:string;
  jsonRespuestas= new Array();
  ModeloEvaluacionTema: EvaluacionTema = new EvaluacionTema();
  EvaluacionAluTema: EvaluacionTema = new EvaluacionTema();
  
  ModeloEvaluacionAdm: EvaluacionAdm = new EvaluacionAdm();

  prdCod:string;
  divPresentacion:boolean=true;
  btnTemEvaAdm=false;
  

  constructor(
    private libroService:LibroService,      
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private temaService: TemaService,
    private subTemaService: SubTemaService,
    private evaluacionService: EvaluacionService,
    private evaluacionTemaService: EvaluacionTemaService,
    private periodoService:PeriodoService,
    private evaluacionAdmService:EvaluacionAdmService,
    private mntAdminCrabbService:MntAdminCrabbService,) {
    this.matIconRegistry.addSvgIcon(
      "editar",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/editar.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "libro-abierto",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/libro-abierto.svg")
    );
   }

   HideDivs(){
    this.divlistaLibros=false;
    this.divTema=false;
    this.divSubTema=false;
    this.divLibroPre=false;
    this.divListsubTema=false;
    this.appEvaluacion=false;
    this.divResultados=false;
    this.divEvaluacion=false;
  }

  ShowListarLibros(){
    this.HideDivs();

    this.CargarLibro();
  };

  ShowListarTema(libro: Libro){
    this.HideDivs();
    this.libroActual=libro;
    this.libCod=libro._id;
    this.divLibroPre=true;
    this.divListsubTema=false;
    this.appEvaluacion=false;
    this.ListarTema();
  }

  
  ListarTema(){
    console.log(this.libCod);
    return this.temaService.getTema(this.libCod)
    .subscribe(res=>{
      this.arrayTema=res as GetTema[];
      this.divTema=true;
      console.log(this.arrayTema);
    })
  }

  /** Metodos de sub Temas */
  ShowSubTemas(tema:GetTema){
    this.HideDivs();
    this.divTema=true;
    this.temActual=tema;
    this.temTtl=tema.temTtl;
    this.temCodAct=tema._id;

    this.evaluacionService.libro=this.libroActual;
    this.evaluacionService.tema=tema;

    this.ListarSubTemas();
    this.GetEvaAluNota();
    this.GetTemaAdm();
  }

  ListarSubTemas(){
    this.divTema=true;
    this.divListsubTema=true;

    return this.subTemaService.getSubTema(this.temCodAct,this.libroActual._id)
    .subscribe(res=>{
      this.arraySubTema = res as GetSubTema[];
    })
  }

  CargarLibro(){

    const objLibro={
      colCod: this.colCod,
      graCod: this.graCod,
      nivCod: this.nivCod,
      curCod: this.curCod,
    }

    return this.libroService.getLibrosCur(objLibro)
    .subscribe(res=>{
      console.log(res);
      this.arrayLibro= res as GetLibro[];
      this.divlistaLibros=true;
    })
  }

  ValidarIntentos():boolean{

    var trueOrFalse = false;

    if(this.EvaluacionAluTema.evaTemNroIto>=this.ModeloEvaluacionAdm.evaNroIts){
      trueOrFalse=true;
    }

    return trueOrFalse;
  }

  ShowVerEvaluacion(){
   
    if(this.ValidarIntentos()==false){
      this.HideDivs();
      this.ListarPregunta();
      this.appEvaluacion=true;
    }
    else{
      M.toast({ html: 'Numero de intentos completados' });
    }

  }

  ListarPregunta(){

    let libCod=this.libroActual._id;
    let temCod=this.temCodAct;

    return this.evaluacionService.getEvaluacion(libCod,temCod)
    .subscribe(res=>{
      this.arrayEvaluacion=res as GetEvaluacion[];
      this.divEvaluacion=true;

    
    
        this.ModeloEvaluacionTema.libCod=this.libCod;
        this.ModeloEvaluacionTema.temCod=this.temCodAct;
        this.ModeloEvaluacionTema.perRepCod=this.perRepCod;
        this.ModeloEvaluacionTema.colCod=this.inputColCod;
        this.ModeloEvaluacionTema.evaTemNroIto=this.EvaluacionAluTema.evaTemNroIto+1;
        this.ModeloEvaluacionTema.evaTemNta=0;
        this.ModeloEvaluacionTema.prdCod=this.prdCod;
    
        console.log(this.ModeloEvaluacionTema);
    
        return this.evaluacionTemaService.postEvaluacionTema(this.ModeloEvaluacionTema)
        .subscribe(res=>{
          console.log(res)
        });
   
    });

  };

  addOpcSelected(eva: GetEvaluacion, opc: string){

    var objetoOpc= [];

    var objRespuesta={
      pregunta:eva,
      objetoOpc:objetoOpc
    }

    if(this.jsonRespuestas.length==0){

      const objOpc={
        opc:opc
      }

      objRespuesta.pregunta=eva;
      objRespuesta.objetoOpc.push(objOpc);
      this.jsonRespuestas.push(objRespuesta);
    }
    else{

      var existe=false;
      const objOpc={
        opc:opc
      }

      for(var i=0;i<this.jsonRespuestas.length;i++){

        if(this.jsonRespuestas[i]["pregunta"]["_id"]==eva._id){
          existe=true;
          console.log("entroooo 111");
          var repetido=false;

          var array = this.jsonRespuestas[i]["objetoOpc"];
          for(let u = 0; u < array.length; u++){
            if(array[u]["opc"]==opc){
              console.log("entroooo 22");
              repetido=true;
              array.splice(u, 1);
              if(array.length==0){
                this.jsonRespuestas.splice(i, 1);
              }
              else{
                this.jsonRespuestas[i]["objetoOpc"]=array;
              }
              
            }
          }

          if(repetido==false){
            console.log("entroooo 3333");
            

            const objOpc={
              opc:opc
            }

            let arr=this.jsonRespuestas[i]["objetoOpc"];
            arr.push(objOpc)

            for(let u = 0; u < arr.length; u++){
              if(arr[u]["opc"]==opc){
                arr.splice(u, 1);
              }
            }
  
            objRespuesta.objetoOpc.push(arr);
            this.jsonRespuestas[i]["objetoOpc"].push(objOpc)
          }
        }
      }

      if(existe==false){
        console.log("entroooo 4444");
        const objOpc={
          opc:opc
        }

        objRespuesta.pregunta=eva;
        objRespuesta.objetoOpc.push(objOpc);
        this.jsonRespuestas.push(objRespuesta);
      }

    }
    console.log(this.jsonRespuestas);

  }

  Puntuacion(){

    var puntosTotales=0;
    var puntos=0;

    for(var i=0; i<this.jsonRespuestas.length;i++){

      var arrayOpcSlt=this.jsonRespuestas[i]["objetoOpc"];
      var arrayOpcSltSize=arrayOpcSlt.length;

      var arrayRpta=this.jsonRespuestas[i]["pregunta"]["evaRpt"];
      var arrayRptaSize=arrayRpta.length;

      var contadorOpc=0;

      console.log(arrayOpcSlt);
      console.log(arrayRpta);

      for(var a=0; a<arrayRpta.length;a++){


        puntos=0;

        for(var e=0; e<arrayOpcSlt.length;e++){
          
          if(arrayRpta[a]["evaRpt"]==arrayOpcSlt[e]["opc"]){
            contadorOpc=contadorOpc+1;
            console.log("entro");
          }

        }

        console.log(contadorOpc);
        if(arrayRptaSize==arrayOpcSltSize){
          console.log("entro 2");
          if(arrayRptaSize==contadorOpc){
            puntos=this.jsonRespuestas[i]["pregunta"]["evaPtsEqt"];
            console.log("puntos : "  + puntos)
          }
        }

      }

      console.log(contadorOpc);

      puntosTotales=puntosTotales+puntos;
      if(puntosTotales<10){
        this.lblPuntosTotales="0"+puntosTotales.toString();
      }
      else{
        this.lblPuntosTotales=puntosTotales.toString();
      }
    }

    this.EnviarPuntuacion();
    this.HideDivs();
    this.divPresentacion=false;
    this.divResultados=true;

  }

  EnviarPuntuacion(){


    console.log(this.libCod);
    console.log(this.temCodAct);

    this.ModeloEvaluacionTema.libCod=this.libCod;
    this.ModeloEvaluacionTema.temCod=this.temCodAct;
    this.ModeloEvaluacionTema.perRepCod=this.perRepCod;
    this.ModeloEvaluacionTema.colCod=this.inputColCod;
    //this.ModeloEvaluacionTema.evaTemNroIto=this.EvaluacionAluTema.evaTemNroIto+1;
    this.ModeloEvaluacionTema.evaTemNta=parseInt(this.lblPuntosTotales);
    this.ModeloEvaluacionTema.prdCod=this.prdCod;

    console.log(this.ModeloEvaluacionTema);

    return this.evaluacionTemaService.postEvaluacionTema(this.ModeloEvaluacionTema)
    .subscribe(res=>{
      console.log(res)
    })
  };

  GetUltimoPeriodo(){

    return this.periodoService.getPeriodoUltimo(this.inputColCod)
    .subscribe(res=>{

      console.log("GetUltimoPeriodo");
      this.prdCod= res["_id"]
      console.log(this.prdCod);

    });

  }

  GetTemaAdm(){

    console.log("GetTemaAdm");
    return this.evaluacionAdmService.getEvaluacionAdm( this.libCod,this.temCodAct)
    .subscribe(res=>{

      if(res==undefined||res==null){
        this.btnTemEvaAdm=false;
      }
      else{
        this.btnTemEvaAdm=true;
      }

      this.ModeloEvaluacionAdm=res as EvaluacionAdm;
      console.log(this.ModeloEvaluacionAdm);

    });

  }

  GetEvaAluNota(){

    return this.evaluacionTemaService.getEvaAluNota(this.prdCod,this.temCodAct,  this.perRepCod)
    .subscribe(res=>{
      console.log("GetEvaAluNota");
      this.EvaluacionAluTema = res as EvaluacionTema;
      console.log(this.EvaluacionAluTema);
  
    });
    
  }

  ngOnInit() {

    this.colCod=this.libroService.colCod;
    this.graCod=this.libroService.graCod;
    this.nivCod=this.libroService.nivCod;
    this.curCod=this.libroService.curCod;
    this.inputColCod=this.colCod;

    let persona_id=JSON.parse(localStorage.getItem('idPerRep'));

    this.perRepCod=this.mntAdminCrabbService.decript(persona_id);

    this.CargarLibro();
    this.GetUltimoPeriodo();


    console.log(this.colCod);
    console.log(this.graCod);
    console.log(this.nivCod);
    console.log(this.curCod);
  }

}
