import { Component, OnInit,AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { ModalOptBarraComponent } from '../modal-opt-barra/modal-opt-barra.component';

import { delay, filter } from 'rxjs/operators';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable,Subscription } from 'rxjs';
import { map, share } from 'rxjs/operators';




// Importacion de servicios
import { GaleriaColService }  from '../../servicios/galeria-col.service';
import { PerfilService } from '../../servicios/perfil.service';
import { BiografiaService } from '../../servicios/biografia.service';
import { AulaCursoService } from '../../servicios/aula-curso.service';
import { NotaService } from '../../servicios/nota.service';
import { PromedioService } from '../../servicios/promedio.service';
import { ColegioService } from '../../servicios/colegio.service';
import { DetallePeriodoService } from '../../servicios/detalle-periodo.service';
import { HorarioService } from '../../servicios/horario.service'; 
import { MatriculaService } from '../../servicios/matricula.service'; 
import { MantenimientoCargoService } from '../../servicios/mantenimiento-cargo.service'; 
import { PersonaRepositorioService } from '../../servicios/persona-repositorio.service';
import { MntAdminCrabbService } from 'src/app/servicios/mnt-admin-crabb.service';
import { LibroService } from 'src/app/servicios/libro.service';

import {Router} from '@angular/router';

import {Perfil}  from '../../modelos/perfil';

// Importacion de modelos
import { GaleriaCol }  from '../../modelos/galeria-col';
import { GetBioPortada } from '../../modelos/biografia';
import { GetAulaCurso } from '../../modelos/aula-curso';
import { Promedio,PromedioArea, PromedioCursos,GetLibretaTrimestral,GetLibretaBimestral } from '../../modelos/promedio';
import { DetallePeriodo } from '../../modelos/detalle-periodo';
import { GetAlumApo } from '../../modelos/alumno';
import { MisMatriculas,Matricula } from '../../modelos/matricula';
import { GetHorario,HorarioModal }  from '../../modelos/horario';
import { Nota, GetNotaSegunTipo, GetNotasFiltradas } from 'src/app/modelos/nota';
import { PersonaRepositorio } from 'src/app/modelos/persona-repositorio';
import { DomSanitizer } from '@angular/platform-browser';
import { Agenda, getAgenda }  from '../../modelos/agenda'; 
/******* Importacion de Servicios******** */
import { AgendaService } from '../../servicios/agenda.service';
//import { DatasocketService } from '../../servicios/datasocket.service';

/**  importacion de componentes */
import { PagoComponent } from '../../componentes/pago/pago.component';
import { PagoService } from 'src/app/servicios/pago.service';
import { ArrayPago } from 'src/app/modelos/pago';


declare const M

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-vista-alumno',
  templateUrl: './vista-alumno.component.html',
  styleUrls: ['./vista-alumno.component.css']
})
export class VistaAlumnoComponent implements OnInit {


  readonly URL='http://localhost:3000';

  autoplay:any;
  elems: any;
  instances:any;

  id_agenda:string;

  cargoActual:string;
  perfil: Perfil=new Perfil();
  errorMessage: string;

  arrayAgenda:getAgenda[];


  colegios:Perfil[];
  arrayColegio: Perfil[];
  arrayPortadas: GetBioPortada[];
  arrayAulaCurso: GetAulaCurso[];
  arrayHorario      : GetHorario[];
  arrayPromArea     : PromedioArea[];
  arrayPromCursos   : PromedioCursos[];
  arrayDetallePromNta: GetNotaSegunTipo[];
  arrayNotasFiltradas:  GetNotasFiltradas[];

  arrayAlumApo: GetAlumApo[];

  modeloGetAgenda:getAgenda= new getAgenda();



  arrayMisMatriculas: MisMatriculas[];
  gradoSelected: string;
  arrayLibreta:  GetLibretaTrimestral[];
  arrayLibretaBi:  GetLibretaBimestral[];
  sabadoDisable  :boolean=true;

  lblCiclo: string="Sin datos";
  nroClo: string;
  cicloLibreta:string;
  lblLibCiclo:string;
  lblGradoNivel:string;
  lblAreaLibreta:string;
  lblCurso:string;


  divNavBar:boolean=false;

  perRepCod:string;
  aluCod:string;
  alvCod:string;
  prdCod:string;
  colCod:string;

  /** divs */
  divCursos:boolean=false;
  divPromArea:boolean=false;
  divPromedioCursos:boolean=false;
  divDetallePromCursos:boolean=false;
  divDetalleSgnTpoNta:boolean=false;
  divNotas: boolean=false;
  divLibreta: boolean=false;
  divHorario: boolean=true;
  divCronograma: boolean=false;
  divListarPago:boolean=true;
  divPago:boolean=false;

  divlibPromedioCursos:boolean=false;
  divlibDetallePromCursos:boolean=false;
  divlibHstSgnTpoNta:boolean=false;
  divSelectAlum:boolean=false;
  opcMnuVarMisAlu:boolean=false;
  libTriBi:boolean=false; //Si libreta es bimetral sera true

  divSinRegistros:boolean=false;

  persona: PersonaRepositorio=new PersonaRepositorio();
  lblNomUser:string="";

  var_Menu:number=0;
  varHro:boolean=false;
  
  divListarAgenda:boolean=false;
  divDetalleAgenda:boolean=false;

  arrayPago: ArrayPago[];
  arrayPagoFilter: ArrayPago[];

  pagocomponent:PagoComponent;
  lnSchoolTtl: string="LnSchool";

  graCod:string;
  nivCod:string;
  curCod:string;
  divLibroEva:  boolean=false;

  /**Referente al carousel */
  options = { fullWidth: false,pressed:true, duration:300, indicators: false };

  constructor(
    private perfilService:PerfilService,
    private rutas:Router,
    private biografiaService:BiografiaService,
    private notaService:NotaService,
    private aulaCursoService:AulaCursoService,
    private promedioService:PromedioService,
    private detallePeriodoService:DetallePeriodoService,
    private horarioService:HorarioService,
    private matriculaService:MatriculaService,
    private mantenimientoCargoService: MantenimientoCargoService,
    public  dialog            : MatDialog,
    private breakpointObserver: BreakpointObserver,
    private personaRepositorioService:PersonaRepositorioService,
    private mntAdminCrabbService:MntAdminCrabbService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private agendaService:AgendaService,
    private pagoService:PagoService,
    private libroService:LibroService,
  ) {
    this.matIconRegistry.addSvgIcon(
      "detalle",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/editar.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "eliminar",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/eliminar.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "libro-abierto",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/libro-abierto.svg")
    );
   }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
  );

  HideDivs(){
    this.divCursos=false;
    this.divNotas=false;
    this.divPromArea=false;
    this.divPromedioCursos=false;
    this.divDetallePromCursos=false;
    this.divDetalleSgnTpoNta=false;
    this.divLibreta=false;
    this.divCronograma=false;
    this.divHorario=false;

    this.divSinRegistros=false;
    this.libTriBi=false;
    this.divlibPromedioCursos=false;
    this.divlibDetallePromCursos=false;
    this.divlibHstSgnTpoNta=false;
    this.divSelectAlum=false;
    this.divListarAgenda=false;
    this.divDetalleAgenda=false;
    this.divListarPago=false;
    this.divPago=false;
    this.divLibroEva=false;
  }

  ShowLibroEva(curso: GetAulaCurso){
    console.log(window.navigator.onLine);
    console.log(curso);
    this.curCod=curso.curCod._id;
    this.HideDivs();
    this.getMatriculaActual();
    
  }

  clickShowMenu(){
    this.var_Menu=this.var_Menu+1;
 
    if(this.var_Menu==2){
      this.var_Menu=0;
    }
  }

  CallModalOptBarra(){


    const mensaje="3";

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
        this.perfilService.opcBarraModalSelected="";
      }
      else if(opc=="3"){
        this.rutas.navigateByUrl("perfil/colegio");
        this.perfilService.opcBarraModalSelected="";
      }
  

    }); 
  }

  GetNomUser(){
    let persona_id=JSON.parse(localStorage.getItem('idPerRep'));
    
    persona_id=this.mntAdminCrabbService.decript(persona_id);

    this.personaRepositorioService.getPersonaById(persona_id)
    .subscribe(res=>{
      this.persona=res as PersonaRepositorio;
      this.lblNomUser=this.persona.perRepNom + ", " + this.persona.perRepApe;
  
    })
  }

  ShowMisAlumnos(){
    this.divSinRegistros=false;
    this.arrayHorario=undefined;
    this.arrayLibreta=[];
    this.arrayPromArea=[];
    this.alvCod=undefined;
    this.HideDivs();
    this.divNavBar=false;
    this.divSelectAlum=true;


  }

  ValidarTipoUsuario() {

    var pfl= JSON.parse(localStorage.getItem('prfactcod'));
    var colCod= JSON.parse(localStorage.getItem('col'));
    this.perRepCod= JSON.parse(localStorage.getItem('idPerRep'));

    pfl= this.mntAdminCrabbService.decript(pfl);
    this.perRepCod= this.mntAdminCrabbService.decript(this.perRepCod);
    colCod= this.mntAdminCrabbService.decript(colCod);
    this.getPagoUser(colCod);

    let cargo= pfl;
    if(cargo=="5e0a91c3c2a58d0b8872b2c0"){ //apoderado
      
      this.cargoActual="5e0a91c3c2a58d0b8872b2c0";
      this.HideDivs();
      this.divSelectAlum=true;
      this.mantenimientoCargoService.getAlumnosApoderado(colCod,this.perRepCod)
      .subscribe(res=>{
        this.opcMnuVarMisAlu=true;
        this.divSelectAlum=true;
        this.arrayAlumApo=res as GetAlumApo[];
       console.log(this.arrayAlumApo)
      })

      this.divNavBar=false;
    }
    else if(cargo=="5e0a91bbc2a58d0b8872b2bf"){ //alumno
      
      this.cargoActual="5e0a91bbc2a58d0b8872b2bf";
      this.opcMnuVarMisAlu=false;
      this.divSelectAlum=false;
      this.divNavBar=true;
      this.CargarCursos();
    }

    
  }

  FormatearPromedio(promedio: number){

    var prom;

    if(promedio<10){
      prom= "0"+promedio;
      return prom;
    }
    else{
      return promedio;
    }


  }

  SeleccionarAlumno(alumno: GetAlumApo){
    this.perRepCod=alumno.perRepCod._id;
    this.prdCod=undefined;
    this.lblCiclo="Sin datos"
    
    this.HideDivs();
    

    this.divSelectAlum=false;
    this.divNavBar=true;

    this.CargarCursos();
    //Capturar el codigo del alumno y almacenarlo en una variable 
  }

  /** Metodos referente a agenda */
  ShowMiAgenda(curCod:string){

    console.log("Entro a show mi agenda");
    console.log("esta es el aula : " +this.alvCod);
    console.log("este es el curso : " + curCod);

    return  this.agendaService.getAgendas(this.alvCod, curCod)
    .subscribe(res=>{
      
      this.HideDivs();
      this.arrayAgenda = res as getAgenda[];
      if(this.arrayAgenda.length==0){
        this.divSinRegistros=true;
      }
      else{
        this.divSinRegistros=false;
      }
      console.log(this.arrayAgenda);
      this.divListarAgenda=true;
    });
  }

  showDetalleAgenda(agenda){

    this.HideDivs();

    this.agendaService.getAgenda(agenda._id)
    .subscribe(res=>{
      this.modeloGetAgenda= res as getAgenda;



    });

    this.id_agenda=agenda._id;
    this.divDetalleAgenda=true;

  }

  formatearFecha(fecha: string):string{
    var fch = new Date(fecha);
    var dia = fch.getDate();
    var mes = fch.getMonth()+1;
    var anio = fch.getFullYear();

    var d="";
    var m="";
    var a="";

    if(dia<10){
        d="0"+dia;
    }
    else{
      d=""+dia;
    }
    if(mes<10){
        m="0"+mes;
    }
    else{
      m=""+mes;
    }

    if (M == "01") { m = "Ene"; }
    else if (m == "02") { m = "Feb"; }
    else if (m == "03") { m = "Mar"; }
    else if (m == "04") { m = "Abr"; }
    else if (m == "05") { m = "May"; }
    else if (m == "06") { m = "Jun"; }
    else if (m == "07") { m = "Jul"; }
    else if (m == "08") { m = "Ago"; }
    else if (m == "09") { m = "Set"; }
    else if (m == "10") { m = "Oct"; }
    else if (m == "11") { m = "Nov"; }
    else if (m == "12") { m = "Dic"; }

    var resFch= d+" - "+m+" - "+anio;
    return resFch;
  }



  /** Metodos referente a cursos */
  ShowMisCursos(){
    this.varHro=true;
    this.HideDivs();
    this.CargarCursos();
    this.divCursos=true;
    this.divHorario=false;
  }

  CargarCursos(){
    if(this.varHro==true){

      this.divSinRegistros=false;
      this.arrayAulaCurso=[];
      this.divHorario=true;
      this.var_Menu=0;
      if(this.cargoActual=="5e0a91bbc2a58d0b8872b2bf"){ //alumno
        this.perRepCod= JSON.parse(localStorage.getItem('idPerRep'));
        this.perRepCod=this.mntAdminCrabbService.decript(this.perRepCod);
      }
  
      this.aulaCursoService.getMisCursos(this.perRepCod)
      .subscribe(res=>{

        this.arrayAulaCurso=res as GetAulaCurso[];
        if(this.arrayAulaCurso.length==0){
          //No hay cursos asignados aun
          this.divSinRegistros=true;
        }
        else{
          //Guardar Variables
          this.alvCod=this.arrayAulaCurso[0].aulVirCod;
          this.prdCod=this.arrayAulaCurso[0].prdCod;
          this.colCod=this.arrayAulaCurso[0].colCod;
          this.ObtenerCiclo();
          this.varHro=false;
        }
      });
    }else{

      this.divSinRegistros=false;
      this.arrayAulaCurso=[];
      this.divHorario=true;
      this.var_Menu=0;
      if(this.cargoActual=="5e0a91bbc2a58d0b8872b2bf"){ //alumno
        this.perRepCod= JSON.parse(localStorage.getItem('idPerRep'));
        this.perRepCod=this.mntAdminCrabbService.decript(this.perRepCod);
      }
 
      this.aulaCursoService.getMisCursos(this.perRepCod)
      .subscribe(res=>{
        this.arrayAulaCurso=res as GetAulaCurso[];
        if(this.arrayAulaCurso.length==0){
          //No hay cursos asignados aun
          this.divSinRegistros=true;
        }
        else{
          //Guardar Variables
          this.alvCod=this.arrayAulaCurso[0].aulVirCod;
          this.prdCod=this.arrayAulaCurso[0].prdCod;
          this.colCod=this.arrayAulaCurso[0].colCod;
          this.ObtenerCiclo();
          this.CargarHorario();
        }
      });

    }

  }



  /** Metodos referente a Nota */
  ShowMisNotas(){ 
    this.HideDivs();
    this.divNotas=true;
  }



  ObtenerCiclo(){
    return this.detallePeriodoService.getCiclo(this.prdCod)
    .subscribe(res=>{

      this.lblCiclo=res["detPrdSgt"];
      this.nroClo=res["_id"];
    });
  }

  /** Metodos referente a Horario*/
  ShowMiHorario(){
    this.HideDivs();
    this.CargarHorario();
  }

  CargarHorario(){

    this.var_Menu=0;
    this.divSinRegistros=false;
    this.divHorario=true;

    if(this.alvCod==undefined){
      this.divSinRegistros=true;
      
    }
    else{
      return this.horarioService.getHorario(this.colCod,this.alvCod)
      .subscribe(res=>{
        this.arrayHorario=res as GetHorario[];
        for(let i=0;i<this.arrayHorario.length;i++){
          if(this.arrayHorario[i].sabado.ncoCurNom!="Sin definir"){
            this.sabadoDisable=false;
          }
        }
      })
    }
  }
   
  /** Metodos referente a Mis Notas*/
  ShowPromediosArea(){
     this.HideDivs();
     this.CargarPromediosArea();
     this.divPromArea=true;
  }

  CargarPromediosArea(){
    this.var_Menu=0;
    this.divSinRegistros=false;

    if(this.nroClo==undefined){
      this.divSinRegistros=true;
    }
    else{
      this.promedioService.GetPromedioAreaCiclo(this.perRepCod,this.nroClo)
      .subscribe(res=>{
        this.arrayPromArea=res as PromedioArea[];
        if(this.arrayPromArea.length===0){
          this.divSinRegistros=true;
        }
        this.aluCod=this.arrayPromArea[0].aluCod;
      })
    }

    
  }

  /** Metodos referente a promedio cursos*/
  ShowPromedioCursos(promedioArea:PromedioArea){
    this.HideDivs();
    this.divPromedioCursos=true;

    this.CargarPromedioCursos(promedioArea)
  }

  CargarPromedioCursos(promedioArea:PromedioArea){
    this.promedioService.GetPromedioAreaPorCurso(this.perRepCod,promedioArea.nroClo, promedioArea.areCod._id)
    .subscribe(res=>{
      this.arrayPromCursos=res as PromedioCursos[];
    })
  }

  /** Metodos referente a detalle de las notas*/
  ShowDetallePromNta(curCod:string){
    this.HideDivs();
    this.divDetallePromCursos=true;
    this.CargarDetallePromNta(curCod);
  }

  CargarDetallePromNta(curCod:string){
    this.arrayDetallePromNta=[];
    return this.notaService.getDetNotasSegunTipo(this.perRepCod,curCod,this.nroClo)
    .subscribe(res=>{
      this.arrayDetallePromNta=res as GetNotaSegunTipo[];

      if(this.arrayDetallePromNta.length==0){
        this.divSinRegistros=true;
      }
      else{
        this.lblCurso=this.arrayDetallePromNta[0].curCod.ncoCurNom;
      }
    });
  }

  /** Metodos referente historial de notas*/
  ShowDivDetalleSgnTpoNta(detalle: GetNotaSegunTipo){

    this.HideDivs();
    this.divDetalleSgnTpoNta=true;

    return this.notaService.getHstSgnTpoNta(detalle.perRepCod._id,detalle.tpoNotCurCod,this.nroClo)
    .subscribe(res=>{

      this.arrayNotasFiltradas=res as GetNotasFiltradas[];
    });
  }

  /** Metodos referente libreta escolar*/
  ShowMiLibreta(){

    this.HideDivs();
    
    this.CargarLibreta();
    this.CargarMisGrados();
    this.divLibreta=true;
  }

  CargarLibreta(){
    this.var_Menu=0;
    this.divSinRegistros=false;
    return this.promedioService.GetLibreta(this.perRepCod,this.prdCod)
    .subscribe(res=>{

      var array=[];
      array=res as [];

      if(array.length==0){
        this.divSinRegistros=true;
      }
      else{

        if(res[0]["primerBimestre"]!=undefined||res[0]["segundoBimestre"]!=undefined||res[0]["tercerBimestre"]!=undefined||res[0]["cuartoBimestre"]!=undefined){
    
          this.libTriBi=true;
  
          this.arrayLibretaBi=res as GetLibretaBimestral[];
          if(this.arrayLibretaBi.length==0||this.arrayLibretaBi==[]){
            this.divSinRegistros=true;
         
          }
  
          this.lblGradoNivel=this.arrayLibretaBi[0].grado.graDes +" de " +this.arrayLibretaBi[0].nivel.nivDes;
        }
        else if(res[0]["primerTrimestre"]!=undefined||res[0]["segundoTrimestre"]!=undefined||res[0]["tercerTrimestre"]!=undefined){
  
          this.arrayLibreta=res as GetLibretaTrimestral[];
          if(this.arrayLibreta.length==0||this.arrayLibreta==[]){
            this.divSinRegistros=true;
          }
  
          this.lblGradoNivel=this.arrayLibreta[0].grado.graDes +" de " +this.arrayLibreta[0].nivel.nivDes;
        }
      } 
    })
  }

  /** Metodos para mostrar detalles del ciclo seleccionado en la libreta*/
  ShowDetalleCiclo_Prd(libreta: object, numCiclo:number){

    this.lblLibCiclo="Sin Datos"

    let trueOrfalse=false;
    let promedio=0;
   
      if(libreta["primerTrimestre"]!=undefined){
  
        if(numCiclo==1){
          this.cicloLibreta=libreta["primerTrimestre"].nroClo;
          promedio=libreta["primerTrimestre"].promedio;
          this.lblLibCiclo="Primer Trimestre";
        }
        else if(numCiclo==2){
          this.cicloLibreta=libreta["segundoTrimestre"].nroClo;
          promedio=libreta["segundoTrimestre"].promedio;
          this.lblLibCiclo="Segundo Trimestre";
        }
        else if(numCiclo==3){
          this.cicloLibreta=libreta["tercerTrimestre"].nroClo;
          promedio=libreta["tercerTrimestre"].promedio;
          this.lblLibCiclo="Tercer Trimestre";
        }
      }
      else  if(libreta["primerBimestre"]!=undefined){
        if(numCiclo==1){
          this.cicloLibreta=libreta["primerBimestre"].nroClo;
          promedio=libreta["primerBimestre"].promedio;
          this.lblLibCiclo="Primer Bimestre";
        }
        else if(numCiclo==2){
          this.cicloLibreta=libreta["segundoBimestre"].nroClo;
          promedio=libreta["segundoBimestre"].promedio;
          this.lblLibCiclo="Segundo Bimestre";
        }
        else if(numCiclo==3){
          this.cicloLibreta=libreta["tercerBimestre"].nroClo;
          promedio=libreta["tercerBimestre"].promedio;
          this.lblLibCiclo="Tercer Bimestre";
        }
        else if(numCiclo==4){
          this.cicloLibreta=libreta["cuartoBimestre"].nroClo;
          promedio=libreta["cuartoBimestre"].promedio;
          this.lblLibCiclo="Cuarto Bimestre";
        }
      }
      
      this.lblAreaLibreta=libreta["area"].ncoAreNom;

      if(promedio==0){

      }
      else{
        this.promedioService.GetPromedioAreaPorCurso(this.perRepCod,this.cicloLibreta, libreta["area"]._id)
        .subscribe(res=>{
          
          this.arrayPromCursos=res as PromedioCursos[];
          this.HideDivs();
          this.divlibPromedioCursos=true;
        })
      }
  }

  ShowLibDetalleTpoNtas(obj:PromedioCursos){

    const curCod=obj.curCod._id.toString();
    return this.notaService.getDetNotasSegunTipo(this.perRepCod,curCod,this.cicloLibreta)
    .subscribe(res=>{
      this.arrayDetallePromNta=res as GetNotaSegunTipo[];
      this.lblCurso=this.arrayDetallePromNta[0].curCod.ncoCurNom;
      this.HideDivs();
      this.divlibDetallePromCursos=true;
    });
  }

  ShowDivLibDetalleSgnTpoNta(detalle: GetNotaSegunTipo){
    return this.notaService.getHstSgnTpoNta(detalle.perRepCod._id,detalle.tpoNotCurCod,this.cicloLibreta)
    .subscribe(res=>{

      this.arrayNotasFiltradas=res as GetNotasFiltradas[];
      this.HideDivs();
      this.divlibHstSgnTpoNta=true;
    });
  }

  CargarMisGrados(){
    this.matriculaService.getMisMatriculas(this.perRepCod)
    .subscribe(res=>{
      this.arrayMisMatriculas=res as MisMatriculas[];
      this.gradoSelected=this.arrayMisMatriculas[this.arrayMisMatriculas.length-1].prdCod;
    });
   
  }

  GetSltGrado(val: any){
    this.divSinRegistros=false
    //this.lblGradoNivel=val["grado"].graDes +" de " + val["nivel"].nivDes;
    let prdCod=val;
    return this.promedioService.GetLibreta(this.perRepCod,prdCod)
    .subscribe(res=>{
      
      var array=[];
      array=res as [];

      if(array.length==0){
        this.divSinRegistros=true;
        this.libTriBi=false;
      }
      else{

        if(res[0]["primerBimestre"]!=undefined||res[0]["segundoBimestre"]!=undefined||res[0]["tercerBimestre"]!=undefined||res[0]["cuartoBimestre"]!=undefined){
  
          this.libTriBi=true;
  
          this.arrayLibretaBi=res as GetLibretaBimestral[];
          if(this.arrayLibretaBi.length==0||this.arrayLibretaBi==[]){
            this.divSinRegistros=true;
         
          }
 
          this.lblGradoNivel=this.arrayLibretaBi[0].grado.graDes +" de " +this.arrayLibretaBi[0].nivel.nivDes;
        }
        else if(res[0]["primerTrimestre"]!=undefined||res[0]["segundoTrimestre"]!=undefined||res[0]["tercerTrimestre"]!=undefined){

  
          this.arrayLibreta=res as GetLibretaTrimestral[];
          if(this.arrayLibreta.length==0||this.arrayLibreta==[]){
            this.divSinRegistros=true;
          }
          this.libTriBi=false;

          this.lblGradoNivel=this.arrayLibreta[0].grado.graDes +" de " +this.arrayLibreta[0].nivel.nivDes;

        }
      } 
    })

  }
  

  getPortadas(){ // *Mofificar para mostrar las prtadas de la empresa

    var cl= JSON.parse(localStorage.getItem('col'));
    cl=this.mntAdminCrabbService.decript(cl);

    this.biografiaService.getPortadas(cl)
    .pipe(delay(100)).subscribe(res=>{
    this.arrayPortadas=res as GetBioPortada[];
    setTimeout(() => {
      this.elems = document.querySelectorAll('.carousel');
      this.instances = M.Carousel.init(this.elems, this.options);

      this.autoplay= setInterval(function() {
        $('.carousel').carousel('next');
      }, 10000); 
      
    }, 1000);
  
  });
     
  }

  getMisMatriculas(){

  }

  listarPagos(){
    return this.pagoService.getPagos(this.colCod)
    .subscribe(res=>{

      this.arrayPago= res as ArrayPago[];
      this.arrayPagoFilter= res as ArrayPago[];
      this.HideDivs();
      this.divListarPago=true;
    });
  }

  ShowDivPago(){
    this.HideDivs();
    this.divListarPago=true;
  }

  getPagoUser(colCod:string){
    return this.pagoService.getPagoUser(this.perRepCod,colCod)
    .subscribe(res=>{
      this.arrayPago= res as ArrayPago[];
      this.arrayPagoFilter= res as ArrayPago[];
      this.HideDivs();
    })
  }
  

  getMatriculaActual(){
    return this.matriculaService.getMisMatriculas(this.perRepCod)
    .subscribe(res=>{

      var arrayMat= res as Matricula[];

      for(let i=0; i<arrayMat.length;i++){

        if(arrayMat[i]["prdCod"]==this.prdCod){
          this.graCod=arrayMat[i]["graCod"]["_id"];
          this.nivCod=arrayMat[i]["nivCod"]["_id"];
        }
      }

      this.libroService.curCod=this.curCod;
      this.libroService.graCod=this.graCod;
      this.libroService.nivCod=this.nivCod;
      this.libroService.colCod=this.colCod;

      this.divLibroEva=true;
    })
  }

  ngOnInit() {
    this.ValidarTipoUsuario();
    this.GetNomUser();
    this.getPortadas();
  }

  ngAfterViewInit() {

  }

  ngOnDestroy(){
    clearInterval(this.autoplay);
    this.elems;
    this.instances;
    M.Carousel
  }
}
