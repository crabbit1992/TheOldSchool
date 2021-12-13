import { Component, OnInit, Input, NgZone, ViewChild } from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { MatDialog } from '@angular/material';

/******* Importacion de Modelos ******** */
import { Grado, GetGrado,GetGradoFiltro }  from '../../modelos/grado'; 
import { Nivel, GetNivel, GetNivelFiltro }  from '../../modelos/nivel'; 
import { NucleoArea, NucleoCurso, GetNucleoCurso } from '../../modelos/mnt-admin-crabb';
import { Libro, GetLibro } from '../../modelos/libro';
import { Tema, GetTema } from '../../modelos/tema';
import { Subtema, GetSubTema } from '../../modelos/subtema';

/******* Importacion de Servicios ****** */
import { GradoService } from '../../servicios/grado.service'; 
import { NivelService } from '../../servicios/nivel.service';
import { MntAdminCrabbService } from '../../servicios/mnt-admin-crabb.service';
import { LibroService } from '../../servicios/libro.service';
import { TemaService } from '../../servicios/tema.service';
import { SubTemaService } from '../../servicios/sub-tema.service';
import { EvaluacionService } from '../../servicios/evaluacion.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

/****************************************** */
import { ModalOptLibroComponent } from '../modal-opt-libro/modal-opt-libro.component';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

declare var M: any;
// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  @Input() inputColCod:string;
  @Input() codMbr:string;
  URL: string='http://localhost:3000';

  textDiv:string;
  file: File;
  photoSelected: string | ArrayBuffer;

  divlistaLibros:boolean=false;
  divCrearLibro:boolean=false;
  divLibroPre:boolean=false;

  divTema:boolean=false;
  divCrearTema:boolean=false;
  divSubTema:boolean=false;
  btnAgreSubTema:boolean=true;
  
  /** Referente a Libros*/
  ModeloLibro: Libro= new Libro();
  arrayLibro: GetLibro[];
  libroActual: Libro= new Libro();

  /** Referente a Tema */
  ModeloTema: Tema= new Tema();
  arrayTema: GetTema[];
  timeEva:string;
  temCodAct:string;
  temActual:GetTema= new GetTema();
  temTtl:string;
  appEvaluacion:boolean=false;

  /** Referente a SubTema */
  divListsubTema:boolean =false;
  ModeloSubTema: Subtema = new Subtema();
  arraySubTema: GetSubTema[];


  /**  Llamada a selectores de grado, nivel, area y curso */
  ModeloGrado: Grado=new Grado();
  arrayGrado:  GetGrado[];
  fltArrayGrado:GetGradoFiltro[]=[];

  ModeloNivel: Nivel=new Nivel();
  arrayNivel: GetNivel[];
  fltArrayNivel:GetNivelFiltro[]=[];

  /** Referente a Area y curso */
  ModeloNcoArea:NucleoArea=new NucleoArea();
  arraySelectNucleoArea:NucleoArea[];
  arrayFltSltNucleoArea:NucleoArea[];

  ModeloNcoCurso:NucleoCurso=new NucleoCurso()
  arraySelectNucleocurso: GetNucleoCurso[];
  arrayFltSltNucleoCurso: GetNucleoCurso[];

  flt_nivCod: string;
  flt_areCod: string;

  /**  Botones */
  nomBtnLib:string= "Crear";
  nomBtnTem:string= "Crear";

  /** Variable global */
  libCod:string;
  
  /****************************************************** */

  constructor(
      private _ngZone: NgZone,
      private gradoService:GradoService,
      private nivelService:NivelService,
      private mntAdminCrabbService: MntAdminCrabbService,
      private libroService: LibroService,
      private temaService: TemaService,
      private subTemaService: SubTemaService,
      private evaluacionService: EvaluacionService,
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer,
      public  dialog         : MatDialog,
    ) { 

      this.matIconRegistry.addSvgIcon(
        "editar",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/editar.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "libro-abierto",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/libro-abierto.svg")
      );
  }

  @ViewChild('autosize',{ static: true }) autosize: CdkTextareaAutosize;

  HideDivs(){
    this.divlistaLibros=false;
    this.divCrearLibro=false;
    this.divTema=false;
    this.divCrearTema=false;
    this.divSubTema=false;
    this.btnAgreSubTema=false;
    this.divLibroPre=false;
    this.divListsubTema=false;
    this.appEvaluacion=false;
  }

  /** Metodos de libros */
  ShowCrearLibro(){
    this.HideDivs();
    this.LimpiarFrmLibro();
    this.divCrearLibro=true;
  };

  ValidarFrmLibro():Boolean{

    var trueOrFalse=false;

    if(this.ModeloLibro.areCod==undefined||this.ModeloLibro.areCod==null||this.ModeloLibro.areCod=="string"){
      trueOrFalse=true;
      M.toast({ html: 'Seleccione un area' });
    }
    else if(this.ModeloLibro.curCod==undefined||this.ModeloLibro.curCod==null||this.ModeloLibro.curCod=="string"){
      trueOrFalse=true;
      M.toast({ html: 'Seleccione un curso' });
    }
    else if(this.ModeloLibro.nivCod==undefined||this.ModeloLibro.nivCod==null||this.ModeloLibro.nivCod=="string"){
      trueOrFalse=true;
      M.toast({ html: 'Seleccione un nivel' });
    }
    else if(this.ModeloLibro.graCod==undefined||this.ModeloLibro.graCod==null||this.ModeloLibro.graCod=="string"){
      trueOrFalse=true;
      M.toast({ html: 'Seleccione un grado' });
    }
    else if(this.ModeloLibro.libTtl==undefined||this.ModeloLibro.libTtl==null||this.ModeloLibro.libTtl==""){
      trueOrFalse=true;
      M.toast({ html: 'Ingrese un titulo' });
    }

    return trueOrFalse;
  }

  CrearLibro(){
    this.ModeloLibro.nivCod=this.ModeloNivel._id;
    this.ModeloLibro.graCod=this.ModeloGrado._id;
    this.ModeloLibro.areCod=this.ModeloNcoArea._id;
    this.ModeloLibro.curCod=this.ModeloNcoCurso._id
    this.ModeloLibro.colCod=this.inputColCod;

    console.log(this.ModeloLibro);
    if(this.ValidarFrmLibro()==true){

    }
    else{
      if(this.ModeloLibro._id){
        console.log("entrooo a editar");
        this.libroService.putLibro(this.ModeloLibro)
        .subscribe(res=>{
          console.log(res);
          this.ShowListarLibros();
          this.LimpiarFrmLibro();
        });
      }
      else{
        this.libroService.postLibro(this.ModeloLibro)
        .subscribe(res=>{
          console.log(res);
          this.ShowListarLibros();
          this.LimpiarFrmLibro();
        });
      };
    };
  };

  ShowListarLibros(){
    this.HideDivs();
    this.GetLibros();
  };

  GetLibros(){
    this.libroService.getLibrosCol(this.inputColCod)
    .subscribe(res=>{
      console.log(res);
      this.divlistaLibros=true;
      this.arrayLibro= res as GetLibro[];
    })
  };

  BuscarLibros(){
    console.log(this.ModeloNcoArea._id);
    console.log(this.ModeloNcoCurso._id);
    console.log(this.ModeloNivel._id);
    console.log(this.ModeloGrado._id);

    this.ModeloLibro.curCod=this.ModeloNcoCurso._id;
    this.ModeloLibro.nivCod=this.ModeloNivel._id;
    this.ModeloLibro.graCod=this.ModeloGrado._id;
    this.ModeloLibro.colCod=this.inputColCod;

    if(this.ModeloLibro.curCod=="string"){
      this.ModeloLibro.curCod=undefined;
    }
    if(this.ModeloLibro.nivCod=="string"){
      this.ModeloLibro.nivCod=undefined;
    }
    if(this.ModeloLibro.graCod=="string"){
      this.ModeloLibro.graCod=undefined;
    }

    this.libroService.postLibrosFiltro(this.ModeloLibro)
    .subscribe(res=>{
      this.arrayLibro= res as GetLibro[];
    })
  };

  PreEditarLibro(getLibro: GetLibro){

    this.mntAdminCrabbService.getCursosArea(getLibro.areCod._id)
    .subscribe(res=>{
      this.arraySelectNucleocurso=res as GetNucleoCurso[];
      this.arraySelectNucleocurso.unshift({
        _id:        "string",
        areCod:{
          estCod: "string",
          ncoAreNom: "string",
          timestamp: "string",
          __v: 0,
          _id: "string",
      },
        ncoCurNom:  "Seleccione el curso",
        ncoCurDes:  "",
        estCod:     "",
        timestamp:  "",
      });
      this.ModeloNcoArea._id=getLibro.areCod._id;
      this.ModeloNcoCurso._id=getLibro.curCod._id;
      this.ModeloNivel._id=getLibro.nivCod._id;
      this.ModeloGrado._id=getLibro.graCod._id;

      this.ModeloLibro._id= getLibro._id;
      this.ModeloLibro.libTtl= getLibro.libTtl;
      this.ModeloLibro.colCod= getLibro.colCod;
      this.HideDivs();
      this.divCrearLibro=true;
    });


  };

  /** Metodos de Temas */
  ValidarFrmTema():boolean{

    var expresionNum = /^[0-9]+$/;
    var trueOrFalse=false

    if(this.ModeloTema.temTtl==undefined||this.ModeloTema.temTtl==null||this.ModeloTema.temTtl==""){
      trueOrFalse=true;
      M.toast({ html: 'Ingrese un titulo para el tema' });
    }
    else if(this.ModeloTema.temDes==undefined||this.ModeloTema.temDes==null||this.ModeloTema.temDes=="" ){
      trueOrFalse=true;
      M.toast({ html: 'Ingrese una descripción el tema' });
    }
    else if(!expresionNum.test(this.ModeloTema.nroOrd)){
      trueOrFalse=true;
      M.toast({ html: 'Numero de orden no valido' });
    }
    else if(this.ModeloTema.nroOrd==undefined||this.ModeloTema.nroOrd==null||this.ModeloTema.nroOrd=="" ){
      trueOrFalse=true;
      M.toast({ html: 'Ingrese el numero de orden del tema' });
    }
    else if(this.timeEva==undefined||this.timeEva==null||this.timeEva==""){
      trueOrFalse=true;
      M.toast({ html: 'Ingrese el tiempo de duracion de la evaluacion' });
    }

    return trueOrFalse;
  }

  openModalOptLibro(fltOrOpt:string){

    var objMensaje={


      fltOrOpt:fltOrOpt,
      colCod: this.inputColCod

    }
    console.log(objMensaje);

    const dialogRef =this.dialog.open(ModalOptLibroComponent,{
      width: '450px',
      data: objMensaje,
    });

    dialogRef.afterClosed().subscribe(res=>{

    
     
    });   
  }

  ShowListarTema(libro: Libro){
    this.HideDivs();
    this.libroActual=libro;
    this.libCod=libro._id;
    this.divLibroPre=true;
    this.divListsubTema=false;
    this.ListarTema();
  }

  ShowCrearTema(){
    this.HideDivs();
    this.LimpiarFrmTema();
    this.nomBtnTem="Crear";
    this.divCrearTema=true;
  };

  LimpiarFrmTema(){
    this.ModeloTema= new Tema();
    this.timeEva=undefined;
  }

  CrearTema(){

    if(this.ValidarFrmTema()==true){

    }
    else{
      this.ModeloTema.temEvaTim=parseInt(this.timeEva);
      if(isNaN(this.ModeloTema.temEvaTim)){
        M.toast({ html: 'Tiempo no valido' });
      }
      else if(this.ModeloTema.temEvaTim<0){
        M.toast({ html: 'No aceptan valores negativos' });
      }
      else{

        this.ModeloTema.libCod=this.libCod;
        this.ModeloTema.colCod=this.inputColCod;
        if(this.ModeloTema._id){

          return this.temaService.putTema(this.ModeloTema)
          .subscribe(res=>{

            var status=res["status"];

            if(status==200){
              M.toast({ html: 'Se edito el tema!' });
              this.LimpiarFrmTema();
              this.ShowListarTema(this.libroActual);
              
            }
            else if(status==510){
              M.toast({ html: 'Ese tema ya existe' });
            }
            else{
              M.toast({ html: 'Hubo un error al editar' });
            }
          });
        }
        else{
          console.log(this.ModeloTema);
          return this.temaService.postTema(this.ModeloTema)
          .subscribe(res=>{

            var status=res["status"];

            if(status==200){
              M.toast({ html: 'Tema registrado!' });
              this.LimpiarFrmTema();
              this.ShowListarTema(this.libroActual);
              
            }
            else if(status==510){
              M.toast({ html: 'Ese tema ya existe' });
            }
            else{
              M.toast({ html: 'Hubo un error al registrar' });
            }
          });
        }
      }
    }
  }

  Pre_editarTema(tema:GetTema){

    console.log(tema);
    this.HideDivs();

    this.ModeloTema._id=tema._id;
    this.ModeloTema.temTtl=tema.temTtl;
    this.ModeloTema.temDes=tema.temDes;
    this.ModeloTema.nroOrd=tema.nroOrd.toString();
    this.timeEva= tema.temEvaTim.toString();
    this.ModeloTema.colCod=tema.colCod;
    this.ModeloTema.libCod=tema.libCod;
    this.nomBtnTem="Editar";
    this.divCrearTema=true;
    

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
    this.btnAgreSubTema=true;
    this.temTtl=tema.temTtl;
    this.temCodAct=tema._id;
    this.ListarSubTemas();
   
  }

  ListarSubTemas(){
    this.divTema=true;
    this.btnAgreSubTema=true;
    this.divListsubTema=true;

    return this.subTemaService.getSubTema(this.temCodAct,this.libroActual._id)
    .subscribe(res=>{
      this.arraySubTema = res as GetSubTema[];
    })
  }

  ShowCrearSubtema(){
    this.HideDivs();
    this.divTema=true;
    this.divListsubTema=true;
    this.divSubTema=true;
    this.ModeloSubTema=new Subtema();
    this.photoSelected=undefined;
  }

  ValidarFrmSubTema():boolean{

    var trueOrFalse=false;
    var expresionNum = /^[0-9]+$/;

    if(this.ModeloSubTema.subTemTtl==undefined||this.ModeloSubTema.subTemTtl==null||this.ModeloSubTema.subTemTtl==""){
      trueOrFalse=true;
      M.toast({ html: 'Ingrese un titulo' });
    }
    else if(this.ModeloSubTema.subTemDes==undefined||this.ModeloSubTema.subTemDes==null||this.ModeloSubTema.subTemDes==""){
      trueOrFalse=true;
      M.toast({ html: 'Ingrese una descripción' });
    }
    else if(this.ModeloSubTema.nroOrd==undefined||this.ModeloSubTema.nroOrd==null||this.ModeloSubTema.nroOrd==""){
      trueOrFalse=true;
      M.toast({ html: 'Ingrese un numero de orden' });
    }
    else if(!expresionNum.test(this.ModeloSubTema.nroOrd)){
      trueOrFalse=true;
      M.toast({ html: 'Numero de orden no valido' });
    }
    else if(this.ModeloSubTema.temCod==undefined||this.ModeloSubTema.temCod==null||this.ModeloSubTema.temCod==""){
      trueOrFalse=true;
      M.toast({ html: 'No se logro capturar el tema' });
    }
    else if(this.photoSelected==undefined||this.photoSelected==null){
      trueOrFalse=true;
      M.toast({ html: 'Debe de ingresar una imagen' });
    }


    return trueOrFalse;
  }

  CrearSubTema(){

    this.ModeloSubTema.libCod=this.libCod;
    this.ModeloSubTema.temCod=this.temCodAct;

    console.log(this.ModeloSubTema);
    console.log(this.file);

    if(this.ValidarFrmSubTema()==true){

    }
    else{
      if(this.ModeloSubTema._id){
        console.log("va a editar");
        return this.subTemaService.putSubTema(this.ModeloSubTema,this.file)
        .subscribe(res=>{
          console.log(res);
          var status=res["status"];

          if(status==200){
            M.toast({ html: 'Se edito el sub tema!' });
            this.limpiarFrmSubTema();
            this.ListarSubTemas();
            
          }
          else{
            M.toast({ html: 'Ocurrio un error' });
          }
            

        });
      }
      else{
        console.log("va a agregar");
        return this.subTemaService.postSubTema(this.ModeloSubTema,this.file)
        .subscribe(res=>{
          console.log(res);

          var status=res["status"];

          if(status==200){
            M.toast({ html: 'Se registro el sub tema!' });
            this.limpiarFrmSubTema();
            this.ListarSubTemas();
            
          }
          else{
            M.toast({ html: 'Ocurrio un error' });
          }
        });
      }
    } 
  };

  pre_EditarSubTema(subTema : GetSubTema){
    console.log(subTema);
    this.HideDivs();
    this.ModeloSubTema._id=subTema._id;
    this.ModeloSubTema.libCod=subTema.libCod;
    this.ModeloSubTema.temCod=subTema.temCod;
    this.ModeloSubTema.nroOrd=subTema.nroOrd.toString();
    this.ModeloSubTema.subTemTtl=subTema.subTemTtl;
    this.ModeloSubTema.subTemDes=subTema.subTemDes;
    this.photoSelected= this.URL+ subTema.imgCod.ImgAllRta;
    this.file=undefined;
    this.divTema=true;
    this.divSubTema=true;
  };

  limpiarFrmSubTema(){
    this.HideDivs();
    this.ModeloSubTema=new Subtema();
    this.photoSelected=undefined;
    this.file=undefined;
  }

  ShowVerEvaluacion(){
    this.HideDivs();
    this.divTema=true;
    this.appEvaluacion=true;
    this.evaluacionService.libro=this.libroActual;
    this.evaluacionService.tema=this.temActual;
  }

  /**  Llamada a selectores de grado, nivel, area y curso */
  CargarTablaGrados(){
    return this.gradoService.getGrados()
    .subscribe(res => {  
      this.arrayGrado = res as GetGrado[];
      
      this.arrayGrado.unshift({
        estCod: {
          _id: "..",
          estCod: "..",
          estNom: "..",
          estDes: "..",
          timestamp: "..",
          __v: 1
      },
      _id: "string",
      graNum: "..",
      graDes: "Seleccione Grado",
      colCod: {
          estCod: "..",
          _id: "..",
          colNom: "..",
          colRuc: "..",
          timestamp: "..",
          __v: 1
      },
      timestamp: "..",
      __v: 1
      });
      console.log(this.arrayGrado);
    });
  }

  CargarTablaNivel(){
    return this.nivelService.getNivel()
    .subscribe(res => {  
      this.arrayNivel = res as GetNivel[];
      this.arrayNivel.unshift({
        estCod: {
          _id: "..",
          estCod: "..",
          estNom: "..",
          estDes: "..",
          timestamp: "..",
          __v: 1
      },
      _id: "string",
      nivNum: "..",
      nivDes: "Seleccione Nivel",
      colCod: {
          estCod: "..",
          _id: "..",
          colNom: "..",
          colRuc: "..",
          timestamp: "..",
          __v: 1
      },
      timestamp: "..",
      __v: 1
      });
    });
  }

  getSltAreas(){
    this.mntAdminCrabbService.getAreas()
    .subscribe(res=>{
      this.arraySelectNucleoArea=res as NucleoArea[];
      this.arraySelectNucleoArea.unshift({
        _id:        "string",
        ncoAreNom:  "Seleccione el area",
        ncoAreDes:  "",
        estCod:     "",
        timestamp:  "",
      });
      this.ModeloNcoArea._id="string";
      let objCurso=[{
        _id:        "string",
        areCod:{
          estCod: "string",
          ncoAreNom: "string",
          timestamp: "string",
          __v: 0,
          _id: "string",
      },
        ncoCurNom:  "Seleccione el curso",
        ncoCurDes:  "",
        estCod:     "",
        timestamp:  "",
      }];
      this.arraySelectNucleocurso=objCurso;
      this.ModeloNcoCurso._id="string";
    });
  }

  getFltSltAreas(){
    this.mntAdminCrabbService.getAreas()
    .subscribe(res=>{
      this.arrayFltSltNucleoArea=res as NucleoArea[];
      this.arrayFltSltNucleoArea.unshift({
        _id:        "string",
        ncoAreNom:  "Seleccione el area",
        ncoAreDes:  "",
        estCod:     "",
        timestamp:  "",
      });
      this.ModeloNcoArea._id="string";
    });
    this.ModeloNcoCurso._id="string";
  }

  capturarFltArea_Curso(e){
    this.arraySelectNucleocurso=[];
    this.flt_areCod=e;
    const areCod=e;

    if(areCod=="string"){
      let objCurso=[{
        _id:        "string",
        areCod:{
          estCod: "string",
          ncoAreNom: "string",
          timestamp: "string",
          __v: 0,
          _id: "string",
      },
        ncoCurNom:  "Seleccione el curso",
        ncoCurDes:  "",
        estCod:     "",
        timestamp:  "",
      }];
      this.ModeloNcoCurso._id="string";
      this.arrayFltSltNucleoCurso=objCurso;
    }
    else{
      this.mntAdminCrabbService.getCursosArea(areCod)
    .subscribe(res=>{
      this.arrayFltSltNucleoCurso=res as GetNucleoCurso[];
      this.arrayFltSltNucleoCurso.unshift({
        _id:        "string",
        areCod:{
          estCod: "string",
          ncoAreNom: "string",
          timestamp: "string",
          __v: 0,
          _id: "string",
      },
        ncoCurNom:  "Seleccione el curso",
        ncoCurDes:  "",
        estCod:     "",
        timestamp:  "",
      });
      this.ModeloNcoCurso._id="string";
    });
    }
  }

  capturarArea_Curso(e){
    this.arraySelectNucleocurso=[];
    this.flt_areCod = e;
    const areCod=e;

    if(areCod=="string"){
      let objCurso=[{
        _id:        "string",
        areCod:{
          estCod: "string",
          ncoAreNom: "string",
          timestamp: "string",
          __v: 0,
          _id: "string",
      },
        ncoCurNom:  "Seleccione el curso",
        ncoCurDes:  "",
        estCod:     "",
        timestamp:  "",
      }];
      this.ModeloNcoCurso._id="string";
      this.arraySelectNucleocurso=objCurso;
    }
    else{
      this.mntAdminCrabbService.getCursosArea(areCod)
      .subscribe(res=>{
        this.arraySelectNucleocurso=res as GetNucleoCurso[];
        this.arraySelectNucleocurso.unshift({
          _id:        "string",
          areCod:{
            estCod: "string",
            ncoAreNom: "string",
            timestamp: "string",
            __v: 0,
            _id: "string",
        },
          ncoCurNom:  "Seleccione el curso",
          ncoCurDes:  "",
          estCod:     "",
          timestamp:  "",
        });
        this.ModeloNcoCurso._id="string";
      });
  
    }

    
  }

  /******************************************************* */
  Cancelar(opc:string){
    this.HideDivs();

    if(opc=="libro"){
      this.LimpiarFrmLibro();
      this.ShowListarLibros();
    }
    else if(opc=="tema"){
      this.ShowListarTema(this.libroActual);
    }
    else if(opc=="subtema"){
      this.limpiarFrmSubTema();
      this.photoSelected=undefined;
      this.divTema=true;
      this.divListsubTema=true;
    }

    this.btnAgreSubTema=true;
  }

  LimpiarFrmLibro(){
    this.ModeloNcoArea._id="string";
    this.ModeloNcoCurso._id="string";
    this.ModeloGrado._id="string";
    this.ModeloNivel._id="string";
    this.ModeloLibro=new Libro();
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
      console.log(this.file);
    }
  }

  ngOnInit() {
    this.ShowListarLibros();
    this.CargarTablaGrados();
    this.CargarTablaNivel();
    this.getSltAreas();
    this.getFltSltAreas;



    this.ModeloGrado._id=   "string";
    this.ModeloNivel._id=   "string";

    $(function(){
      $('.ui-state-default').click(function () {
        $('html, body').animate({
           scrollTop: $(document).height()
        }, 'slow');
        return false;
      });
    });
  }

}
