import { Component, OnInit,Input,Output, EventEmitter,ViewChild } from '@angular/core';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

/******* Importacion de Modelos******** */
import { GetAulaVirtual, AulaVirtual }  from '../../modelos/aula-virtual'; 
import { CursoGrado,GetCursoGrado }  from '../../modelos/curso-grado'; 
import { AulaCurso, GetAulaCurso,DocenteCurso }  from '../../modelos/aula-curso';
import { Periodo, GetPeriodo }  from '../../modelos/periodo';
import { Matricula, GetMatricula }  from '../../modelos/matricula';
import { Profesor,GetProfesor }  from '../../modelos/cargos';

import { Grado, ListaGrados,GetGrado,GetGradoFiltro }  from '../../modelos/grado'; 
import { Seccion, ListaSeccion,GetSeccion, GetSeccionFiltro }  from '../../modelos/seccion'; 
import { Nivel, ListaNivel,GetNivel, GetNivelFiltro }  from '../../modelos/nivel'; 
import { Turno, ListaTurno,GetTurno }  from '../../modelos/turno';

import { IntervaloHorario }  from '../../modelos/intervalo-horario';
import { GetHorario,HorarioModal }  from '../../modelos/horario';

import { HorarioModalComponent } from '../horario-modal/horario-modal.component';

/******* Importacion de Servicios******** */
import { AulaVirtualService } from '../../servicios/aula-virtual.service'; 
import { CursoGradoService } from '../../servicios/curso-grado.service'; 
import { AulaCursoService } from '../../servicios/aula-curso.service'; 
import { PeriodoService } from '../../servicios/periodo.service'; 
import { MatriculaService } from '../../servicios/matricula.service'; 
import { MantenimientoCargoService } from '../../servicios/mantenimiento-cargo.service'; 

import { GradoService } from '../../servicios/grado.service'; 
import { SeccionService } from '../../servicios/seccion.service'; 
import { NivelService } from '../../servicios/nivel.service';
import { TurnoService } from '../../servicios/turno.service'; 

import { IntervaloHorarioService } from '../../servicios/intervalo-horario.service'; 
import { HorarioService } from '../../servicios/horario.service'; 
import { ModalOptAulaVirtualComponent } from '../modal-opt-aula-virtual/modal-opt-aula-virtual.component';
import { MntAdminCrabbService } from 'src/app/servicios/mnt-admin-crabb.service';

import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

declare var M: any;

@Component({
  selector: 'app-aula-virtual',
  templateUrl: './aula-virtual.component.html',
  styleUrls: ['./aula-virtual.component.css']
})
export class AulaVirtualComponent implements OnInit {

  @ViewChild(HorarioModalComponent,{static: false}) horarioModalComponent: HorarioModalComponent;

  ModeloAulaVirtual : AulaVirtual=new AulaVirtual();
  arrayAulaVirtual  : GetAulaVirtual[];
  filterAulaVirtual : GetAulaVirtual[]=[];

  ModeloMatricula   :Matricula=new Matricula();
  arrayMatricula    :GetMatricula[];
  filterMatricula   :GetMatricula[]=[];

  ModeloCursoGrado  : CursoGrado[];

  ModeloAulaCurso   : AulaCurso=new AulaCurso();
  arrayAulaCurso    : GetAulaCurso[];

  ModeloIntervalo   : IntervaloHorario=new IntervaloHorario();
  arrayIntervalo    : IntervaloHorario[];

  objDocenteCurso   : DocenteCurso= new DocenteCurso();

  arrayPeriodo      : Periodo[];
  periodoActual     : string;

  arrayAlumnosAula  : GetMatricula[];
  arrayProfesor     : GetProfesor[];

  arrayHorario      : GetHorario[];

  divlistaAulas     :boolean=true;
  divlistaCursos    :boolean=false;
  divlistaDocentes  :boolean=false;
  divlistaAlumnos   :boolean=false;
  divDetalleCursos  :boolean=false;
  divAsignarDocente :boolean=false;
  divHorario        :boolean=false;
  divIntervalo      :boolean=false;
  divRegAula        :boolean=false;

  /**Items Detalles */
  itemCursos        :boolean=false;
  itemDocentes      :boolean=false;
  itemAlumnos       :boolean=false;
  itemHorario       :boolean=false;

  /** Variables del Aula Virtual */
  id_graAlv         : string;
  id_nivAlv         : string;
  id_secAlv         : string;
  id_turAlv         : string;
  id_Alv            : string;
  id_curso          : string;
  id_area           : string;
  id_prf            : string;
 

  id_perRepCod      : string;
  nomDocente        : string;
  apeDocente        : string;

  id_DocCurSelec    : string; //Id del docente correspondiente al curso seleccionado
  Docente           : string; // Nombre del docente que se mostrara en el div Detalle Curso


  /** Variabled de Aula Curso */
  id_aulaCurso      : string;
  grado             : string;
  nivel             : string;
  
  /** Nombre de botones */
  btnRegistrar      : string="Registrar";; 
  btnAsignarDoc     : string;
  btnCrearActlzDoc  : string;
  btnCrearActlzDocBoolean  : boolean=true;
  btnCrearActlzIntervalo   : string="Registrar";


  /** Array de Cursos Segun Grado */
  arrayCursoGrado   : GetCursoGrado[];

  docDeleted        : boolean=false;

  /** Select para formulario registrar aula */
  ModeloGrado: Grado=new Grado();
  arrayGrado:  GetGrado[];
  fltArrayGrado:GetGradoFiltro[]=[];

  ModeloSeccion: Seccion=new Seccion();
  arraySeccion: GetSeccion[];
  fltArraySeccion:GetSeccionFiltro[]=[];

  ModeloNivel: Nivel=new Nivel();
  arrayNivel: GetNivel[];
  fltArrayNivel:GetNivelFiltro[]=[];

  ModeloTurno: Turno=new Turno();
  arrayTurno: GetTurno[];
  fltArrayTurno:GetTurno[]=[];


  /** array´s para filtros */

  fltSelectGraCod: string;
  fltSelectSecCod: string;
  fltSelectNivCod: string;
  fltSelectTurCod: string;


  /** Sobre intervalo horario */
  horaInicio:   string;
  minutoInicio: string
  horaFin:      string;
  minutoFin:    string;

  /** horario */
  dia: string;

  /** Modal variable */
  varOptSetModal:number=0;

  /** */
  filteredProfesor:GetProfesor[]
  pflAct: string;
  itemIntervalo:boolean= false;
  itemDetCurAul:boolean= false;
  lblNomAula:string;


  @Input() inputColCod:string;
  @Output() objOutHorario= new EventEmitter();

  constructor(
    private aulaVirtualService:AulaVirtualService,
    private cursoGradoService:CursoGradoService,
    private aulaCursoService:AulaCursoService,
    private periodoService:PeriodoService,
    private matriculaService: MatriculaService,
    private mantenimientoCargoService: MantenimientoCargoService,
    private gradoService:GradoService,
    private seccionService:SeccionService,
    private nivelService:NivelService,
    private turnoService:TurnoService,
    private intervaloHorarioService:IntervaloHorarioService,
    private horarioService:HorarioService,
    private mntAdminCrabbService:MntAdminCrabbService,
    public  dialog         : MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    ) {
      this.matIconRegistry.addSvgIcon(
        "disable",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/disable.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "eliminar",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/eliminar.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "enable",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/enable.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "editar",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/editar.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "informacion",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/informacion.svg")
      );
    }

    _listFilter: string;
    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProfesor = this.listFilter ? this.performFilter(this.listFilter) : this.arrayProfesor;
    }
  
    performFilter(filterBy: string): GetProfesor[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.arrayProfesor.filter((profesor: GetProfesor) =>
        profesor.perRepCod.perRepDni.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }




  HideDivs(){
    this.divlistaAulas=false;
    this.divHorario=false;
    this.divlistaCursos=false;
    this.divlistaAlumnos=false;
    this.divlistaDocentes=false;
    this.divDetalleCursos=false;
    this.divAsignarDocente=false;
    this.divHorario=false;
    this.divIntervalo=false;
    this.divRegAula=false;
  }

  habilitarDeshabilitar(aulaVirtual:GetAulaVirtual){

      if(aulaVirtual.estCod==="5e0a8a3b9644411040ebf292"){ //Estado habilitado (Deshabilitar aula)

        const dialogRef =this.dialog.open(ConfirmDialogComponent,{
          width: '250px',
          data:' ¿ Desea deshabilitar el aula ? ',
          
        });
        dialogRef.afterClosed().subscribe(res=>{
          if(res===true){   
            this.deshabilitarAula(aulaVirtual);//----------> En caso el cuadro de dialogo devuelva true llamara al metodo DeshabilitarPerfil()
          
          }
          else{
         
          }
        });   
      }
      else if(aulaVirtual.estCod==="5e0a8a479644411040ebf293"){

        const dialogRef =this.dialog.open(ConfirmDialogComponent,{
          width: '250px',
          data:' ¿ Desea habilitar el aula ? ',
          
        });
        dialogRef.afterClosed().subscribe(res=>{
          if(res===true){       

            this.habilitarAula(aulaVirtual);//----------> En caso el cuadro de dialogo devuelva true llamara al metodo DeshabilitarPerfil()
          
          }
          else{
        
          }
        });  
      }
  };

  preEditar(aulaVirtual:GetAulaVirtual){
    this.HideDivs();

    this.CargarTablaGrados();
    this.CargarTablaSeccion();
    this.CargarTablaNivel();
    this.CargarTablaTurno();
   
    this.ModeloGrado._id=aulaVirtual.graCod._id;
    this.ModeloSeccion._id=aulaVirtual.secCod._id;
    this.ModeloNivel._id=aulaVirtual.nivCod._id;
    this.ModeloTurno._id=aulaVirtual.turCod._id;
    this.ModeloAulaVirtual._id=aulaVirtual._id;
    this.btnRegistrar="Editar";
    this.divRegAula=true;
  }
  
  habilitarAula(aulaVirtual: GetAulaVirtual){
    this.aulaVirtualService.habilitarAula(aulaVirtual).subscribe(res=>{
      let status=res["status"];

      if(status==200){
        this.CargarTablaMatricula();
        M.toast({ html: 'Se habilito el aula' });
      }
      else{
        M.toast({ html: 'Ocurrio un error' });
      }
    });;
  }

  deshabilitarAula(aulaVirtual: GetAulaVirtual){
    this.aulaVirtualService.deshabilitarAula(aulaVirtual).subscribe(res=>{
     
        let status=res["status"];

        if(status==200){
          this.CargarTablaMatricula();
          M.toast({ html: 'Se deshabilito el aula' });
        }
        else if(status==420){
          M.toast({ html: 'No se puede deshabilitar, existen alumnos en esta aula' });
        }
        else{
          M.toast({ html: 'Ocurrio un error' });
        }

    });;
  }

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
      graDes: "- Seleccione Grado -",
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

  CargarTablaSeccion(){
    return this.seccionService.getSeccion()
    .subscribe(res => {  
      this.arraySeccion = res as GetSeccion[];
      this.arraySeccion.unshift({
        estCod: {
          _id: "..",
          estCod: "..",
          estNom: "..",
          estDes: "..",
          timestamp: "..",
          __v: 1
      },
      _id: "string",
      secNom: "..",
      secDes: "- Seleccione Sección -",
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
      nivDes: "- Seleccione Nivel -",
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

  CargarTablaTurno(){
    return this.turnoService.getTurno()
    .subscribe(res => {  
      this.arrayTurno = res as GetTurno[];
      this.arrayTurno.unshift({
        estCod: {
          _id: "..",
          estCod: "..",
          estNom: "..",
          estDes: "..",
          timestamp: "..",
          __v: 1
      },
      _id: "string",
      turNom: "..",
      turDes:"- Seleccione Turno -",
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

  //realizar validacion de campos al registrar un aula

  validarForm():boolean{

    var trueOrFalse=false;

    if(this.ModeloAulaVirtual.graCod==undefined||this.ModeloAulaVirtual.graCod==null||this.ModeloAulaVirtual.graCod=="string"){
      trueOrFalse=true;
      M.toast({ html: 'Seleccione un grado' });
    }
    else if(this.ModeloAulaVirtual.secCod==undefined||this.ModeloAulaVirtual.secCod==null||this.ModeloAulaVirtual.secCod=="string"){
      trueOrFalse=true;
      M.toast({ html: 'Seleccione una seccion' });
    }
    else if(this.ModeloAulaVirtual.nivCod==undefined||this.ModeloAulaVirtual.nivCod==null||this.ModeloAulaVirtual.nivCod=="string"){
      trueOrFalse=true;
      M.toast({ html: 'Seleccione un nivel' });
    }
    else if(this.ModeloAulaVirtual.turCod==undefined||this.ModeloAulaVirtual.turCod==null||this.ModeloAulaVirtual.turCod=="string"){
      trueOrFalse=true;
      M.toast({ html: 'Seleccione un turno' });
    }


    return trueOrFalse;

  }

  CrearAula(){
    this.ModeloAulaVirtual.graCod=this.ModeloGrado._id;
    this.ModeloAulaVirtual.secCod=this.ModeloSeccion._id;
    this.ModeloAulaVirtual.nivCod=this.ModeloNivel._id;
    this.ModeloAulaVirtual.turCod=this.ModeloTurno._id;
    this.ModeloAulaVirtual.prdCod=this.periodoActual;
    this.ModeloAulaVirtual.colCod=this.inputColCod;

    if(this.validarForm()==true){

    }
    else{

      if(this.ModeloAulaVirtual._id){
        return this.aulaVirtualService.putAula(this.ModeloAulaVirtual)
        .subscribe(res=>{
          var status=res["status"];
          if(status==510){
            M.toast({ html: 'Ya existe esta aula' });
          }
          else if(status==420){
            M.toast({ html: 'No se puede editar, existen alumnos matriculados en el aula' });
          }
          else if(status==421){
            M.toast({ html: 'No se puede editar, existen notas asociadas' });
          }
          else if(status==422){
            M.toast({ html: 'No se puede editar, existen tipos de notas asociadas' });
          }
          else if(status==200){
            M.toast({ html: 'Se edito el aula' });
            this.ModeloAulaVirtual= new AulaVirtual();
            this.btnRegistrar="Registrar";
            this.ShowDivListaAulas();
          }
        })

      }
      else{
        return this.aulaVirtualService.CreateAulVir(this.ModeloAulaVirtual)
        .subscribe(res=>{
  
          var status=res["status"];
          if(status==510){
            M.toast({ html: 'Ya existe esta aula' });
          }
          else if(status==200){
            M.toast({ html: 'Aula registrada' });
            this.ModeloAulaVirtual= new AulaVirtual();
            this.btnRegistrar="Registrar";
            this.ShowDivListaAulas();
          }
        });
      }
    }
  }

  ShowDivRegAula(){
    this.HideDivs();
    this.HideItemsDetalles();
    this.CargarTablaGrados();
    this.CargarTablaSeccion();
    this.CargarTablaNivel();
    this.CargarTablaTurno();
    this.ModeloGrado._id=   "string";
    this.ModeloSeccion._id= "string";
    this.ModeloNivel._id=   "string";
    this.ModeloTurno._id=   "string";
    this.btnRegistrar="Registrar";
    this.divRegAula=true;
  }

  ShowDivListaAulas(){
    this.HideDivs();
    this.HideItemsDetalles();
    this.divlistaAulas=true;   
    this.varOptSetModal=0;
    this.CargarTablaMatricula();
  }

  ShowDivListaCursos(){
    this.HideDivs();
    this.divlistaCursos=true;
  }

  ShowDivListaDocentes(){
    this.HideDivs();
    this.divlistaDocentes=true;
    this.CargarTablaDocentesGrado(); 
  }

  ShowDivHorario(){
    this.HideDivs();
    this.GetHorario();
    this.divHorario=true;
  }

  ShowDivIntervalo(){
    this.GetIntervalo();
    this.HideDivs();
    this.LimpiarFrmIntervalo();
    this.divIntervalo=true;
  }

  ShowDivListaAlumnos(){
    this.HideDivs();
    this.CargarTablaAlumnosGrado();
    this.divlistaAlumnos=true;
  }

  ShowDivDetalleCursos(curso:GetCursoGrado){  //Abre la caja donde muestra el detalle del curso seleccionado
    this.docDeleted=false;
    this.HideDivs();
    this.divDetalleCursos=true;
    this.id_curso=curso.curCod._id;  //Id del Curso seleccionado  
    this.id_area=curso.areCod._id; 
    this.objDocenteCurso= new DocenteCurso();
    this.aulaCursoService.getDocenteCurso(this.id_Alv,this.id_curso)
    .subscribe(res => {
      
      this.objDocenteCurso=res as DocenteCurso;
      this.Docente="";
      
      if(this.objDocenteCurso===null||this.objDocenteCurso===undefined){
        this.Docente=""
        this.btnAsignarDoc="Asignar"; 
      }
      else{  

        if(this.objDocenteCurso.prfCod===null||this.objDocenteCurso.prfCod===undefined){
          this.btnAsignarDoc="Asignar";
          this.docDeleted=true;
          this.id_aulaCurso=this.objDocenteCurso._id;
        }else{
          this.Docente=this.objDocenteCurso.perRepCod.perRepNom+ ', '+ this.objDocenteCurso.perRepCod.perRepApe;
          this.id_DocCurSelec=this.objDocenteCurso.prfCod;
          this.id_aulaCurso=this.objDocenteCurso._id;
          this.btnAsignarDoc="Editar";
        }
      }
    });
  }

  AsignarProfesor(){ //Metodo que crea un registro en el documento Aula-Curso

    this.ModeloAulaCurso.aulVirCod=this.id_Alv;
    this.ModeloAulaCurso.areCod=this.id_area;
    this.ModeloAulaCurso.curCod=this.id_curso;
    this.ModeloAulaCurso.colCod=this.inputColCod;
    this.ModeloAulaCurso.prdCod=this.periodoActual;
    this.ModeloAulaCurso.perRepCod=this.id_perRepCod;
    this.ModeloAulaCurso.prfCod=this.id_prf;

    if(this.btnAsignarDoc==="Asignar" && this.docDeleted===false){
      return this.aulaCursoService.postCurso(this.ModeloAulaCurso)
        .subscribe(res => { 
          var status=res["status"];

          if(status===200){
            this.CargarTablaDocentesGrado(); 
            this.divAsignarDocente=false;
            this.divHorario=true;
            this.btnCrearActlzDocBoolean=true;
            M.toast({ html: 'Asignado Correctamente !' });        
          }else{
            this.divAsignarDocente=false;
            this.divHorario=true;
            this.btnCrearActlzDocBoolean=true;
            M.toast({ html: 'No se completo la operacion !' });
          }  
        });  

    }else if(this.btnAsignarDoc==="Editar"||this.docDeleted===true){
      this.ModeloAulaCurso._id=this.id_aulaCurso;
      return this.aulaCursoService.putCurso(this.ModeloAulaCurso)
        .subscribe(res => { 

          var status=res["status"];

          if(status===200){
            this.CargarTablaDocentesGrado();
            this.divAsignarDocente=false;
            this.divHorario=true;
            this.btnCrearActlzDocBoolean=true;
            M.toast({ html: 'Se actualizo el docente !' });
            
          }else{
            this.divAsignarDocente=false;
            this.divHorario=true;
            this.btnCrearActlzDocBoolean=true;
            M.toast({ html: 'No se completo la operacion !' });
          }    
        });  
    }  
  }

  ShowDivAsignarDocente(){
    this.HideDivs();
    this.nomDocente="";
    this.apeDocente="";
    this.divAsignarDocente=true;

    if(this.btnAsignarDoc==="Asignar"){
      this.btnCrearActlzDoc="Asignar";
    }else{
      this.btnCrearActlzDoc="Actualizar";
    }

    this.CargarTablaProfesores();
  }

  HideItemsDetalles(){
    this.itemCursos=false;
    this.itemDocentes=false;
    this.itemAlumnos=false;
    this.itemHorario=false;
  }

  SeleccionarAula(aula: GetAulaVirtual){
    this.HideDivs();
    this.itemIntervalo=false;
    this.itemDetCurAul=false;
    
    if(this.pflAct=="5e0a9164c2a58d0b8872b2b8" || this.pflAct=="5e0a916dc2a58d0b8872b2b9"){
      this.itemIntervalo=true;
      this.itemDetCurAul=true;
    }
    if(this.pflAct=="5e0a917ec2a58d0b8872b2bb"){
      this.itemDetCurAul=true;
    }

    this.lblNomAula=aula.graCod.graDes+" " +"'"+aula.secCod.secNom+"'" + " de " + aula.nivCod.nivDes
    this.id_Alv=aula._id;
    this.varOptSetModal=1;
    
    this.itemCursos=true;
    this.itemDocentes=true;
    this.itemAlumnos=true;
    this.GetHorario();
    this.itemHorario=true;
    this.divHorario=true;

    this.id_graAlv=aula.graCod._id;
    this.id_nivAlv=aula.nivCod._id;
    this.id_secAlv=aula.secCod._id;
    this.id_turAlv=aula.turCod._id;
    
    this.grado=aula.graCod._id;
    this.nivel=aula.nivCod._id;
  

    this.cursoGradoService.getCursosGrado(this.inputColCod,this.id_graAlv,this.id_nivAlv)
      .subscribe(res => {
        this.arrayCursoGrado=res as GetCursoGrado[];
      });

  }

  CargarTablaAlumnosGrado(){  

    this.matriculaService.getAlumnosPorAula(this.inputColCod,this.id_graAlv,this.id_nivAlv,this.id_secAlv,this.id_turAlv)
      .subscribe(res => {
        this.arrayAlumnosAula=res as GetMatricula[];
      });
  }

  CargarTablaProfesores(){
    this.mantenimientoCargoService.getProfesores(this.inputColCod)
    .subscribe(res => {
      this.arrayProfesor=res as GetProfesor[];
      this.filteredProfesor=res as GetProfesor[];
    });
  }

  SeleccionarProfesor(profesor: GetProfesor){


    this.id_prf=profesor._id;
    this.id_perRepCod= profesor.perRepCod._id;

    this.nomDocente=profesor.perRepCod.perRepNom;
    this.apeDocente=profesor.perRepCod.perRepApe;

    this.btnCrearActlzDocBoolean=false;
  }

  CargarTablaMatricula(){
    this.aulaVirtualService.getAulasVirtCol(this.inputColCod)
      .subscribe(res => {
        this.arrayAulaVirtual = res as GetAulaVirtual[];
        this.filterAulaVirtual=this.arrayAulaVirtual;
      });
  }

  CargarTablaCursosGrado(){
  }

  CargarTablaDocentesGrado(){ 

    return this.aulaCursoService.getDocentesPorAula(this.id_Alv,this.periodoActual)
      .subscribe(res => {  
        this.arrayAulaCurso=res as GetAulaCurso[];
      });
  }

  CapturarPeriodoActual(){
    let fechaActual = new Date();
        var anioActual=fechaActual.getFullYear().toString();
        return this.periodoService.getPeriodoActual(anioActual,this.inputColCod)
        .subscribe(res => {  
          this.arrayPeriodo = res as Periodo[];
          this.periodoActual=this.arrayPeriodo[0]._id;
        });
  }


  CargarFiltroGrados(){
    return this.gradoService.getGrados()
    .subscribe(res => {  
      this.fltArrayGrado = res as GetGradoFiltro[];
      
      this.fltArrayGrado.unshift({
        estCod: {
          _id: "..",
          estCod: "..",
          estNom: "..",
          estDes: "..",
          timestamp: "..",
          __v: 1
      },
      _id: "...",
      graNum: "..",
      graDes: "- Grado -",
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

  CargarFiltroSeccion(){
    return this.seccionService.getSeccion()
    .subscribe(res => {  
      this.fltArraySeccion = res as GetSeccionFiltro[];
      
      this.fltArraySeccion.unshift({
        estCod: {
          _id: "..",
          estCod: "..",
          estNom: "..",
          estDes: "..",
          timestamp: "..",
          __v: 1
      },
      _id: "...",
      secNom: "..",
      secDes: "- Sección -",
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

  CargarFiltroNivel(){
    return this.nivelService.getNivel()
    .subscribe(res => {  
      this.fltArrayNivel = res as GetNivelFiltro[];
      
      this.fltArrayNivel.unshift({
        estCod: {
          _id: "..",
          estCod: "..",
          estNom: "..",
          estDes: "..",
          timestamp: "..",
          __v: 1
      },
      _id: "...",
      nivNum: "..",
      nivDes: "- Nivel -",
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

  CargarFiltroTurno(){
    return this.turnoService.getTurno()
    .subscribe(res => {  
      this.fltArrayTurno = res as GetTurno[];
      
      this.fltArrayTurno.unshift({
        estCod: {
          _id: "..",
          estCod: "..",
          estNom: "..",
          estDes: "..",
          timestamp: "..",
          __v: 1
      },
      _id: "...",
      turNom: "- Turno -",
      turDes: "",
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


  LimpiarFrmIntervalo(){
    this.horaInicio="";
    this.minutoInicio="";
    this.horaFin="";
    this.minutoFin="";
    this.ModeloIntervalo.intHraIni="";
    this.ModeloIntervalo.intHraFin="";

    this.btnCrearActlzIntervalo="Registrar";
  }

  validarFrmIntervalo():boolean{
    if(this.horaInicio==""||this.horaInicio==undefined){
      M.toast({ html: 'Ingrese una hora de inicio' });
      return true;
    }
    else if(this.minutoInicio==""||this.minutoInicio==undefined){
      M.toast({ html: 'Ingrese los minutos de inicio' });
      return true;
    }
    else if(this.horaFin==""||this.horaFin==undefined){
      M.toast({ html: 'Ingrese la hora de fin' });
      return true;
    }
    else if(this.minutoFin==""||this.minutoFin==undefined){
      M.toast({ html: 'Ingrese los minutos de fin' });
      return true;
    }
    return false;
  }

 

  CrearIntervaloHorario(){

    if(this.validarFrmIntervalo()==true){

    }
    else{   
      const hi=parseInt(this.horaInicio);
      const mi=parseInt(this.minutoInicio);
      const hf=parseInt(this.horaFin);
      const mf=parseInt(this.minutoFin);
  
      if(hi<10){
        this.horaInicio="0"+hi;
      }
      if(mi<10){
        this.minutoInicio="0"+mi;
      }
      if(hf<10){
        this.horaFin="0"+hf;
      }
      if(mf<10){
        this.minutoFin="0"+mf;
      }
  
      this.ModeloIntervalo.intHraIni=this.horaInicio+ ':' +this.minutoInicio;
      this.ModeloIntervalo.intHraFin=this.horaFin+ ':' +this.minutoFin;
      this.ModeloIntervalo.colCod=this.inputColCod;

      if(this.btnCrearActlzIntervalo=="Registrar"){
    
        return this.intervaloHorarioService.postIntervaloHorario(this.ModeloIntervalo)
        .subscribe(res=>{

          var status=res["status"];
          if(status==200){
            M.toast({ html: 'Se registro el intervalo' });
            this.LimpiarFrmIntervalo();
            this.GetIntervalo();
          }
          else{
            M.toast({ html: 'Error, el intervalo generaria conflicto' });
          }
        });
      }
      else{
        return this.intervaloHorarioService.putIntervaloHorario(this.ModeloIntervalo)
        .subscribe(res=>{
          var status=res["status"];
          if(status==200){
            M.toast({ html: 'Se actualizo el intervalo' });
            this.LimpiarFrmIntervalo();
            this.GetIntervalo();
          }
          else{
            M.toast({ html: 'Error, el intervalo generaria conflicto' });
          }
        })
      }


    }
  }

  PreEditarIntervalo(intervalo:IntervaloHorario){
    this.horaInicio=intervalo.intHraIni.substring(16,18);
    this.minutoInicio=intervalo.intHraIni.substring(19,21);
    this.horaFin=intervalo.intHraFin.substring(16,18);
    this.minutoFin= intervalo.intHraFin.substring(19,21);
    
    this.btnCrearActlzIntervalo="Actualizar";

    this.ModeloIntervalo.intHraIni=this.horaInicio+ ':' +this.minutoInicio;
    this.ModeloIntervalo.intHraFin=this.horaFin+ ':' +this.minutoFin;
    this.ModeloIntervalo.colCod=this.inputColCod;
    this.ModeloIntervalo._id=intervalo._id;
  }

  GetIntervalo(){
    return this.intervaloHorarioService.getIntervaloHorario(this.inputColCod)
    .subscribe(res=>{
      this.arrayIntervalo= res as IntervaloHorario[];
    });
  }
  
  GetHorario(){
    return this.horarioService.getHorario(this.inputColCod,this.id_Alv)
    .subscribe(res=>{
      this.arrayHorario=res as GetHorario[];
    });
  }

  LlamarModalHorario(codIntv:string,curCod:string,hraIni:string,hraFin:string,dia){
    this.openDialog(codIntv,curCod,dia,hraIni,hraFin);
  };
  
  openDialog(codIntv:string,curCod:string,dia:string,hraIni:string,hraFin:string){

    const obj={
      alvCod    : this.id_Alv,
      itvHroCod : codIntv,
      intHraIni : hraIni,
      intHraFin : hraFin,
      dia       : dia,
      curCod    : curCod,
      colCod    : this.inputColCod,
      prdCod    : this.periodoActual,
      grado     : this.grado,
      nivel     : this.nivel,
    }

    const dialogRef =this.dialog.open(HorarioModalComponent,{
      width: '300px',
      height: 'auto',
      data: obj,
    });

    dialogRef.afterClosed().subscribe(res=>{
      if(res==false){       

        
      }
      else{
        this.GetHorario();
      };
    });   
  }


  openModalOpt(fltOrOpt:string){

    var objMensaje={

      opcion:this.varOptSetModal,
      fltOrOpt:fltOrOpt,

    }

    const dialogRef =this.dialog.open(ModalOptAulaVirtualComponent,{
      width: '250px',
      data: objMensaje,
    });

    dialogRef.afterClosed().subscribe(res=>{


      if(fltOrOpt=="Filtros"){
        var obj=this.aulaVirtualService.ObjFltSeleccionados;

        const objParametros={
          graCod: obj["grado"],
          secCod: obj["seccion"],
          nivCod: obj["nivel"],
          turCod: obj["turno"],
          colCod: this.inputColCod,
        }
        if(objParametros.graCod==="string"){objParametros.graCod=undefined;}
        if(objParametros.secCod==="string"){objParametros.secCod=undefined;}
        if(objParametros.nivCod==="string"){objParametros.nivCod=undefined;}
        if(objParametros.turCod==="string"){objParametros.turCod=undefined;}
    
        
        return this.aulaVirtualService.postObtenerAulas(objParametros)
        .subscribe(res =>{
          this.arrayAulaVirtual=res as GetAulaVirtual[];
        });

      }
      else{

        var getOptModal=this.aulaVirtualService.OptSelected;
  
        if(getOptModal=="ShowDivListaAulas"){
          this.ShowDivListaAulas();
        }
        else if(getOptModal=="ShowDivListaAlumnos"){
          this.ShowDivListaAlumnos();
        }
        else if(getOptModal=="ShowDivListaCursos"){
          this.ShowDivListaCursos();
        }
        else if(getOptModal=="ShowDivListaDocentes"){
          this.ShowDivListaDocentes();
        }
        else if(getOptModal=="ShowDivHorario"){
          this.ShowDivHorario();
        }
      }

     
    });   
  }
  

  BuscarAulas(){



    const objParametros={
      graCod: this.fltSelectGraCod,
      secCod: this.fltSelectSecCod,
      nivCod: this.fltSelectNivCod,
      turCod: this.fltSelectTurCod,
      colCod: this.inputColCod,
    }
    if(objParametros.graCod==="..."){objParametros.graCod=undefined;}
    if(objParametros.secCod==="..."){objParametros.secCod=undefined;}
    if(objParametros.nivCod==="..."){objParametros.nivCod=undefined;}
    if(objParametros.turCod==="..."){objParametros.turCod=undefined;}

    return this.aulaVirtualService.postObtenerAulas(objParametros)
    .subscribe(res =>{
      this.arrayAulaVirtual=res as GetAulaVirtual[];
    });

  }

  GetSltGrado(val: any){
    this.fltSelectGraCod=val;
  }

  GetSltSeccion(val: any){
    this.fltSelectSecCod=val;
  }

  GetSltNivel(val: any){
    this.fltSelectNivCod=val;
  }

  GetSltTurno(val: any){
    this.fltSelectTurCod=val;
  }

  /** Capturar dia del horario */
  GetLunes(val: any){
    this.dia="Lunes";
  }

  GetMartes(val: any){
    this.dia="Martes";
  }

  GetMiercoles(val: any){
    this.dia="Miercoles";
  }

  GetJueves(val: any){
    this.dia="Jueves";
  }

  GetViernes(val: any){
    this.dia="Viernes";
  }
  
  GetSabado(val: any){
    this.dia="Sabado";
  }

  LimpiarFormAsignarDocente(){
    this.nomDocente="";
    this.apeDocente="";
    this.divAsignarDocente=false;
    this.divHorario=true;
    this.btnCrearActlzDocBoolean=true;
  }

 

  ngOnInit() {

    let pflAct=JSON.parse(localStorage.getItem('prfactcod'));
    this.pflAct=this.mntAdminCrabbService.decript(pflAct);

    this.CapturarPeriodoActual();
    this.CargarTablaMatricula();

    this.CargarFiltroGrados();
    this.CargarFiltroSeccion();
    this.CargarFiltroNivel();
    this.CargarFiltroTurno();

    this.fltSelectGraCod="...";
    this.fltSelectSecCod="...";
    this.fltSelectNivCod="...";
    this.fltSelectTurCod ="...";

    var arr = ['08:15', '04:23', '01:58','03:38'];

    function comparar(a, b) {
      return a - b;
    }

  }


}
