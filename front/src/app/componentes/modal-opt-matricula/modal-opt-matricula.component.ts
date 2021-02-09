import { Component, OnInit,Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

/** Modelos */
import { Grado, ListaGrados,GetGrado,GetGradoFiltro }  from '../../modelos/grado'; 
import { Seccion, ListaSeccion,GetSeccion, GetSeccionFiltro }  from '../../modelos/seccion'; 
import { Nivel, ListaNivel,GetNivel, GetNivelFiltro }  from '../../modelos/nivel'; 
import { Turno, ListaTurno,GetTurno }  from '../../modelos/turno';
import { Periodo, GetPeriodo }  from '../../modelos/periodo';

/**Servicios */
import { AulaVirtualService } from '../../servicios/aula-virtual.service';
import { MatriculaService } from '../../servicios/matricula.service';
import { GradoService } from '../../servicios/grado.service'; 
import { SeccionService } from '../../servicios/seccion.service'; 
import { NivelService } from '../../servicios/nivel.service';
import { TurnoService } from '../../servicios/turno.service'; 
import { PeriodoService } from '../../servicios/periodo.service'; 

@Component({ 
  selector: 'app-modal-opt-matricula',
  templateUrl: './modal-opt-matricula.component.html',
  styleUrls: ['./modal-opt-matricula.component.css']
})
export class ModalOptMatriculaComponent implements OnInit {

  inputColCod:"";
  option:boolean=true;

  divFiltros:boolean=false;
  divOpciones:boolean=false;
  divFiltrosListAula:boolean=false;

  /** Filtros de aula */
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

  ModeloPeriodo:Periodo=new Periodo();
  arrayPeriodo:Periodo=new Periodo();
  fltArrayPeriodo:Periodo[]=[];

  /** */

  constructor(
    private aulaVirtualService         : AulaVirtualService,
    public dialogRef: MatDialogRef<ModalOptMatriculaComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private gradoService:GradoService,
    private seccionService:SeccionService,
    private nivelService:NivelService,
    private turnoService:TurnoService,
    private matriculaService:MatriculaService,
    private periodoService: PeriodoService,
  ) { }


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
      this.ModeloPeriodo._id= "...";
    });

  }


    /** filtros de aula virtual */
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

    OnOffDivs(){
      var fltOrOpt=this.message["fltOrOpt"];

      if(fltOrOpt=="Opciones"){
        this.divFiltros=false;
        this.divOpciones=true;
      }
      else if(fltOrOpt=="Filtros"){

        this.CargarTablaGrados();
        this.CargarTablaSeccion();
        this.CargarTablaNivel();
        this.CargarTablaTurno();
        this.CargarFiltroPeriodo();
        this.ModeloGrado._id=   "string";
        this.ModeloSeccion._id= "string";
        this.ModeloNivel._id=   "string";
        this.ModeloTurno._id=   "string";
        this.ModeloPeriodo._id= "...";
        this.divFiltros=true;
        this.divOpciones=false;
      }
      else if(fltOrOpt=="FiltrosListAula"){
        this.CargarTablaGrados();
        this.CargarTablaSeccion();
        this.CargarTablaNivel();
        this.CargarTablaTurno();
        this.ModeloGrado._id=   "string";
        this.ModeloSeccion._id= "string";
        this.ModeloNivel._id=   "string";
        this.ModeloTurno._id=   "string";
        this.divFiltros=false;
        this.divOpciones=false;
        this.divFiltrosListAula=true;
      }

    }

    EnviarDatos(){

      var objFltSeleccionados={
        grado: this.ModeloGrado._id,
        seccion: this.ModeloSeccion._id,
        nivel: this.ModeloNivel._id,
        periodo: this.ModeloPeriodo._id,
      }

      this.matriculaService.ObjFltSeleccionados=objFltSeleccionados;
      this.dialogRef.close();

    }

    /******************************* */


    ShowDivListaMatricula(){
      this.matriculaService.OptSelected="ShowDivListaMatricula";
      this.dialogRef.close();
    }   
    ShowDivListAulas(){
      this.matriculaService.OptSelected="ShowDivListAulas";
      this.dialogRef.close();
    }    

    /********************************** */

  ngOnInit() {
    console.log(this.message);

    this.inputColCod= this.message["colCod"];

    this.OnOffDivs();

  }

}
