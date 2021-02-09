import { Component, OnInit, Input } from '@angular/core';

import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ModalOptionsComponent } from '../modal-options/modal-options.component';
import { ModalOptCursoComponent } from '../modal-opt-curso/modal-opt-curso.component';

/******* Importacion de Modelos******** */
import { Ciencia, GetCiencia, GetSelectCiencia, GetSltCiencia } from '../../modelos/ciencia';
import { NucleoArea,GetNucleoCurso,NucleoCurso } from '../../modelos/mnt-admin-crabb';

import { Curso, GetCurso } from '../../modelos/curso';
import { CursoGrado, GetCursoGrado } from '../../modelos/curso-grado';
import { Grado, GetGrado } from '../../modelos/grado';
import { Nivel, GetNivel } from '../../modelos/nivel';

/******* Importacion de Servicios******** */
import { CienciaService } from '../../servicios/ciencia.service';
import { CursoService } from '../../servicios/curso.service';
import { CursoGradoService } from '../../servicios/curso-grado.service';
import { GradoService } from '../../servicios/grado.service';
import { NivelService } from '../../servicios/nivel.service';

import { MntAdminCrabbService } from '../../servicios/mnt-admin-crabb.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';


declare var M: any;

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  @Input() inputColCod: string = "5d89b6c1105ad41bf473bf00";


  /** Referente a Area */
  ModeloNcoArea:NucleoArea=new NucleoArea();
  arraySelectNucleoArea:NucleoArea[];
  arrayFltSltNucleoArea:NucleoArea[];

  ModeloNcoCurso:NucleoCurso=new NucleoCurso()
  arraySelectNucleocurso: GetNucleoCurso[];
  arrayFltSltNucleoCurso: GetNucleoCurso[];


  /******* Objetos referentes a la clase ******** */
  ModeloCursoGrado: CursoGrado = new CursoGrado();
  ModeloGrado: Grado = new Grado();
  ModeloNivel: Nivel = new Nivel();

  arrayCursoGrado: GetCursoGrado[];
  arrayGrado: GetGrado[];
  arrayNivel: GetNivel[];

  /******* Filtros del mantenimiento CursoGrado ******** */
  fltMntCurGra_Niv: GetNivel[] = [];
  fltMntCurGra_Gra: GetGrado[] = [];
  fltMntCurGra_Cur: GetCurso[] = [];

  ModelofltMntCurGra_Gra: GetGrado = new GetGrado();
  ModelofltMntCurGra_Niv: GetNivel = new GetNivel();
  ModelofltMntCurGra_Cur: GetCurso = new GetCurso();


  /******* Variables que se obtienen desde el filtro ******** */

  flt_curCod: string;
  flt_graCod: string;
  flt_nivCod: string;
  flt_areCod: string;

  /******* Variables segun la clase ******** */

  cur_id: string;
  curGra_id: string;
  crearCursoGrado:boolean=false;

  exist: boolean = false;

  /******* Variables de Interaccion de Div's ************ */
  divCursoGrado: boolean = true;
  btnEditarGuardar: string="Guardar";

  varOptSetModal:object;
  hideOpc: boolean=false;

  constructor(
    private cienciaService: CienciaService,
    private cursoService: CursoService,
    private cursoGradoService: CursoGradoService,
    private gradoService: GradoService,
    private nivelService: NivelService,
    private mntAdminCrabbService: MntAdminCrabbService,
    public dialog                     : MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) { 
    this.matIconRegistry.addSvgIcon(
      "editar",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/editar.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "eliminar",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/eliminar.svg")
    );
  }

  /****************************** Interaccion de Div´s ************************/
  HideDivs() {
    this.divCursoGrado = false;
    this.crearCursoGrado=false;
  }

  HideOpcCrearCur(){

     console.log("Sejectua");
    var pfl= JSON.parse(localStorage.getItem('prfactcod'));
    pfl= this.mntAdminCrabbService.decript(pfl);

    if(
        pfl=="5e0a9164c2a58d0b8872b2b8" ||
        pfl=="5e0a916dc2a58d0b8872b2b9" ||
        pfl=="5e0a9176c2a58d0b8872b2ba" ||
        pfl=="5e0a917ec2a58d0b8872b2bb"
      ){
        console.log("2222222222222");
        this.hideOpc=true;
    }

  }

  openDialog(cg:GetCursoGrado){
  
      const dialogRef =this.dialog.open(ConfirmDialogComponent,{
        width: '250px',
        data:' ¿ Desea eliminar el Curso ? ',
        
      });
      dialogRef.afterClosed().subscribe(res=>{
        if(res===true){  
          this.EliminarCursoGrado(cg);

        }
      });   
    
  }

  openModalOpt(){

    var objMensaje={
      opcion:this.varOptSetModal
    }

    const dialogRef =this.dialog.open(ModalOptCursoComponent,{
      width: '250px',
      data: objMensaje,
    });

    dialogRef.afterClosed().subscribe(res=>{
      var obj=this.cursoGradoService.ObjFltSeleccionados;

      const objParametros={
        graCod: obj["grado"],
        areCod: obj["area"],
        nivCod: obj["nivel"],
        curCod: obj["curso"],
        colCod: this.inputColCod,
      }
      if(objParametros.graCod==="string"){objParametros.graCod=undefined;}
      if(objParametros.curCod==="string"){objParametros.curCod=undefined;}
      if(objParametros.nivCod==="string"){objParametros.nivCod=undefined;}
      if(objParametros.areCod==="string"){objParametros.areCod=undefined;}
  
      return this.cursoGradoService.getCursoGrado(objParametros)
      .subscribe(res =>{
        this.arrayCursoGrado=res as GetCursoGrado[];
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

  ShowDivCursoGrado() {
    this.HideDivs();
    this.CargarFltMntCurGra_gra();
    this.CargarFltMntCurGra_niv();
    this.getFltSltAreas();

    

    this.CargarTablaCursoGrado();

    this.divCursoGrado = true;
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
    this.LimpiarCursoGrado();
    this.ModelofltMntCurGra_Gra._id = "string";
    this.ModelofltMntCurGra_Niv._id = "string";
    this.ModelofltMntCurGra_Cur._id = "string";

    this.flt_curCod = undefined;
    this.flt_graCod = undefined;
    this.flt_nivCod = undefined;
    this.flt_areCod = undefined;
  }

  ShowDivCrearCursoGrado(){
    this.HideDivs();
    this.CargarSelectGrado();
    this.CargarSelectNivel();

    this.getSltAreas();
    this.crearCursoGrado = true;

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

    this.LimpiarCursoGrado();
    this.ModelofltMntCurGra_Gra._id = "string";
    this.ModelofltMntCurGra_Niv._id = "string";
    this.ModelofltMntCurGra_Cur._id = "string";

    this.flt_curCod = undefined;
    this.flt_graCod = undefined;
    this.flt_nivCod = undefined;
  }

  preEditarCursoGrado(cg: GetCursoGrado){
    this.crearCursoGrado = true;
    this.mntAdminCrabbService.getCursosArea(this.ModeloNcoArea._id=cg.areCod._id)
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
      this.ModeloNcoCurso._id=cg.curCod._id;
    });

    this.ModeloNcoArea._id=cg.areCod._id;
    this.ModeloGrado._id=cg.graCod._id;
    this.ModeloNivel._id=cg.nivCod._id;
    this.ModeloCursoGrado._id=cg._id;
    this.btnEditarGuardar="Editar";

    this.HideDivs();
    this.crearCursoGrado=true;

  }

  validarFrmCursoGrado():boolean{

    var rpta=false;
    if(this.ModeloCursoGrado.nivCod==undefined || this.ModeloCursoGrado.nivCod==null || this.ModeloCursoGrado.nivCod=="string"){
      M.toast({ html: ' Debe seleccionar un nivel' });
      rpta=true;
    }
    else if(this.ModeloCursoGrado.graCod==undefined || this.ModeloCursoGrado.graCod==null  || this.ModeloCursoGrado.graCod=="string"){
      M.toast({ html: ' Debe seleccionar un grado' });
      rpta=true;
    }
    else if(this.ModeloCursoGrado.areCod==undefined || this.ModeloCursoGrado.areCod==null || this.ModeloCursoGrado.areCod=="string"){
      M.toast({ html: ' Debe seleccionar un area' });
      rpta=true;
    }
    else if(this.ModeloCursoGrado.curCod==undefined || this.ModeloCursoGrado.curCod==null || this.ModeloCursoGrado.curCod=="string"){
      M.toast({ html: ' Debe seleccionar un curso' });
      rpta=true;
    }
    return rpta;
  }

  CrearCursoGrado() {
  this.ModeloCursoGrado.curCod=this.ModeloNcoCurso._id;
  this.ModeloCursoGrado.nivCod=this.ModeloNivel._id;
  this.ModeloCursoGrado.areCod=this.ModeloNcoArea._id;
  this.ModeloCursoGrado.graCod=this.ModeloGrado._id;
  this.ModeloCursoGrado.colCod=this.inputColCod;

    if(this.validarFrmCursoGrado()==true){
    }
    else{

      if(this.ModeloCursoGrado._id){

        this.cursoGradoService.putCurso(this.ModeloCursoGrado)
        .subscribe(res=>{
          var status=res["status"];
      
          if(status===200){
            M.toast({ html: ' Se edito el curso' });
            this.HideDivs();
            this.divCursoGrado=true;
            this.CargarTablaCursoGrado();
            this.btnEditarGuardar="Guardar";
          }
          else if(status===510){
            M.toast({ html: ' Ya existe este curso en este grado' });
          }
          else if(status===514){
            M.toast({ html: ' Existen notas asociadas a este curso, no es posible editar' });
          }
          else{
            M.toast({ html: ' Error, este curso ya se encuentra asignado' });
          }
      
      
        })
      }
      else{
        this.cursoGradoService.postCursoGrado(this.ModeloCursoGrado)
        .subscribe(res=>{
          var status=res["status"];
      
          if(status===200){
            M.toast({ html: ' Se asigno el curso' });
        
            this.btnEditarGuardar="Guardar";
          }
          else{
            M.toast({ html: ' Error, este curso se encuentra asignado' });
          }
      
      
        })
      }


      
    }

  }

  EliminarCursoGrado(cursoGrado: GetCursoGrado){
    const _id = cursoGrado._id;

    this.cursoGradoService.deleteCursoGrado(_id)
    .subscribe(res=>{
      
      var status=res["status"];
      if(status==200){
        M.toast({ html: ' Se elimino el curso' });
        this.ShowDivCursoGrado();

      }
      else if(status==514){
        M.toast({ html: 'Existen notas asociadas a este curso, No se puede eliminar' });
      }
    });
  }

  CargarTablaCursoGrado() {
    this.cursoGradoService.getCursosGradoCol(this.inputColCod)
    .subscribe(res=>{

      this.arrayCursoGrado=res as GetCursoGrado[];
      this.LimpiarCursoGrado();
    })
  }

  /************************** Metodos para filtrado de datos ***********/
  CargarFltMntCurGra_cur() {
    return this.cursoService.getCursosCol(this.inputColCod)
      .subscribe(res => {
        this.fltMntCurGra_Cur = res as GetCurso[];
        this.fltMntCurGra_Cur.unshift({
          estCod: "string",
          _id: "string",
          cieCod: {
            estCod: "string",
            _id: "string",
            cieNom: "string",
            cieDes: "string",
            colCod: "string",
            timestamp: "string",
            __v: 1,
          },
          curNom: " Curso ",
          curDes: "string",
          colCod: "string",
          timestamp: "string",
          __v: 1,
        });


      });
  }

  CargarFltMntCurGra_gra() {
    return this.gradoService.getGrados()
      .subscribe(res => {
        this.fltMntCurGra_Gra = res as GetGrado[];
        this.fltMntCurGra_Gra.unshift({
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
          graDes: " Grado ",
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

  CargarFltMntCurGra_niv() {
    return this.nivelService.getNivel()
      .subscribe(res => {
        this.fltMntCurGra_Niv = res as GetNivel[];
        this.fltMntCurGra_Niv.unshift({
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
          nivDes: " Nivel ",
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

  /************************** Metodos Boton Buscar (Barra de filtros) ***********/
  getFltCurso(val: any) {
    this.flt_curCod = val;
  }

  getFltGrado(val: any) {
    this.flt_graCod = val;
  }

  getFltNivel(val: any) {
    this.flt_nivCod = val;
  }

  BuscarMntCursoGrado() {
    var objCurso = {
      colCod: this.inputColCod,
      curCod: this.flt_curCod,
      nivCod: this.flt_nivCod,
      areCod: this.flt_areCod,
      graCod: this.flt_graCod,
    }

    console.log(objCurso);

    if(objCurso.curCod=="string"){
      objCurso.curCod=undefined;
    }
    if(objCurso.nivCod=="string"){
      objCurso.nivCod=undefined;
      console.log("entro nivcod");
    }
    if(objCurso.graCod=="string"){
      objCurso.graCod=undefined;
      console.log("entro gracod");
    }
    if(objCurso.areCod=="string"){
      objCurso.areCod=undefined;
      console.log("entro arecod");
    }

    return this.cursoGradoService.getCursoGrado(objCurso)
      .subscribe(res => {
        this.arrayCursoGrado=res as GetCursoGrado[];
      });
  }

  /*************************** Metodos para Cargar Data ************************/
 

  CargarSelectGrado() {
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

  CargarSelectNivel() {
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

  LimpiarCursoGrado() {
    this.ModeloNcoArea._id = "string";
    this.ModeloNcoCurso._id = "string";
    this.ModeloGrado._id = "string";
    this.ModeloNivel._id = "string";
    this.ModeloCursoGrado=new CursoGrado();

    this.btnEditarGuardar = "Crear";
  }

  cancelar(){
    this.LimpiarCursoGrado();
    this.ShowDivCursoGrado();
  }


  ngOnInit() {
    this.ShowDivCursoGrado();
    this.CargarSelectGrado();
    this.CargarSelectNivel();
    this.HideOpcCrearCur();
    this.getSltAreas();
  }

}
