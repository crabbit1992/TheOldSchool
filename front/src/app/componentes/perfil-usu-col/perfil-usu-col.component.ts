import { Component, OnInit,AfterViewInit, OnDestroy  } from '@angular/core';
import { PerfilService } from '../../servicios/perfil.service';
import { Router} from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { delay, filter } from 'rxjs/operators';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable,Subscription } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { MatDialog } from '@angular/material';
import { ModalOptBarraComponent } from '../modal-opt-barra/modal-opt-barra.component';

import {  Perfil}  from '../../modelos/perfil';
import { PersonaRepositorioService } from '../../servicios/persona-repositorio.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { PersonaRepositorioComponent } from '../persona-repositorio/persona-repositorio.component';
import { MantenimientoCargoComponent } from '../mantenimiento-cargo/mantenimiento-cargo.component';
import { PeriodoComponent } from '../periodo/periodo.component';
import { GradoComponent } from '../grado/grado.component';
import { MatriculaComponent } from '../matricula/matricula.component';
import { PagoComponent } from '../pago/pago.component';

// Importacion de modelos
import { GaleriaCol }  from '../../modelos/galeria-col';
import { GetBioPortada }  from '../../modelos/biografia';

// Importacion de servicios
import { GaleriaColService }  from '../../servicios/galeria-col.service';
import { BiografiaService }  from '../../servicios/biografia.service';
import { ColegioService }  from '../../servicios/colegio.service';
import { PersonaRepositorio } from 'src/app/modelos/persona-repositorio';
import { MntAdminCrabbService } from 'src/app/servicios/mnt-admin-crabb.service';


declare var M: any;

// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-perfil-usu-col',
  templateUrl: './perfil-usu-col.component.html',
  styleUrls: ['./perfil-usu-col.component.css']
})
export class PerfilUsuColComponent implements OnInit, AfterViewInit, OnDestroy {

  readonly URL='http://localhost:3000';

  perRepCod:string
  colCod: string;

  elems: any;
  instances:any;

  rutaPtCentro: string;

  /**Referente al carousel */
  options = { fullWidth: false,pressed:true };

  /********************************************************* */
  hrefs = ['one', 'two', 'three', 'four', 'five'];


  perfil: Perfil=new Perfil();
  perfilArray:Perfil[];
  errorMessage: string;

  imgPtCentro: GaleriaCol=new GaleriaCol();
  imgPtIzquierda: GaleriaCol=new GaleriaCol();
  imgPtDerecha: GaleriaCol=new GaleriaCol();

  arrayImgs: GetBioPortada[];
  arrayPortadas: GetBioPortada[];

 
  rutaPtIzquierda: string;
  rutaPtDerecha: string;


  // Interaccion de Div´s
  divPfl:boolean=true;
  divPflBody:boolean=false;
  divNavBar:boolean=false;

  //Tipo de perfil
  tipoPerfil:string="";
  perfilActual:string="";
  colegioActual:string="";
  NombreColegio:string="";
  codMbr:string="";

  //Privilegios de perfiles 
  btnMiembros:boolean=false;
  btnColegio:boolean=false;
  btnCentroAlum:boolean=false;
  btnCentroDocen:boolean=false;
  btnArchivo:boolean=false;
  btnPerfil:boolean=false;

  //SubPrivilegios del boton btnMntPerfil
   btnRepositorioPers:boolean=false;
   btngestionPerfiles:boolean=false;

   btnPeriodo:boolean=false;
   btnMntAulaVir:boolean=false;
   btnMntMatricula:boolean=false;
   btnCronoActi:boolean=false;
   btnPerfilCol:boolean=false;
   btnPagos:boolean=false;

   btnCursosAlu:boolean=false;
   btnLibros:boolean=false;
   btnlistAlum:boolean=false;
   btnMisNotas:boolean=false;
   btnMiRank:boolean=false;
   btnMiHorar:boolean=false;
   btnMiCrono:boolean=false;
   btnCronoAlu:boolean=false;

   btnCursosDoc:boolean=false;
   btnlistDoc:boolean=false;
   btnPnaNta:boolean=false;
   btnCronoDoc:boolean=false;
   btnHorarioDoc:boolean=false;

   btnHistReg:boolean=false;
   btnHistNot:boolean=false;


   /* Interacion de llamadas a componentes  */

   mantenimientoCargo:boolean=false;
   repositorioPersonas:boolean=false;
   periodo:boolean=false;
   aulaVirtual:boolean=false;
   matricula:boolean=false;
   curso:boolean=false;
   planillaNotas:boolean=false;
   perfilColegio:boolean=false;
   pagos:boolean=false;
   libro:boolean=false;

   /**Div auxiliar */
   divAuxiliar:boolean=false;



   /** */
   var_clickHidenSubMnu:number=0;
   var_clickUl_Miem:number=0;
   var_clickUl_Cole:number=0;
   var_clickUl_CtoAlu:number=0;
   var_clickUl_CtoDct:number=0;
   var_clickUl_Ach:number=0;
   var_Menu:number=0;

  persona: PersonaRepositorio=new PersonaRepositorio();
  lblNomUser:string="";

  lnSchoolTtl: string="LnSchool";

   

/**************************************************************************************** */

  constructor(
    private perfilService:PerfilService,
    private rutas:Router,
    private rutaActiva: ActivatedRoute,
    private galeriaColService:GaleriaColService,
    private biografiaService:BiografiaService,
    private colegioService:ColegioService,
    private personaRepositorioService:PersonaRepositorioService,
    private breakpointObserver: BreakpointObserver,
    public  dialog            : MatDialog,
    private mntAdminCrabbService:MntAdminCrabbService,
    ) { }

  GP:{
    colCod: string
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
  );


  HiddenUls(){
    this.var_clickUl_Miem=0;
    this.var_clickUl_Cole=0;
    this.var_clickUl_CtoAlu=0;
    this.var_clickUl_CtoDct=0;
    this.var_clickUl_Ach=0;
  }

  clickShowMenu(){
    this.var_Menu=this.var_Menu+1;
    console.log(this.var_Menu);
    if(this.var_Menu==2){
      this.var_Menu=0;
    }
  }

  clickUl_Perfil(){
    this.var_clickUl_Miem=0;
  }

  clickUl_Miem(){
    this.var_clickUl_Cole=0;
    this.var_clickUl_CtoAlu=0;
    this.var_clickUl_CtoDct=0;
    this.var_clickUl_Ach=0;

    this.var_clickUl_Miem=this.var_clickUl_Miem+1;
    console.log(this.var_clickUl_Miem);
    if(this.var_clickUl_Miem==2){
      this.var_clickUl_Miem=0;
    }
  }

  clickUl_Cole(){
    this.var_clickUl_Miem=0;
    this.var_clickUl_CtoAlu=0;
    this.var_clickUl_CtoDct=0;
    this.var_clickUl_Ach=0;

    this.var_clickUl_Cole=this.var_clickUl_Cole+1;
    console.log(this.var_clickUl_Cole);
    if(this.var_clickUl_Cole==2){
      this.var_clickUl_Cole=0;
    }
  }

  clickUl_CtoAlu(){
    this.var_clickUl_Miem=0;
    this.var_clickUl_Cole=0;
    this.var_clickUl_CtoDct=0;
    this.var_clickUl_Ach=0;

    this.var_clickUl_CtoAlu=this.var_clickUl_CtoAlu+1;
    console.log(this.var_clickUl_CtoAlu);
    if(this.var_clickUl_CtoAlu==2){
      this.var_clickUl_CtoAlu=0;
    }
  }

  clickUl_CtoDct(){
    this.var_clickUl_Miem=0;
    this.var_clickUl_Cole=0;
    this.var_clickUl_CtoAlu=0;
    this.var_clickUl_Ach=0;

    this.var_clickUl_CtoDct=this.var_clickUl_CtoDct+1;
    console.log(this.var_clickUl_CtoDct);
    if(this.var_clickUl_CtoDct==2){
      this.var_clickUl_CtoDct=0;
    }
  }

  clickUl_Ach(){
    this.var_clickUl_Miem=0;
    this.var_clickUl_Cole=0;
    this.var_clickUl_CtoAlu=0;
    this.var_clickUl_CtoDct=0;

    this.var_clickUl_Ach=this.var_clickUl_Ach+1;
    console.log(this.var_clickUl_Ach);
    if(this.var_clickUl_Ach==2){
      this.var_clickUl_Ach=0;
    }
  }
 




 DeshabilitarComponentes(){
    this.mantenimientoCargo=false;
    this.repositorioPersonas=false;
    this.periodo=false;
    this.aulaVirtual=false;
    this.matricula=false;
    this.curso=false;
    this.planillaNotas=false;
    this.perfilColegio=false;
    this.pagos=false;
    this.libro=false;
    this.clickShowMenu();
 }

 LlamarCpLibro(){
  this.DeshabilitarComponentes();
  this.libro=true;
}

 LlamarCpMntPagos(){
  this.DeshabilitarComponentes();
  this.pagos=true;
}

 LlamarCpMntPerfilColegio(){
    this.DeshabilitarComponentes();
    this.perfilColegio=true;
 }

 LlamarCpMntPlanillaNotas(){
    this.DeshabilitarComponentes();
    this.planillaNotas=true;
 }

 LlamarCpMntCargo(){
  this.DeshabilitarComponentes();
  this.mantenimientoCargo=true;
 }

 LlamarCpRepPersonas(){
  this.DeshabilitarComponentes();
  

   this.repositorioPersonas=true;
 }

 LlamarCpPeriodo(){
  this.DeshabilitarComponentes();
  this.periodo=true;
 }

 LlamarCpMntAuVirtual(){
  this.DeshabilitarComponentes();
  this.aulaVirtual=true;
 }

 LlamarCpMntMatricula(){
  this.DeshabilitarComponentes();
  this.matricula=true;
 }

 LlamarCpCurso(){
  this.DeshabilitarComponentes();
  this.curso=true;
 }
 
  CargarPerfilColegio() {

    console.log("Entro");
    this.DeshabilitarComponentes();
    this.perRepCod= JSON.parse(localStorage.getItem('idPerRep'));
    this.perRepCod= this.mntAdminCrabbService.decript(this.perRepCod);
    this.colCod= JSON.parse(localStorage.getItem('col'));
    this.colCod= this.mntAdminCrabbService.decript(this.colCod);

    console.log("Esto es el colegio :" + this.colCod);
    console.log("Esto es el perRepCod :" + this.perRepCod);

    this.GetNomUser();

    this.perfilService.getPerfilUsuarioColegio(this.perRepCod,this.colCod)
      .subscribe(res => {
        this.perfilArray=res as Perfil[];
        console.log(res)
        this.getPortadas();
      },
        error => this.errorMessage = <any>error);
  }

  DeshabilitarBotones(){
    this.btnMiembros=false;
    this.btnColegio=false;
    this.btnCentroAlum=false;
    this.btnCentroDocen=false;
    this.btnArchivo=false;
    this.btnPerfil=false;

    this.btnRepositorioPers=false;
    this.btngestionPerfiles=false;

    this.btnPeriodo=false;
    this.btnMntAulaVir=false;
    this.btnMntMatricula=false;
    this.btnCronoActi=false;
    this.btnPerfilCol=false;
    this.pagos=false;

    this.btnCursosAlu=false;
    this.btnLibros=false;
    this.btnlistAlum=false;
    this.btnMisNotas=false;
    this.btnMiRank=false;
    this.btnMiHorar=false;
    this.btnMiCrono=false;

    this.btnCursosDoc=false;
    this.btnlistDoc=false;
    this.btnCronoDoc=false;
    this.btnHorarioDoc=false;
    this.btnPnaNta=false;
    

    this.btnHistReg=false;
    this.btnHistNot=false;
  }

  TipoPerfil(){


    this.perfilActual=this.mntAdminCrabbService.decript(this.perfilActual);

    this.DeshabilitarComponentes();
    this.DeshabilitarBotones();

    if(this.perfilActual=="5e0a9164c2a58d0b8872b2b8"){                //Administrador
      
      this.btnMiembros=true;              //Botones principales
      this.btnColegio=true;               //Botones principales
      this.btnCentroAlum=true;            //Botones principales
      this.btnCentroDocen=true;           //Botones principales
      this.btnArchivo=true;               //Botones principales
      this.btnPerfil=true;                //Botones principales
      

      this.btnRepositorioPers=true;       //Botones Secundarios     (btnMiembros)
      this.btngestionPerfiles=true;       //Botones Secundarios     (btnMiembros)

      this.btnPeriodo=true;               //Botones Secundarios     (btnColegio)  
      this.btnMntAulaVir=true;            //Botones Secundarios     (btnColegio)
      this.btnMntMatricula=true;
      this.btnCronoActi=false;             //Botones Secundarios     (btnColegio)
      this.btnPerfilCol=true;             //Botones Secundarios     (btnColegio)
      this.btnPagos=true;

      this.btnCursosAlu=true;             //Botones Secundarios     (btnCentroAlum)
      this.btnLibros=true;             //Botones Secundarios     (btnCentroAlum)
      this.btnlistAlum=false;              //Botones Secundarios     (btnCentroAlum)

      this.btnCursosDoc=false;             //Botones Secundarios     (btnCentroDocen)
      this.btnlistDoc=false;               //Botones Secundarios     (btnCentroDocen)
      this.btnPnaNta=false;               //Botones Secundarios     (btnCentroDocen)
      this.btnCronoDoc=false;              //Botones Secundarios     (btnCentroDocen)
      this.btnHorarioDoc=false;            //Botones Secundarios     (btnCentroDocen)


      this.btnHistReg=false;               //Botones Secundarios     (btnArchivo)
      this.btnHistNot=false;               //Botones Secundarios     (btnArchivo)

    }

    if(this.perfilActual=="5e0a916dc2a58d0b8872b2b9"){                //Director

      this.btnMiembros=true;              //Botones principales
      this.btnColegio=true;               //Botones principales
      this.btnCentroAlum=true;            //Botones principales
      this.btnCentroDocen=true;           //Botones principales
      this.btnArchivo=true;               //Botones principales
      this.btnPerfil=true;                //Botones principales

      this.btnRepositorioPers=true;       //Botones Secundarios     (btnMiembros)
      this.btngestionPerfiles=true;       //Botones Secundarios     (btnMiembros)

      this.btnPeriodo=true;               //Botones Secundarios     (btnColegio)  
      this.btnMntAulaVir=true;            //Botones Secundarios     (btnColegio)
      this.btnMntMatricula=true;
      this.btnCronoActi=false;             //Botones Secundarios     (btnColegio)
      this.btnPerfilCol=true;             //Botones Secundarios     (btnColegio)
      this.btnPagos=true;

      this.btnCursosAlu=true;             //Botones Secundarios     (btnCentroAlum)
      this.btnLibros=true;             //Botones Secundarios     (btnCentroAlum)
      this.btnlistAlum=false;              //Botones Secundarios     (btnCentroAlum)

      this.btnCursosDoc=false;             //Botones Secundarios     (btnCentroDocen)
      this.btnlistDoc=false;               //Botones Secundarios     (btnCentroDocen)
      this.btnPnaNta=false;               //Botones Secundarios     (btnCentroDocen)
      this.btnCronoDoc=false;              //Botones Secundarios     (btnCentroDocen)
      this.btnHorarioDoc=false;            //Botones Secundarios     (btnCentroDocen)


      this.btnHistReg=false;               //Botones Secundarios     (btnArchivo)
      this.btnHistNot=false;               //Botones Secundarios     (btnArchivo)

    }

    if(this.perfilActual=="5e0a9176c2a58d0b8872b2ba"){            //Subdirector

      this.btnMiembros=true;              //Botones principales   
      this.btnColegio=true;               //Botones principales
      this.btnCentroAlum=true;            //Botones principales
      this.btnCentroDocen=true;           //Botones principales
      this.btnArchivo=true;               //Botones principales
      this.btnPerfil=true;                //Botones principales

      this.btnRepositorioPers=true;       //Botones Secundarios  (btnMiembros)
      this.btngestionPerfiles=true;       //Botones Secundarios  (btnMiembros)


      this.btnMntAulaVir=true;            //Botones Secundarios  (btnColegio)
      this.btnMntMatricula=true;
      this.btnCronoActi=false;             //Botones Secundarios  (btnColegio)
      this.btnPerfilCol=false;             //Botones Secundarios  (btnColegio)
      this.btnPagos=true;

      this.btnCursosAlu=true;             //Botones Secundarios     (btnCentroAlum)
      this.btnLibros=true;             //Botones Secundarios     (btnCentroAlum)
      this.btnlistAlum=false;              //Botones Secundarios     (btnCentroAlum)

      this.btnCursosDoc=false;             //Botones Secundarios     (btnCentroDocen)
      this.btnlistDoc=false;               //Botones Secundarios     (btnCentroDocen)
      this.btnPnaNta=false;               //Botones Secundarios     (btnCentroDocen)
      this.btnCronoDoc=false;              //Botones Secundarios     (btnCentroDocen)
      this.btnHorarioDoc=false;            //Botones Secundarios     (btnCentroDocen)


      this.btnHistReg=false;               //Botones Secundarios     (btnArchivo)
      this.btnHistNot=false;               //Botones Secundarios     (btnArchivo)       
    }           
            
    if(this.perfilActual=="5e0a917ec2a58d0b8872b2bb"){            //Coordinador
      this.btnMiembros=true;              //Botones principales   
      this.btnColegio=true;               //Botones principales
      this.btnCentroAlum=true;            //Botones principales
      this.btnCentroDocen=true;           //Botones principales
      this.btnArchivo=true;               //Botones principales
      this.btnPerfil=true;                //Botones principales

      this.btnRepositorioPers=true;       //Botones Secundarios  (btnMiembros)
      this.btngestionPerfiles=true;       //Botones Secundarios  (btnMiembros)


      this.btnMntAulaVir=true;            //Botones Secundarios  (btnColegio)
      this.btnMntMatricula=true;
      this.btnCronoActi=false;             //Botones Secundarios  (btnColegio)
      this.btnPerfilCol=false;             //Botones Secundarios  (btnColegio)

      this.btnCursosAlu=true;             //Botones Secundarios     (btnCentroAlum)
      this.btnLibros=true;             //Botones Secundarios     (btnCentroAlum)
      this.btnlistAlum=false;              //Botones Secundarios     (btnCentroAlum)

      this.btnCursosDoc=false;             //Botones Secundarios     (btnCentroDocen)
      this.btnlistDoc=false;               //Botones Secundarios     (btnCentroDocen)
      this.btnPnaNta=false;               //Botones Secundarios     (btnCentroDocen)
      this.btnCronoDoc=false;              //Botones Secundarios     (btnCentroDocen)
      this.btnHorarioDoc=false;            //Botones Secundarios     (btnCentroDocen)

      this.btnHistReg=false;               //Botones Secundarios     (btnArchivo)
      this.btnHistNot=false;               //Botones Secundarios     (btnArchivo)   
    }     
    
    if(this.perfilActual=="5e0a918cc2a58d0b8872b2bc"){            //Secretaria
      this.btnMiembros=true;              //Botones principales
      this.btnColegio=true;               //Botones principales
      this.btnCentroAlum=true;            //Botones principales
      this.btnCentroDocen=false;           //Botones principales
      this.btnArchivo=true;               //Botones principales
      this.btnPerfil=true;                //Botones principales

      this.btnRepositorioPers=true;       //Botones Secundarios     (btnMiembros)
      this.btngestionPerfiles=true;       //Botones Secundarios     (btnMiembros)

      this.btnCronoActi=false;             //Botones Secundarios     (btnColegio)
      this.btnPerfilCol=false;             //Botones Secundarios     (btnColegio)
      this.btnMntAulaVir=true;            //Botones Secundarios  (btnColegio)
      this.btnMntMatricula=true;
      this.btnPagos=true;

      this.btnCursosAlu=true;             //Botones Secundarios     (btnCentroAlum)
      this.btnLibros=true;             //Botones Secundarios     (btnCentroAlum)
      this.btnlistAlum=false;              //Botones Secundarios     (btnCentroAlum)

      this.btnCursosDoc=true;             //Botones Secundarios     (btnCentroDocen)
      this.btnlistDoc=false;               //Botones Secundarios     (btnCentroDocen)
      this.btnCronoDoc=false;              //Botones Secundarios     (btnCentroDocen)
      this.btnHorarioDoc=false;            //Botones Secundarios     (btnCentroDocen)

      this.btnHistReg=false;               //Botones Secundarios     (btnArchivo)
      this.btnHistNot=false;               //Botones Secundarios     (btnArchivo) 
    } 
            
    if(this.perfilActual=="5e0a9197c2a58d0b8872b2be"){            //Profesor
      this.btnMiembros=false;              //Botones principales
      this.btnColegio=true;               //Botones principales
      this.btnCentroAlum=true;            //Botones principales
      this.btnCentroDocen=true;           //Botones principales
      this.btnArchivo=true;               //Botones principales
      this.btnPerfil=true;                //Botones principales

      this.btngestionPerfiles=false;       //Botones Secundarios

      this.btnPagos=false                  //Botones Secundarios
      this.btnMntAulaVir=true;
      

      this.btnCronoActi=false;             //Botones Secundarios
      this.btnPerfilCol=false;             //Botones Secundarios

      this.btnCursosAlu=true;             //Botones Secundarios
      this.btnLibros=true;             //Botones Secundarios     (btnCentroAlum)
      this.btnlistAlum=false;              //Botones Secundarios

      this.btnCursosDoc=false;             //Botones Secundarios
      this.btnlistDoc=false;               //Botones Secundarios
      this.btnPnaNta=true;
      this.btnCronoDoc=false;              //Botones Secundarios
      this.btnHorarioDoc=false;            //Botones Secundarios

      this.btnHistReg=false;               //Botones Secundarios
      this.btnHistNot=false;               //Botones Secundarios  
      console.log("esta en Profesor!!!!!");

    } 

    if(this.perfilActual=="5e0a9191c2a58d0b8872b2bd"){ //Auxiliar
      this.btnMiembros=true;              //Botones principales
      this.btnColegio=true;               //Botones principales
      this.btnCentroAlum=true;            //Botones principales
      this.btnCentroDocen=true;           //Botones principales
      this.btnArchivo=true;               //Botones principales
      this.btnPerfil=true;                //Botones principales

      this.btngestionPerfiles=true;       //Botones Secundarios     (btnMiembros)

      this.btnCronoActi=true;             //Botones Secundarios     (btnColegio)
      this.btnPerfilCol=true;             //Botones Secundarios     (btnColegio)

      this.btnCursosAlu=true;             //Botones Secundarios     (btnCentroAlum)
      this.btnLibros=true;             //Botones Secundarios     (btnCentroAlum)
      this.btnlistAlum=true;              //Botones Secundarios     (btnCentroAlum)

      this.btnlistDoc=true;               //Botones Secundarios     (btnCentroDocen)
      this.btnHorarioDoc=true;            //Botones Secundarios     (btnCentroDocen)

    }

    if(this.perfilActual=="5e0a91bbc2a58d0b8872b2bf"){ //Alumno
      this.btnColegio=true;               //Botones principales
      this.btnCentroAlum=true;            //Botones principales
      this.btnCentroDocen=true;           //Botones principales
      this.btnPerfil=true;                //Botones principales

      this.btnCronoActi=true;             //Botones Secundarios     (btnColegio)
      this.btnPerfilCol=true;             //Botones Secundarios     (btnColegio)

      this.btnCursosAlu=true;             //Botones Secundarios     (btnCentroAlum)
      this.btnlistAlum=true;              //Botones Secundarios     (btnCentroAlum)
      this.btnMiRank=false;
      this.btnMiHorar=false;
      this.btnMiCrono=false;
      this.btnCronoAlu=false;

      this.btnlistDoc=true;               //Botones Secundarios     (btnCentroDocen)
      this.btnHorarioDoc=true;            //Botones Secundarios     (btnCentroDocen)
    }
    this.var_Menu=0;
    this.HiddenUls();
    
  }

  HideDivPerfil(perfil:Perfil){
    this.divAuxiliar=false;
    var perfilCargo=perfil.carCod._id;

    if(perfil.carCod._id=="5e0a91c3c2a58d0b8872b2c0"||perfil.carCod._id=="5e0a91bbc2a58d0b8872b2bf"){
      this.perfilService.sendCargo=perfilCargo;

      perfilCargo=this.mntAdminCrabbService.encript(perfilCargo);
   
      localStorage.setItem('prfactcod',JSON.stringify(perfilCargo));
      this.rutas.navigateByUrl('/intranet');
    }
    else{
      perfilCargo=this.mntAdminCrabbService.encript(perfilCargo);

      this.divAuxiliar=true;
      this.divPfl=false;
      this.DeshabilitarComponentes();
      this.divPflBody=true;
      this.divNavBar=true;
  
      this.tipoPerfil=perfil.carCod.carNom;
  
      this.perfilActual=perfilCargo;
      console.log(this.perfilActual);
      this.colegioActual=perfil.colCod._id;
      this.NombreColegio=perfil.colCod.colNom;
      this.codMbr=perfil.codMiem;
      localStorage.setItem('prfactcod',JSON.stringify(perfilCargo));
      this.TipoPerfil();
  
      console.log(perfil);
      console.log(this.codMbr);
    }
  }

  ShowDivPerfil(){
    this.DeshabilitarComponentes();
    this.CargarPerfilColegio();
    this.divPfl=true;
    this.divPflBody=false;
    this.divNavBar=false;
    this.divAuxiliar=false;
  }

  CerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('idPerRep');
    localStorage.removeItem('col');
    localStorage.removeItem('dni');
    localStorage.removeItem('prfactcod');

    this.rutas.navigateByUrl("login");
  }

 

  getPortadas(){

      this.biografiaService.getPortadas(this.colCod)
      .subscribe(res=>{
      this.arrayPortadas=res as GetBioPortada[];
      console.log(this.arrayPortadas);


      setTimeout(() => {
        this.elems = document.querySelectorAll('.carousel');
        this.instances = M.Carousel.init(this.elems, this.options);

      }, 100);
    });
   
  }


  CallModalOptBarra( ){


    const mensaje="2";

    const dialogRef =this.dialog.open(ModalOptBarraComponent,{
      width: '250px',
      data: mensaje,
      
      
    });
    dialogRef.afterClosed().subscribe(res=>{

      const opc=this.perfilService.opcBarraModalSelected;
      if(opc=="1"){
        localStorage.removeItem('token');
        localStorage.removeItem('idPerRep');
        localStorage.removeItem('col');
        localStorage.removeItem('dni');
        localStorage.removeItem('prfactcod');
    
        this.rutas.navigateByUrl("inicio");
        this.perfilService.opcBarraModalSelected="";
      }
      else if(opc=="2"){
        this.rutas.navigateByUrl("perfil");

      }
  

    }); 
  }

  GetNomUser(){
    this.personaRepositorioService.getPersonaById(this.perRepCod)
    .subscribe(res=>{
      this.persona=res as PersonaRepositorio;
      this.lblNomUser=this.persona.perRepNom + ", " + this.persona.perRepApe;
      console.log(this.lblNomUser);
    })
  }
 

  ngOnInit(){
    this.divAuxiliar=false;
    
    this.CargarPerfilColegio();
    

  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.elems = document.querySelectorAll('.carousel');
      this.instances = M.Carousel.init(this.elems, this.options);
      
    }, 200);

  }

  ngOnDestroy(){
    console.log("destruir");
    this.elems;
    this.instances;
  }

  

}
