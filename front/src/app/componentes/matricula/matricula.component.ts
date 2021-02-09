import { Component, OnInit,Input } from '@angular/core';
import { MatDialog } from '@angular/material';


import { ModalOptMatriculaComponent } from '../modal-opt-matricula/modal-opt-matricula.component';
/******* Importacion de Modelos******** */
import { Grado, ListaGrados,GetGrado,GetGradoFiltro }  from '../../modelos/grado'; 
import { Seccion, ListaSeccion,GetSeccion, GetSeccionFiltro }  from '../../modelos/seccion'; 
import { Nivel, ListaNivel,GetNivel, GetNivelFiltro }  from '../../modelos/nivel'; 
import { Turno, ListaTurno,GetTurno }  from '../../modelos/turno';
import { PersonaRepositorio, FrmPersona, Dia, Mes, Anio } from '../../modelos/persona-repositorio';
import { GetAlumno }  from '../../modelos/alumno';
import { Periodo, GetPeriodo }  from '../../modelos/periodo';
import { Matricula, GetMatricula }  from '../../modelos/matricula';
import { GetAulaVirtual, AulaVirtual }  from '../../modelos/aula-virtual'; 

/******* Importacion de Servicios******** */
import { GradoService } from '../../servicios/grado.service'; 
import { SeccionService } from '../../servicios/seccion.service'; 
import { NivelService } from '../../servicios/nivel.service';
import { TurnoService } from '../../servicios/turno.service'; 
import { PersonaRepositorioService } from '../../servicios/persona-repositorio.service';
import { MantenimientoCargoService } from '../../servicios/mantenimiento-cargo.service'; 
import { PeriodoService } from '../../servicios/periodo.service'; 
import { MatriculaService } from '../../servicios/matricula.service'; 
import { AulaVirtualService } from '../../servicios/aula-virtual.service'; 

declare var M: any;

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {
  @Input() inputColCod:string;

/******* Objetos referentes a la clase ******** */
ModeloAulaVirtual : AulaVirtual=new AulaVirtual();
arrayAulaVirtual  : GetAulaVirtual[];  
filterAulaVirtual : GetAulaVirtual[]=[];

ModeloMatricula:Matricula=new Matricula();
arrayMatricula :GetMatricula[];
filterMatricula :GetMatricula[]=[];

ModeloPeriodo:Periodo=new Periodo();
arrayPeriodo:Periodo=new Periodo();
fltArrayPeriodo:Periodo[]=[];


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



ModeloPerRep: PersonaRepositorio = new PersonaRepositorio();


 /** array´s para filtros */




/******** Referente a alumno   ********** */
alumnosArray :GetAlumno[];
aluArray :GetAlumno[]=[];
alumno_id:string;
alumnoNomApe:string;
alumnoApeFiltro:string;
perRepCod:string;
alumno_dni:string;


/******* Elemento Seleccionado ******** */
gradoSeleccionado:string;
seccionSeleccionado:string;
nivelSeleccionado:string;
turnoSeleccionado:string;
periodoActual:string;

/******* Variables segun la clase ******** */
gra_id:string;
graDes:string;
grado:string;

sec_id:string;
secDes:string;
seccion:string;

niv_id:string;
nivDes:string;
nivel:string;

tur_id:string;
turDes:string;
turno:string;

divCrearMatricula:boolean=false;
divlistaMatriculas:boolean=true;
divListAulas:boolean=false;

CamposVacios:boolean=false;

fltSelectGraCod: string;
fltSelectSecCod: string;
fltSelectNivCod: string;
fltSelectTurCod: string;
fltSelectPrdCod: string;

disableSltAlum: boolean=false;
anioTitulo: string;
nomBoton: string="Crear";

disabledSelect:boolean=true;
preDiv:string="";

ttlMatricula:string="";


/**** interaccion Div´s */
HideDivs(){
  this.divCrearMatricula=false;
  this.divlistaMatriculas=false;
  this.divListAulas=false;
}
/********************************* */

ShowDivListAulas(){
  this.HideDivs();
  this.divListAulas=true;
  this.fltSelectGraCod="...";
  this.fltSelectSecCod="...";
  this.fltSelectNivCod="...";
  this.fltSelectPrdCod="...";
  this.CargarTablaMatricula();
  this.LimpiarMatricula();
}  


ShowDivCrearMatricula(aula: GetAulaVirtual){
  this.HideDivs();

  console.log("aula");
  console.log(aula);
  this.divCrearMatricula=true;
  this.disableSltAlum=false;
  this.disabledSelect=true;
  this.ModeloGrado._id=aula.graCod._id;
  this.ModeloSeccion._id=aula.secCod._id;
  this.ModeloNivel._id=aula.nivCod._id;
  this.ModeloTurno._id=aula.turCod._id;
  this.nomBoton="Crear";
  this.preDiv="listaAulas";
  this.ttlMatricula="Crear Matricula";
  
}

ShowDivListaMatricula(){
  this.HideDivs();
  this.fltSelectGraCod="...";
  this.fltSelectSecCod="...";
  this.fltSelectNivCod="...";
  this.fltSelectPrdCod="...";
  this.divlistaMatriculas=true;
  this.CargarTablaMatricula();

  this.listFilterMat="";
}


constructor
(
  private gradoService:GradoService,
  private seccionService:SeccionService,
  private nivelService:NivelService,
  private turnoService:TurnoService,
  private personaRepositorioService: PersonaRepositorioService,
  private mantenimientoCargoService: MantenimientoCargoService,
  private periodoService: PeriodoService,
  private matriculaService: MatriculaService,
  private aulaVirtualService:AulaVirtualService,
  public  dialog         : MatDialog,
) { }

_listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.alumnosArray = this.listFilter ? this.performFilter(this.listFilter) : this.aluArray;
  }

  performFilter(filterBy: string): GetAlumno[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.aluArray.filter((alumno: GetAlumno) =>
      alumno.perRepCod.perRepDni.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

/** ***************************************** */
  _listFilterMat: string;
  get listFilterMat(): string {
    return this._listFilterMat;
  }
  
  set listFilterMat(valueMat: string) {
    this._listFilterMat = valueMat;
    this.arrayMatricula = this.listFilterMat ? this.performFilterMat(this.listFilterMat) : this.filterMatricula;
  }
  

  performFilterMat(filterByMat: string): GetMatricula[] {
    filterByMat = filterByMat.toLocaleLowerCase();
    return this.filterMatricula.filter((matricula: GetMatricula) =>
      matricula.perRepCod.perRepApe.toLocaleLowerCase().indexOf(filterByMat) !== -1);
  }

  openModalOptMatricula(fltOrOpt:string){

    var objMensaje={


      fltOrOpt:fltOrOpt,
      colCod: this.inputColCod

    }
    console.log(objMensaje);

    const dialogRef =this.dialog.open(ModalOptMatriculaComponent,{
      width: '250px',
      data: objMensaje,
    });

    dialogRef.afterClosed().subscribe(res=>{

      console.log(this.matriculaService.OptSelected);

      if(fltOrOpt=="Filtros"){


        var obj=this.matriculaService.ObjFltSeleccionados
        console.log(obj);
        const objParametros={
          graCod: obj["grado"],
          secCod: obj["seccion"],
          nivCod: obj["nivel"],
          prdCod: obj["periodo"],
          colCod: this.inputColCod,
        }
        if(objParametros.graCod==="string"){objParametros.graCod=undefined;}
        if(objParametros.secCod==="string"){objParametros.secCod=undefined;}
        if(objParametros.nivCod==="string"){objParametros.nivCod=undefined;}
        if(objParametros.prdCod==="..."){objParametros.prdCod=undefined;}
    
        
        console.log(objParametros);
        return this.matriculaService.postObtenerMatriculas(objParametros)
        .subscribe(res =>{
          this.arrayMatricula = res as GetMatricula[];
          this.filterMatricula=this.arrayMatricula;
          this.listFilterMat="";

          console.log("res");
        });

      }
      else if(fltOrOpt=="FiltrosListAula"){
        var obj=this.matriculaService.ObjFltSeleccionados
        console.log(obj);
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
    
        
        console.log(objParametros);
        return this.aulaVirtualService.postObtenerAulas(objParametros)
        .subscribe(res =>{
          this.arrayAulaVirtual = res as GetAulaVirtual[];
          for(var h=0;h<this.arrayAulaVirtual.length;h++){
            if(this.arrayAulaVirtual[h].estCod=="5e0a8a479644411040ebf293"){
              this.arrayAulaVirtual.splice(h,1)
            }
          }
          this.filterAulaVirtual=this.arrayAulaVirtual;
        });
      }
      else if(fltOrOpt=="FiltrosListAula"){

      }
      else{

        var getOptModal=this.matriculaService.OptSelected;
  
        if(getOptModal=="ShowDivListaMatricula"){

          this.ShowDivListaMatricula();
        }
        else if(getOptModal=="ShowDivListAulas"){

          this.ShowDivListAulas();
        }   
      }
     
    });   
  }


  CargarTablaMatricula(){
    console.log("AULASSS");
    this.aulaVirtualService.getAulasVirtCol(this.inputColCod)
      .subscribe(res => {
        this.arrayAulaVirtual = res as GetAulaVirtual[];
        console.log(this.arrayAulaVirtual);

        for(var h=0;h<this.arrayAulaVirtual.length;h++){
          if(this.arrayAulaVirtual[h].estCod=="5e0a8a479644411040ebf293"){
            this.arrayAulaVirtual.splice(h,1)
          }
        }
        this.filterAulaVirtual=this.arrayAulaVirtual;

        console.log(this.arrayAulaVirtual);
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
      console.log(this.fltArrayGrado);
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
      console.log(this.fltArraySeccion);
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
      console.log(this.fltArrayNivel);
    });
  }

  CargarFiltroTurno(){
    console.log("Turno");
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
      console.log(this.fltArrayTurno);
    });
  }


  CargarFiltroPeriodo(){
    return this.periodoService.getPeriodosColegio(this.inputColCod)
    .subscribe(res=>{
      this.fltArrayPeriodo=res as Periodo[];

      this.fltArrayPeriodo.unshift({
        _id: "...",        // Codigo interno del registro
        prdAnio:"- Periodo -",     // Año del periodo
        prdFchIni: "",  // Fecha de inicio del periodo
        prdFchFin: "",  // Fecha de fin del periodo
        tpoPrdCod:"",   // Tipo de periodo
        colCod:"",      // colegio al que corresponde el periodo
        estCod:"",      // estado del periodo ( Culminado, Activo, En progreso )
        timestamp:"",     // Fecha de creacion del registro
      })
    });

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
      console.log(this.arrayGrado);
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
      console.log(this.arraySeccion);
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
      console.log(this.arrayTurno);
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
      console.log(this.arrayTurno);
    });
  }

  CargarTablaAlumnos() {
    this.mantenimientoCargoService.getAlumnosColegio(this.inputColCod)
      .subscribe(res => {
        this.alumnosArray = res as GetAlumno[];
        this.aluArray=this.alumnosArray;
        console.log(this.alumnosArray);
      });
  }

  SeleccionarAlumno(alumno: GetAlumno){
      this.alumno_id=alumno._id;
      this.alumnoNomApe=alumno.perRepCod.perRepNom+', '+alumno.perRepCod.perRepApe;
      this.perRepCod=alumno.perRepCod._id;
      this.alumno_dni=alumno.perRepCod.perRepDni;
      this.alumnoApeFiltro=alumno.perRepCod.perRepApe
      console.log(this.alumnoNomApe);
      console.log(alumno.perRepCod);
  }

  ValidarCampos(){
    this.CamposVacios=false;

    if(this.ModeloMatricula.aluCod===undefined||this.ModeloMatricula.aluCod===null||this.ModeloMatricula.aluCod===""){
      M.toast({ html: 'Seleccione el Alumno' });
      this.CamposVacios=true;
    }
    else if(this.ModeloMatricula.perRepCod===undefined||this.ModeloMatricula.perRepCod===null||this.ModeloMatricula.perRepCod===""){
      M.toast({ html: 'Seleccione el Alumno' });
      this.CamposVacios=true;
    }
    else if(this.ModeloMatricula.graCod===undefined||this.ModeloMatricula.graCod===null||this.ModeloMatricula.graCod==="string"){
      M.toast({ html: 'Seleccione el Grado' });
      this.CamposVacios=true;
    }
    else if(this.ModeloMatricula.secCod===undefined||this.ModeloMatricula.secCod===null||this.ModeloMatricula.secCod==="string"){
      M.toast({ html: 'Seleccione la Seccion' });
      this.CamposVacios=true;
    }
    else if(this.ModeloMatricula.nivCod===undefined||this.ModeloMatricula.nivCod===null||this.ModeloMatricula.nivCod==="string"){
      this.CamposVacios=true;
      M.toast({ html: 'Seleccione el Nivel' });
    }
    else if(this.ModeloMatricula.turCod===undefined||this.ModeloMatricula.turCod===null||this.ModeloMatricula.turCod==="string"){
      this.CamposVacios=true;
      M.toast({ html: 'Seleccione el Turno' });
    }
    else if(this.ModeloMatricula.colCod===undefined||this.ModeloMatricula.colCod===null||this.ModeloMatricula.colCod===""){
      this.CamposVacios=true;
      M.toast({ html: 'No se encontro el colegio' });
    }
    else if(this.ModeloMatricula.prdCod===undefined||this.ModeloMatricula.prdCod===null||this.ModeloMatricula.prdCod===""){
      this.CamposVacios=true;
      M.toast({ html: 'No se encontro el Periodo actual' });
    }
  }

  CrearMatricula(){

    this.ModeloMatricula.aluCod=this.alumno_id;
    this.ModeloMatricula.perRepCod=this.perRepCod;
    this.ModeloMatricula.graCod=this.ModeloGrado._id;
    this.ModeloMatricula.secCod=this.ModeloSeccion._id;
    this.ModeloMatricula.nivCod=this.ModeloNivel._id;
    this.ModeloMatricula.turCod=this.ModeloTurno._id;
    this.ModeloMatricula.colCod=this.inputColCod;
    this.ModeloMatricula.prdCod=this.periodoActual;

    this.ValidarCampos();

    if(this.CamposVacios===true){

    }
    else if(this.CamposVacios===false){

      if(this.nomBoton==="Editar"){
        console.log("Se va a editar");
        console.log(this.ModeloMatricula._id);

        return this.matriculaService.putMatricula(this.ModeloMatricula)
        .subscribe(res => {  
        var status=res["status"];

        if(status===200){
          console.log(res);
          this.CargarTablaMatriculas(this.periodoActual);
          M.toast({ html: 'Se edito el registro' });
          this.divCrearMatricula=false;
          this.divlistaMatriculas=true;
          setTimeout(() => {
            this.listFilterMat=this.alumnoApeFiltro;
          }, 700);
          
          this.nomBoton="Crear";
        }else if(status===404){
          M.toast({ html: 'No existe el aula indicada' });
          this.divCrearMatricula=false;
          this.divlistaMatriculas=true;
          this.nomBoton="Crear";
        }
      });

      }else{

        console.log("Entro a matricular")
        console.log(this.ModeloMatricula);
  
     
        return this.matriculaService.postMatricula(this.ModeloMatricula)
        .subscribe(res => {  
        var status=res["status"];

        if(status===200){
          M.toast({ html: 'Se registro la matricula correctamente' });
          this.CargarTablaMatriculas(this.periodoActual);
          
          this.nomBoton="Crear";
        }
        else if(status===420){
          M.toast({ html: 'Por favor cree un periodo con el año actual' });
        }
        else{
          M.toast({ html: 'El alumno ya se encuentra matriculado en este periodo' });
          this.divCrearMatricula=false;
          this.divlistaMatriculas=true;
          this.listFilterMat=this.alumnoApeFiltro;
          this.nomBoton="Crear";
        }
      });

    
        
      }
    }
  }

  LimpiarMatricula(){
    this.ModeloMatricula.aluCod="";
    this.ModeloMatricula.perRepCod="";
    this.ModeloMatricula.graCod="";
    this.ModeloMatricula.secCod="";
    this.ModeloMatricula.nivCod="";
    this.ModeloMatricula.turCod="";
    this.ModeloMatricula.colCod="";
    this.ModeloMatricula.prdCod="";

    this.alumno_id="";
    this.perRepCod="";
    this.ModeloGrado._id="string";
    this.ModeloSeccion._id="string";
    this.ModeloNivel._id="string";
    this.ModeloTurno._id="string";
    this.ModeloMatricula._id=undefined;
    this.alumnoNomApe="";
    this.nomBoton="Crear";

    this.disableSltAlum=false;
    this.alumnoApeFiltro="";
  }

  Cancelar(){

    if(this.preDiv=="listaAulas"){
      this.ShowDivListAulas();
    }
    else if(this.preDiv=="listaMatriculas"){
      this.ShowDivListaMatricula();
    }
  }



  CargarTablaMatriculas(periodoActual:string){
      return this.matriculaService.getMatriculasCol(this.inputColCod,periodoActual)
      .subscribe(res => {  
        this.arrayMatricula = res as GetMatricula[];
        this.filterMatricula=this.arrayMatricula;
        console.log(this.arrayMatricula);
      });
  }

  GetCodPeriodoActual(){
        return this.periodoService.getPeriodoUltimo(this.inputColCod)
        .subscribe(res => {  
          console.log(res);
          this.arrayPeriodo = res as Periodo;

          this.periodoActual=this.arrayPeriodo._id;
          this.anioTitulo=this.arrayPeriodo.prdAnio;

          this.CargarTablaMatriculas(this.periodoActual);
          console.log("este es el año: "+ this.anioTitulo)
 
        });   
  }

  GetSltGrado(val: any){
    this.fltSelectGraCod=val;
    console.log(this.fltSelectGraCod);
  }

  GetSltSeccion(val: any){
    this.fltSelectSecCod=val;
    console.log(this.fltSelectSecCod);
  }

  GetSltNivel(val: any){
    this.fltSelectNivCod=val;
    console.log(this.fltSelectNivCod);
  }

  GetSltTurno(val: any){
    this.fltSelectTurCod=val;
    console.log(this.fltSelectTurCod);
  }


  GetSltPeriodo(val: any){
    this.fltSelectPrdCod=val;
    console.log(this.fltSelectPrdCod);
  }

  BuscarMatricula(){

    const objParametros={
      graCod: this.fltSelectGraCod,
      secCod: this.fltSelectSecCod,
      nivCod: this.fltSelectNivCod,
      prdCod: this.fltSelectPrdCod,
      colCod: this.inputColCod,
    }
    if(objParametros.graCod==="..."){objParametros.graCod=undefined;}
    if(objParametros.secCod==="..."){objParametros.secCod=undefined;}
    if(objParametros.nivCod==="..."){objParametros.nivCod=undefined;}
    if(objParametros.prdCod==="..."){objParametros.prdCod=undefined;}

    console.log(objParametros);
    return this.matriculaService.postObtenerMatriculas(objParametros)
    .subscribe(res =>{
      this.arrayMatricula=res as GetMatricula[];
      this.filterMatricula=this.arrayMatricula;
      console.log(res);
    });
  }

  BuscarAulas(){

    console.log("Buscar AULAS");
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

    console.log(objParametros);
    return this.aulaVirtualService.postObtenerAulas(objParametros)
    .subscribe(res =>{
      this.arrayAulaVirtual=res as GetAulaVirtual[];

      for(var h=0;h<this.arrayAulaVirtual.length;h++){
        if(this.arrayAulaVirtual[h].estCod=="5e0a8a479644411040ebf293"){
          this.arrayAulaVirtual.splice(h,1)
        }
      }

      console.log(res);
    });

  }

  EditarMatricula(matricula:GetMatricula){

    this.nomBoton="Editar";
    this.ModeloMatricula._id=matricula._id;    // id de la matricula

    this.ModeloGrado._id=matricula.graCod._id
    this.ModeloSeccion._id=matricula.secCod._id;
    this.ModeloNivel._id=matricula.nivCod._id; 
    this.ModeloTurno._id=matricula.turCod._id;
    this.ModeloMatricula.prdCod=matricula.prdCod._id;
    this.alumno_id=matricula.aluCod._id;   
    this.perRepCod=matricula.perRepCod._id;

    this.alumnoApeFiltro=matricula.perRepCod.perRepApe;
    this.alumnoNomApe=matricula.perRepCod.perRepNom+', '+matricula.perRepCod.perRepApe;

    console.log(this.ModeloMatricula._id);

    this.divCrearMatricula=true;
    this.divlistaMatriculas=false;
    this.disableSltAlum=true;
    this.disabledSelect=false;
    this.preDiv="listaMatriculas"
    this.ttlMatricula="Editar Matricula";
  }


  ngOnInit() {
    this.nomBoton="Crear";
    this.CargarTablaGrados();
    this.CargarTablaSeccion();
    this.CargarTablaNivel();
    this.CargarTablaTurno();
    this.CargarTablaAlumnos();
    this.GetCodPeriodoActual();

    this.CargarFiltroGrados();
    this.CargarFiltroSeccion();
    this.CargarFiltroNivel();
    this.CargarFiltroTurno();
    
    this.CargarFiltroPeriodo();

    this.ModeloGrado._id=   "string";
    this.ModeloSeccion._id= "string";
    this.ModeloNivel._id=   "string";
    this.ModeloTurno._id=   "string";

    this.fltSelectGraCod="...";
    this.fltSelectSecCod="...";
    this.fltSelectNivCod="...";
    this.fltSelectTurCod="...";
    this.fltSelectPrdCod="...";
    
  }
}
