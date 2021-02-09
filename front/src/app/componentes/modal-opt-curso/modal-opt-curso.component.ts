import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

/** Modelos */
import { Grado, ListaGrados,GetGrado,GetGradoFiltro }  from '../../modelos/grado'; 
import { Nivel, ListaNivel,GetNivel, GetNivelFiltro }  from '../../modelos/nivel'; 



/** Servicios */
import { GradoService } from '../../servicios/grado.service'; 
import { NivelService } from '../../servicios/nivel.service';
import { CursoGradoService } from '../../servicios/curso-grado.service';
import { GetNucleoCurso, NucleoArea, NucleoCurso } from 'src/app/modelos/mnt-admin-crabb';
import { GetCurso } from 'src/app/modelos/aula-curso';
import { MntAdminCrabbService } from '../../servicios/mnt-admin-crabb.service';
import { MantenimientoAdministrativoComponent } from '../mantenimiento-administrativo/mantenimiento-administrativo.component';


@Component({
  selector: 'app-modal-opt-curso',
  templateUrl: './modal-opt-curso.component.html',
  styleUrls: ['./modal-opt-curso.component.css']
})
export class ModalOptCursoComponent implements OnInit {

  ModeloGrado: Grado=new Grado();
  arrayGrado:  GetGrado[];
  fltArrayGrado:GetGradoFiltro[]=[];

  ModeloNivel: Nivel=new Nivel();
  arrayNivel: GetNivel[];
  fltArrayNivel:GetNivelFiltro[]=[];

  ModeloNcoArea:NucleoArea=new NucleoArea();
  arraySelectNucleoArea:NucleoArea[];
  arrayFltSltNucleoArea:NucleoArea[];

  ModeloNcoCurso:NucleoCurso=new NucleoCurso()
  arraySelectNucleocurso: GetNucleoCurso[];
  arrayFltSltNucleoCurso: GetNucleoCurso[];


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

  constructor(
    public dialogRef: MatDialogRef<ModalOptCursoComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private gradoService:GradoService,
    private nivelService:NivelService,
    private cursoGradoService:CursoGradoService,
    private mntAdminCrabbService:MntAdminCrabbService,
  ) { }

  /** filtros */

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
      this.ModeloNivel._id=   "string";
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
      this.ModeloGrado._id=   "string";
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
      console.log(this.arrayFltSltNucleoArea);
    });
  }

  capturarArea_Curso(e){
    this.arraySelectNucleocurso=[];
    console.log(e);
    this.flt_areCod = e;
    const areCod=e;
    console.log(areCod);

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
        console.log(res);
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

    this.getFltSltAreas();

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


    this.ModelofltMntCurGra_Gra._id = "string";
    this.ModelofltMntCurGra_Niv._id = "string";
    this.ModelofltMntCurGra_Cur._id = "string";

    this.flt_curCod = undefined;
    this.flt_graCod = undefined;
    this.flt_nivCod = undefined;
  }

  EnviarDatos(){

    var objFltSeleccionados={
      grado: this.ModeloGrado._id,
      nivel: this.ModeloNivel._id,
      area: this.ModeloNcoArea._id,
      curso: this.ModeloNcoCurso._id
    }

    this.cursoGradoService.ObjFltSeleccionados=objFltSeleccionados;
    this.dialogRef.close();

  }

 
  ngOnInit() {
    this.CargarTablaGrados();
    this.CargarTablaNivel();
    this.getFltSltAreas();
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

}
