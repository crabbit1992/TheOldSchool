import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

/** Modelos */
import { Grado, ListaGrados,GetGrado,GetGradoFiltro }  from '../../modelos/grado'; 
import { Seccion, ListaSeccion,GetSeccion, GetSeccionFiltro }  from '../../modelos/seccion'; 
import { Nivel, ListaNivel,GetNivel, GetNivelFiltro }  from '../../modelos/nivel'; 
import { Turno, ListaTurno,GetTurno }  from '../../modelos/turno';

/**Servicios */
import { AulaVirtualService } from '../../servicios/aula-virtual.service';
import { GradoService } from '../../servicios/grado.service'; 
import { SeccionService } from '../../servicios/seccion.service'; 
import { NivelService } from '../../servicios/nivel.service';
import { TurnoService } from '../../servicios/turno.service'; 

@Component({
  selector: 'app-modal-opt-aula-virtual',
  templateUrl: './modal-opt-aula-virtual.component.html',
  styleUrls: ['./modal-opt-aula-virtual.component.css']
})
export class ModalOptAulaVirtualComponent implements OnInit {

  option:boolean=true;

  divFiltros:boolean=false;
  divOpciones:boolean=false;


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

  /** */


  constructor(    
    private aulaVirtualService         : AulaVirtualService,
    public dialogRef: MatDialogRef<ModalOptAulaVirtualComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private gradoService:GradoService,
    private seccionService:SeccionService,
    private nivelService:NivelService,
    private turnoService:TurnoService,
    ) { }

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
        this.ModeloGrado._id=   "string";
        this.ModeloSeccion._id= "string";
        this.ModeloNivel._id=   "string";
        this.ModeloTurno._id=   "string";
        this.divFiltros=true;
        this.divOpciones=false;
      }

    }

    EnviarDatos(){

      var objFltSeleccionados={
        grado: this.ModeloGrado._id,
        seccion: this.ModeloSeccion._id,
        nivel: this.ModeloNivel._id,
        turno: this.ModeloTurno._id,
      }

      this.aulaVirtualService.ObjFltSeleccionados=objFltSeleccionados;
      this.dialogRef.close();

    }

    /******************************* */


    /** Opciones de aula virtual */
    OnOffOptions(){
      var getOption=this.message["opcion"];
  
      if(getOption==1){
        this.option=true;

      }
      else if(getOption==0){
        this.option=false;

      }
    }

    ShowDivListaAulas(){
      this.aulaVirtualService.OptSelected="ShowDivListaAulas";
      this.dialogRef.close();
    }   
    ShowDivListaAlumnos(){
      this.aulaVirtualService.OptSelected="ShowDivListaAlumnos";
      this.dialogRef.close();
    }    
    ShowDivListaCursos(){
      this.aulaVirtualService.OptSelected="ShowDivListaCursos";
      this.dialogRef.close();
    }  
    ShowDivListaDocentes(){
      this.aulaVirtualService.OptSelected="ShowDivListaDocentes";
      this.dialogRef.close();
    }
    ShowDivHorario(){
      this.aulaVirtualService.OptSelected="ShowDivHorario";
      this.dialogRef.close();
    }
    /********************************** */



  ngOnInit() {
    console.log(this.message);
    this.OnOffDivs();
    this.OnOffOptions();
  }

}
