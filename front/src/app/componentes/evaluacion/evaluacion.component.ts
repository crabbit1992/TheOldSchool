import { Component, OnInit, Input } from '@angular/core';

import { Libro, GetLibro } from '../../modelos/libro';
import { Tema, GetTema } from '../../modelos/tema';
import { Evaluacion, GetEvaluacion } from '../../modelos/evaluacion';
import { EvaluacionTema } from '../../modelos/evaluacion-tema';
import { EvaluacionAdm } from '../../modelos/evaluacion-adm';

import { EvaluacionService } from '../../servicios/evaluacion.service';
import { EvaluacionTemaService } from '../../servicios/evaluacion-tema.service';
import { MntAdminCrabbService } from '../../servicios/mnt-admin-crabb.service';
import { PeriodoService } from '../../servicios/periodo.service';
import { EvaluacionAdmService } from '../../servicios/evaluacion-adm.service';

declare var M: any;
// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {

  @Input() inputColCod:string;
  @Input() codMbr:string;
  perRepCod:string;
  prdCod:string;

  libro:  Libro= new Libro();
  tema:   GetTema= new GetTema();

  arrayRespuestas= new Array();
  arrayOpciones= new Array();

  respuesta:string;
  opcion:string;
  ModeloEvaluacion: Evaluacion = new Evaluacion();
  arrayEvaluacion: GetEvaluacion[];

  ModeloEvaluacionAdm: EvaluacionAdm = new EvaluacionAdm();

  ModeloEvaluacionTema: EvaluacionTema = new EvaluacionTema();

  divCrearPregunta:boolean=false;
  divListarPreguntas:boolean=true;
  divEvaluacion:boolean=false;
  divResultados:boolean=false;
  divPresentacion:boolean=true;
  divConfigEva:boolean=false;

  btnTemEvaAdm=false;


  lblPuntosTotales:string;

  jsonRespuestas= new Array();
  
  nomBtnPregunta:string="Crear";


  constructor(
    private evaluacionService: EvaluacionService,
    private evaluacionTemaService: EvaluacionTemaService,
    private mntAdminCrabbService:MntAdminCrabbService,
    private periodoService:PeriodoService,
    private evaluacionAdmService:EvaluacionAdmService,
  ) { }

  HideDivs(){
    this.divCrearPregunta=false;
    this.divListarPreguntas=false;
    this.divEvaluacion=false;
    this.divResultados=false;
    this.divConfigEva=false;
  }

  ShowConfigurarEvaluacion(){
    this.HideDivs();
    this.divConfigEva=true;
  }

  ShowListarPreguntas(){
    this.HideDivs();
    this.ListarPregunta();
    this.divListarPreguntas=true;
  }

  ShowCrearPregunta(){
    this.HideDivs();
    this.LimpiarFrm();
    this.arrayOpciones=[];
    this.arrayRespuestas=[];
    this.divCrearPregunta=true;
  }

  LimpiarFrm(){
    this.ModeloEvaluacion=new Evaluacion();
    this.respuesta=null;
    this.opcion=null;
    this.nomBtnPregunta="Registrar";
  }

  ValidarFrm():boolean{
    var trueOrFalse=false;

    var expresionNum = /^[0-9]+$/;

    if(this.ModeloEvaluacion.evaPta==undefined||this.ModeloEvaluacion.evaPta==null||this.ModeloEvaluacion.evaPta==""){
      trueOrFalse=true;
      M.toast({ html: 'Ingrese una pregunta' });
    }
    else if(this.ModeloEvaluacion.evaRpt==null||this.ModeloEvaluacion.evaRpt==undefined||this.ModeloEvaluacion.evaRpt.length==0){
      trueOrFalse=true;
      M.toast({ html: 'Debe colocar la respuesta' });
    }
    else if(this.ModeloEvaluacion.evaOpc==null||this.ModeloEvaluacion.evaOpc==undefined||this.ModeloEvaluacion.evaOpc.length==0){
      trueOrFalse=true;
      M.toast({ html: 'Ingrese las opciones' });
    }
    else if(this.ModeloEvaluacion.evaOpc<this.ModeloEvaluacion.evaRpt){
      trueOrFalse=true;
      M.toast({ html: 'Hay menos opciones que respuestas' });
    }
    else if(this.ModeloEvaluacion.evaPtsEqt==null||this.ModeloEvaluacion.evaPtsEqt==undefined||this.ModeloEvaluacion.evaPtsEqt==""){
      trueOrFalse=true;
      M.toast({ html: 'Determine la puntuacion de la pregunta' });
    }
    else if(!expresionNum.test(this.ModeloEvaluacion.evaPtsEqt)){
      trueOrFalse=true;
      M.toast({ html: 'Puntos equivalentes no validos' });
    }
    else{
      const arrayRpt=this.ModeloEvaluacion.evaRpt;
      const arrayOpc=this.ModeloEvaluacion.evaOpc;

      var nroRpt= arrayRpt.length;
      var nroOpc= 0;

      for(var i=0;i<arrayRpt.length;i++){

        for(let u=0;u<arrayOpc.length;u++){

          if(arrayRpt[i]["evaRpt"]==arrayOpc[u]["evaOpc"]){
            nroOpc=nroOpc+1
          }

        }

      }
      if(nroOpc!=nroRpt){
        trueOrFalse=true;
        M.toast({ html: 'Las respuesta no se encuentra dentro de las opciones' });
      }

    }

    return trueOrFalse;

  }

  CrearPregunta(){

    this.ModeloEvaluacion.evaRpt=this.arrayRespuestas as [];
    this.ModeloEvaluacion.evaOpc=this.arrayOpciones as [];
    this.ModeloEvaluacion.libCod=this.libro._id;
    this.ModeloEvaluacion.temCod=this.tema._id;
    this.ModeloEvaluacion.colCod=this.inputColCod;

    if(this.ValidarFrm()==true){

    }
    else{

      if(this.ModeloEvaluacion._id){
        return this.evaluacionService.putEvaluacion(this.ModeloEvaluacion)
        .subscribe(res=>{

          var status=res["status"];

            if(status==200){
              M.toast({ html: 'Se edito la pregunta!' });
              this.LimpiarFrm();
              this.ShowListarPreguntas();
              
            }
            else if(status==510){
              M.toast({ html: 'Esta pregunta ya existe' });
            }
        });
      }
      else{

        return this.evaluacionService.postEvaluacion(this.ModeloEvaluacion)
        .subscribe(res=>{

          var status=res["status"];

          if(status==200){
            M.toast({ html: 'Se registro la pregunta!' });
            this.LimpiarFrm();
            this.ShowListarPreguntas();
            
          }
          else if(status==510){
            M.toast({ html: 'Esta pregunta ya existe' });
          }
        });
      }
    }
  }

  pre_EditarPregunta(pregunta: GetEvaluacion){

    this.HideDivs();
 
    this.arrayOpciones= pregunta.evaOpc;
    this.arrayRespuestas= pregunta.evaRpt;
    this.ModeloEvaluacion.evaPta=pregunta.evaPta;
    this.ModeloEvaluacion.evaPtsEqt=pregunta.evaPtsEqt.toString();
    this.ModeloEvaluacion.colCod=pregunta.colCod;
    this.ModeloEvaluacion.libCod=pregunta.libCod;
    this.ModeloEvaluacion.temCod=pregunta.temCod;
    this.ModeloEvaluacion._id=pregunta._id;

    this.nomBtnPregunta="Editar";
    this.divCrearPregunta=true;

  }

  ListarPregunta(){

    let libCod=this.libro._id;
    let temCod=this.tema._id;

    return this.evaluacionService.getEvaluacion(libCod,temCod)
    .subscribe(res=>{
      this.arrayEvaluacion=res as GetEvaluacion[];
    });

  };

  pushPregunta(){

    const objRespuesta={
      evaRpt:""
    };

    objRespuesta.evaRpt=this.respuesta;

    const resultado = this.arrayRespuestas.find( respuesta => respuesta["evaRpt"] === this.respuesta );
    
    if(resultado){
      M.toast({ html: 'Ya existe esa respuesta' });
    }
    else if(this.respuesta==undefined||this.respuesta==""||this.respuesta==null){
      M.toast({ html: 'Ingrese una respuesta' });
    }
    else{
      this.arrayRespuestas.push(objRespuesta);
      this.respuesta=undefined;
    }
  }

  deleteRespuesta(res: object){

    for(let i=0;i<this.arrayRespuestas.length;i++){

      if(this.arrayRespuestas[i]["evaRpt"]==res["evaRpt"]){
        this.arrayRespuestas.splice(i, 1);
      }
    }
  }

  pushOpcion(){

    const objOpciones={
      evaOpc:""
    };

    objOpciones.evaOpc=this.opcion;

    const resultado = this.arrayOpciones.find( opcion => opcion["evaOpc"] === this.opcion );

    if(resultado){
      M.toast({ html: 'Ya existe esta opcion' });
    }
    else if(this.opcion==undefined||this.opcion==""||this.opcion==null){
      M.toast({ html: 'Ingrese una opcion' });
    }
    else{
      this.arrayOpciones.push(objOpciones);
      this.opcion=undefined;
    }
  }

  deleteOpcione(opc: object){
    for(let i=0;i<this.arrayOpciones.length;i++){
      if(this.arrayOpciones[i]["evaOpc"]==opc["evaOpc"]){
        this.arrayOpciones.splice(i, 1);
      }
    }
  }

  Cancelar(){
    this.HideDivs();
    this.nomBtnPregunta="Registrar"
    this.ShowListarPreguntas();

  }

  ShowRealizarEvaluacion(){
    this.HideDivs();
    this.ListarPregunta();
    this.divEvaluacion=true;
  }

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

    this.ModeloEvaluacionTema.libCod=this.libro._id;
    this.ModeloEvaluacionTema.temCod=this.tema._id;

    this.ModeloEvaluacionTema.perRepCod=this.perRepCod;
    this.ModeloEvaluacionTema.colCod=this.inputColCod;
    this.ModeloEvaluacionTema.evaTemNroIto=undefined;
    this.ModeloEvaluacionTema.evaTemNta=parseInt(this.lblPuntosTotales);

    return this.evaluacionTemaService.postEvaluacionTema(this.ModeloEvaluacionTema)
    .subscribe(res=>{
      console.log(res)
    })
  }

  GetEvaAluNota(){

    return this.evaluacionTemaService.getEvaAluNota(this.prdCod,this.tema._id,  this.perRepCod)
    .subscribe(res=>{
      console.log("GetEvaAluNota");
      console.log(res);
  
    });
    
  }

  GetUltimoPeriodo(){

    return this.periodoService.getPeriodoUltimo(this.inputColCod)
    .subscribe(res=>{

      console.log("GetUltimoPeriodo");
      this.prdCod= res["_id"]
      console.log(this.prdCod);
      this.GetEvaAluNota();
      this.GetTemaAdm();
    });

  }

  GetTemaAdm(){

    console.log("GetTemaAdm");
    return this.evaluacionAdmService.getEvaluacionAdm( this.libro._id,this.tema._id)
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

  ValidarFrmTemaAdm():boolean{

    var trueOrFalse=false;

    var expresionNum = /^[0-9]+$/;

   
    if(!expresionNum.test(this.ModeloEvaluacionAdm.evaNroIts.toString())){
      trueOrFalse=true;
      M.toast({ html: 'Ingrese solo numeros para los intentos' });
    }
    else if(!expresionNum.test(this.ModeloEvaluacionAdm.evaTim.toString())){
      trueOrFalse=true;
      M.toast({ html: 'Ingrese solo numeros para el tiempo' });
    }

    return trueOrFalse;

  }

  GuardarTemaEvaAdm(){

    if(this.ValidarFrmTemaAdm()==true){

    }
    else{
      return this.evaluacionAdmService.putEvaluacionAdm(this.ModeloEvaluacionAdm)
      .subscribe(res=>{
        console.log(res);
        var status=res["status"];

        if(status==200){
          M.toast({ html: 'Se guardo los cambios!' });
          this.HideDivs();
          this.divListarPreguntas=true;
          
        }
        else if(status==510){
          M.toast({ html: 'Error, no se puedo guardar los cambios' });
        }
      })
    }

  }

  CancelarTemaEvaAdm(){
    this.HideDivs();
    this.divListarPreguntas=true;
  }


  ngOnInit() {

    this.libro=this.evaluacionService.libro;
    this.tema=this.evaluacionService.tema;
    this.perRepCod= JSON.parse(localStorage.getItem('idPerRep'));
    this.perRepCod= this.mntAdminCrabbService.decript(this.perRepCod);
    this.GetUltimoPeriodo();
    

    this.ShowListarPreguntas();
    this.GetUltimoPeriodo();

 
  }

}
