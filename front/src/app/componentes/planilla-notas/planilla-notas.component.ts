import { Component, OnInit,Input } from '@angular/core';

// Importacion de modelos
import { GetAulaVirtual }  from '../../modelos/aula-virtual';
import { GetCurso }  from '../../modelos/aula-curso';
import { GetMatricula }  from '../../modelos/matricula';
import { TipoNotaCurso,GetTipoNotaCurso }  from '../../modelos/tipo-nota-curso';
import { Periodo }  from '../../modelos/periodo';
import { DetallePeriodo, GetDetallePeriodo } from 'src/app/modelos/detalle-periodo';
import { Nota, GetNotaSegunTipo, GetNotasFiltradas } from 'src/app/modelos/nota';
import { TipoNota }  from '../../modelos/tipo-nota';
import { Promedio }  from '../../modelos/promedio';
import { GetHorario,HorarioModal }  from '../../modelos/horario';

import { MatDialog } from '@angular/material';
import { ModalOptPlanillaNotasComponent } from '../modal-opt-planilla-notas/modal-opt-planilla-notas.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

// Importacion de servicios
import { AulaCursoService } from '../../servicios/aula-curso.service';
import { MatriculaService } from '../../servicios/matricula.service';
import { TipoNotaCursoService } from '../../servicios/tipo-nota-curso.service';
import { PeriodoService } from '../../servicios/periodo.service';
import { DetallePeriodoService } from '../../servicios/detalle-periodo.service';
import { NotaService } from '../../servicios/nota.service';
import { TipoNotaService } from '../../servicios/tipo-nota.service';
import { PromedioService } from '../../servicios/promedio.service';
import { parse } from 'querystring';
import { HorarioService } from '../../servicios/horario.service'; 
import { Alumno } from 'src/app/modelos/cargos';

declare var M: any;

@Component({
  selector: 'app-planilla-notas',
  templateUrl: './planilla-notas.component.html',
  styleUrls: ['./planilla-notas.component.css']
})
export class PlanillaNotasComponent implements OnInit {

  @Input() inputColCod:string;
  @Input() codMbr:string;

    blockBtnAddNota:boolean=false;

    arrayAlv: GetAulaVirtual[];
    arrayAulaVirtual: GetAulaVirtual[];
    arrayMatricula: GetMatricula[];
    matricula:  GetMatricula=new GetMatricula();

    arrayCursos: GetCurso[];
    arrayTpoNotaCurso: GetTipoNotaCurso[];
    arrayfltTpoNotaCurso: GetTipoNotaCurso[]=[];

    arrayDetallePeriodo:GetDetallePeriodo[];
    arrayFilter: GetDetallePeriodo[]=[];
    ModeloDtPrd: DetallePeriodo=new DetallePeriodo();

    arrayPromedioClo: Promedio[];
    arrayDetallePromNta: GetNotaSegunTipo[];

    arrayNotasFiltradas:  GetNotasFiltradas[];

    arrayHorario      : GetHorario[];

    selecTipoNota: TipoNota[];
    mtdAgreNota: string;

    /* Modelos */
    ModeloTipoNotaCurso: TipoNotaCurso=new TipoNotaCurso();
    fltTipoNotaCurso: TipoNotaCurso=new TipoNotaCurso();

    ModeloNota: Nota= new Nota();
    ModeloTipoNota: TipoNota= new TipoNota();
    

    /** Interaccion de  divs*/
    divlistaAulas :boolean=true;
    divListaAlum  :boolean=false;
    divVacio      :boolean=false;
    divAgregarNota:boolean=false;
    divConfig     :boolean=false;
    divPlanillaNot:boolean=false;
    divAgrNotMas  :boolean=false;   
    divPromedio   :boolean=false;
    divPromSgnNta   :boolean=false;
    divHstSgnTpoNta :boolean=false;
    divSinRegistros :boolean=false;
    divAgenda       :boolean=false;

    /** Barra lateral de opciones */
    opcAlumnos    :boolean=false;

    /** array´s para filtros */
    

    /** Variables del aula */
    graCod: string;
    secCod: string;
    NivCod: string;
    TurCod: string;
    alvCod: string;
    curCod: string;
    areCod: string;

    /** Titulo de aula */

    TtlFrmCnfCur: string="Configurar Nota";
    gradoSeccion: string;
    cursoSeleccionado:string;

    /** Nombre de botones */
    nomBtnConfNot: string="Crear";


    /** */
    prdCod: string;
    lblCiclo: string="Ciclo no encontrado";
    lblAlumno: string;

    /** Variables para nota */
    aluCod    :  string;
    perRepCod :  string;
    tipNotCod :  string;
    pctNot    :  number;
    notaVar    :  string;
    nroClo    :  string;
    _idCurso  :  string;

    outPutCurCod: string;

    sabadoDisable  :boolean=true;
    

  constructor(
    private aulaCursoService:AulaCursoService,
    private matriculaService:MatriculaService,
    private tipoNotaCursoService:TipoNotaCursoService,
    private periodoService:PeriodoService,
    private detallePeriodoService:DetallePeriodoService,
    private notaService:NotaService,
    private tipoNotaService:TipoNotaService,
    private promedioService:PromedioService,
    private horarioService:HorarioService,
    public  dialog            : MatDialog,
    ) { }

    HideDivs(){
      this.divListaAlum=false;
      this.divlistaAulas=false;
      this.divVacio=false;
      this.divAgregarNota=false;
      this.divConfig=false;
      this.divAgrNotMas=false;
      this.divPromedio=false;
      this.divPromSgnNta=false;
      this.divHstSgnTpoNta=false;
      this.divSinRegistros=false;
      this.divAgenda=false;
    }

    HideOpciones(){
      this.opcAlumnos=false;
    }

    CallModalOpt(){


      const mensaje={
        arrayCursos:[]
      };

      mensaje.arrayCursos=this.arrayCursos;

  
      const dialogRef =this.dialog.open(ModalOptPlanillaNotasComponent,{
        width: '250px',
        data: mensaje,
        
        
      });
      dialogRef.afterClosed().subscribe(res=>{
  

        const opc=this.notaService.opcionElegida;
        console.log(opc);

        if(opc["opc"]==1){
          this.HideDivs();
          this.divlistaAulas=true;
        }
        else if(opc["opc"]==2){
          console.log("eligio un curso");
          const objCurso=opc["curso"];
          this.ShowPlanilla(objCurso);
        }

        ///// aqui me quede
    
  
      }); 
    }

    cambiarCicloEvent(e){
      this.openDialog("1");
    }
    
   

    pre_eliminarNota(nota: GetNotasFiltradas){

      const opc="2";
      const dialogRef =this.dialog.open(ConfirmDialogComponent,{
        width: '250px',
        data: opc,
        
      });
      dialogRef.afterClosed().subscribe(res=>{
          if(res===true){   
            this.EliminarNota(nota)
          }
          else{
          }
      });   
  }


    openDialog(opc: string){
    
        const dialogRef =this.dialog.open(ConfirmDialogComponent,{
          width: '250px',
          data: opc,
          
        });
        dialogRef.afterClosed().subscribe(res=>{


            if(res===true){       
     
           
            }
            else{
            
            }
     
          
        });   
    }

    ShowDivAgenda(){
      this.HideDivs();
      this.divAgenda=true;
    }

    ShowOpciones(aulaVirtual: GetAulaVirtual){
      this.HideDivs();
      this.arrayMatricula=[];
      this.divVacio=true;
      this.opcAlumnos=true;

      this.alvCod= aulaVirtual._id
      this.graCod=aulaVirtual.graCod._id;
      this.secCod=aulaVirtual.secCod._id;
      this.NivCod=aulaVirtual.nivCod._id;
      this.TurCod=aulaVirtual.turCod._id;
      this.gradoSeccion=aulaVirtual.graCod.graDes +" - " + aulaVirtual.secCod.secDes ;
      this.GetHorario();
      this.CargarCursosSegunAula(this.alvCod,this.codMbr);
      this.ObtenerCiclo();
      this.CargarAlumnos();
    }

    ShowDivHstSgnTpoNta(detalle: GetNotaSegunTipo){
      this.HideDivs();
      this.divHstSgnTpoNta=true;
      console.log(detalle.aluCod);
      console.log(detalle);

      return this.notaService.getHstSgnTpoNta(detalle.perRepCod._id,detalle.tpoNotCurCod,this.nroClo)
      .subscribe(res=>{

        this.arrayNotasFiltradas=res as GetNotasFiltradas[];
        console.log(res);
      });

    }

    ShowDivListaAulas(){
      this.HideDivs();
      this.HideOpciones();
      this.divlistaAulas=true;
    }

    ShowPlanilla(curso: GetCurso){
      console.log(curso);
      this.HideDivs();
      this.cursoSeleccionado=curso.curCod.ncoCurNom;
      this.divListaAlum=true;
      this.curCod=curso.curCod._id;
      this.areCod=curso.areCod;
      this._idCurso=curso.curCod._id;
      console.log(this.cursoSeleccionado);
    }

    ListaAlumnos(){
      this.HideDivs();
      this.divListaAlum=true;
      this.limpiarNota();
    }

    ShowPromedio(){
      this.HideDivs();
      this.CargarPromedioCiclo();
      this.divPromedio=true;
    }

    ShowDivPromSgnNta(promedio:Promedio){
      this.lblAlumno='  -  '+promedio.perRepCod.perRepNom + ', ' + promedio.perRepCod.perRepApe+'  -  ';
      this.CargarDetallePromNta(promedio.perRepCod._id,promedio.alvCod,promedio.curCod,this.nroClo);
      this.HideDivs();
      this.divPromSgnNta=true;
    }


    ShowDivAgregarNota(alu:GetMatricula){
      this.HideDivs();
      this.limpiarNota();
      this.aluCod=alu.aluCod._id;
      this.perRepCod=alu.perRepCod._id;
      this.lblAlumno=alu.perRepCod.perRepNom + ' ' + alu.perRepCod.perRepApe;
      
      this.CargarFiltroTpoNta();
      this.divAgregarNota=true;
      this.fltTipoNotaCurso._id="...";
      this.mtdAgreNota="0"
      this.ObtenerCiclo();
    }

    ShowDivConfCur(){
      this.HideDivs();
      this.mtdAgreNota="0";
      this.divConfig=true;
      this.ModeloTipoNotaCurso= new TipoNotaCurso();
      this.nomBtnConfNot="Crear";
      this.ModeloTipoNota._id="string";
      console.log(this.cursoSeleccionado);
      this.CargarTblTpoNtas();
    }

    ShowDivAgrNotMas(){
      this.HideDivs();
      this.limpiarNota();
      this.CargarFiltroTpoNta();
      this.fltTipoNotaCurso._id="..."
      this.mtdAgreNota="1"
      this.arrayMatricula=[];
      this.CargarAlumnos();
      this.divAgrNotMas=true;
    }

    Cancelar(){
      this.HideDivs();
      this.divListaAlum=true;
      this.nomBtnConfNot="Crear";
    }

    Limpiar(){
      this.ModeloTipoNota._id="string";
      this.ModeloTipoNotaCurso.tpoNtaCod="";
    }

    limpiarNota(){
      this.ModeloTipoNota._id="string";
      this.ModeloTipoNotaCurso.tpoNtaCod="string";
      this.ModeloNota= new Nota();
      this.notaVar=null;
    }

    ValidarFrmTpoNta():boolean{

      console.log(this.ModeloTipoNotaCurso);
      var error=false;

      if(this.ModeloTipoNotaCurso.aulVirCod==null||this.ModeloTipoNotaCurso.aulVirCod==undefined){
        M.toast({ html: 'Error al capturar el aula' });
        error=true;
      }
      else if(this.ModeloTipoNotaCurso.tpoNtaCod==null||this.ModeloTipoNotaCurso.tpoNtaCod=="string"||this.ModeloTipoNotaCurso.tpoNtaCod==undefined){
        M.toast({ html: 'Ingrese el nombre de tipo de nota ' });
        error=true;
      }
      
      return error;
    }


    ValidarFrmNota():boolean{
      var trueOrFalse=false;
      this.blockBtnAddNota=false;
      if(this.ModeloNota.tpoNotCurCod==null||this.ModeloNota.tpoNotCurCod==undefined||this.ModeloNota.tpoNotCurCod=="string"){
        trueOrFalse=true;
        M.toast({ html: 'Error al capturar el tipo de nota' });
      }
      else if(this.notaVar==null||this.notaVar==undefined||this.notaVar==""){
        trueOrFalse=true;
        M.toast({ html: 'Debe ingresar una calificacion' });
      }
      else if(this.ModeloNota.aluCod==null||this.ModeloNota.aluCod==undefined){
        trueOrFalse=true;
        M.toast({ html: 'Error al capturar el alumno' });
      }
      else if(this.ModeloNota.perRepCod==null||this.ModeloNota.perRepCod==undefined){
        trueOrFalse=true;
        M.toast({ html: 'Error al capturar el alumno' });
      }
      else if(this.ModeloNota.alvCod==null||this.ModeloNota.alvCod==undefined){
        trueOrFalse=true;
        M.toast({ html: 'Error al capturar el codigo del aula' });
      }
      else if(this.ModeloNota.colCod==null||this.ModeloNota.colCod==undefined){
        trueOrFalse=true;
        M.toast({ html: 'Error al capturar el codigo del colegio' });
      }
      else if(this.ModeloNota.curCod==null||this.ModeloNota.curCod==undefined){
        trueOrFalse=true;
        M.toast({ html: 'Error al capturar el curso actual' });
      }
      else if(this.ModeloNota.nroClo==null||this.ModeloNota.nroClo==undefined){
        trueOrFalse=true;
        M.toast({ html: 'Error al capturar el numero de ciclo' });
      }
      else if(this.ModeloNota.prdCod==null||this.ModeloNota.prdCod==undefined){
        trueOrFalse=true;
        M.toast({ html: 'Error al capturar el periodo actual' });
      }
      

      return trueOrFalse;
    }

    CrearTipoNota(){
      this.ModeloTipoNotaCurso.curCod=this.curCod;
      this.ModeloTipoNotaCurso.colCod=this.inputColCod;
      this.ModeloTipoNotaCurso.aulVirCod=this.alvCod;
      this.ModeloTipoNotaCurso.tpoNtaCod=this.ModeloTipoNota._id;
      
      console.log(this.ModeloTipoNotaCurso);

      if(this.ValidarFrmTpoNta()==true){

      }
      else{

      if(this.nomBtnConfNot=="Crear"){
        return this.tipoNotaCursoService.postTipoNota(this.ModeloTipoNotaCurso)
      .subscribe(res=>{
        var status=res["status"];

          if(status===200){
            M.toast({ html: 'Registrado Correctamente !' });
            console.log(res);
            this.Limpiar();
            this.CargarTblTpoNtas();
            this.nomBtnConfNot="Crear";
          }else if(status===510){
            M.toast({ html: 'Ya existe este tipo de nota, no se puede registrar ' });
          }
          else if(status===516){
            M.toast({ html: 'El porcentaje esta completo, no se puede registrar ' });
          }  
          else if(status===515){
            M.toast({ html: 'El porcentaje estaria excediendo, no se puede registrar ' });
          }
      });
      }
      else{
        return this.tipoNotaCursoService.editTipoNota(this.ModeloTipoNotaCurso)
        .subscribe(res=>{
          var status=res["status"];
  
            if(status===200){
              M.toast({ html: 'Se edito el registro !' });
              console.log(res);
              this.Limpiar();
              this.CargarTblTpoNtas();
              this.nomBtnConfNot="Crear";
            }else if(status===510){
              M.toast({ html: 'Ya existe este tipo de nota !' });
              console.log(res);
            }else if(status===516){
              M.toast({ html: 'El porcentaje esta completo, no se puede registrar ' });
            }  
            else if(status===515){
              M.toast({ html: 'El porcentaje estaria excediendo, no se puede registrar ' });
            }  
          })
        }  
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

    CrearNotaMasiva(alu:GetMatricula){

      this.notaVar=alu.nota;
      
      this.ModeloNota.aluCod    =alu.aluCod._id;
      this.ModeloNota.areCod    =this.areCod;
      this.ModeloNota.curCod    =this.curCod;
      this.ModeloNota.nroClo    =this.ModeloDtPrd._id;
      this.ModeloNota.perRepCod =alu.perRepCod._id;
      this.ModeloNota.prdCod    =this.prdCod;
      this.ModeloNota.alvCod    =this.alvCod;
      this.ModeloNota.tpoNotCurCod =this.ModeloTipoNotaCurso.tpoNtaCod;
      this.ModeloNota.colCod    =this.inputColCod;

      
      if(this.ValidarFrmNota()==true){

      }
      else{
        this.ModeloNota.notCal=parseInt(this.notaVar);
        console.log(this.ModeloNota.notCal);

        if(isNaN(this.ModeloNota.notCal)){
          M.toast({ html: 'Nota no valida' });
        }
        else if(this.ModeloNota.notCal<0){
          M.toast({ html: 'No aceptan valores negativos' });
        }
        else if(this.ModeloNota.notCal>20){
          M.toast({ html: 'La nota no puede ser mayor a 20' });
        }
        else{
          return this.notaService.postNota(this.ModeloNota)
          .subscribe(res=>{
            console.log(res);
  
            var status=res["status"];
  
          if(status===200){
            M.toast({ html: 'Se registro la nota' });
            this.ModeloNota= new Nota();
            this.notaVar=null;
            alu.agregado=true;
  
          }
          else{
            M.toast({ html: 'Error al registrar' });
          }
          });
        }
      }
    }

    CrearNota(){
      
      this.ModeloNota.aluCod    =this.aluCod;
      this.ModeloNota.areCod    =this.areCod;
      this.ModeloNota.curCod    =this.curCod;
      this.ModeloNota.nroClo    =this.ModeloDtPrd._id;
      this.ModeloNota.perRepCod =this.perRepCod;
      this.ModeloNota.prdCod    =this.prdCod;
      this.ModeloNota.alvCod    =this.alvCod;
      this.ModeloNota.tpoNotCurCod =this.ModeloTipoNotaCurso.tpoNtaCod;
      this.ModeloNota.colCod    =this.inputColCod;

      this.blockBtnAddNota=true;
      console.log(this.ModeloNota);
      if(this.ValidarFrmNota()==true){

      }
      else{
        console.log(this.ModeloNota);
        this.ModeloNota.notCal=parseInt(this.notaVar);

        if(isNaN(this.ModeloNota.notCal)){
          M.toast({ html: 'Nota no valida' });
        }
        else if(this.ModeloNota.notCal<0){
          M.toast({ html: 'No aceptan valores negativos' });
        }
        else if(this.ModeloNota.notCal>20){
          M.toast({ html: 'La nota no puede ser mayor a 20' });
        }
        else{
          return this.notaService.postNota(this.ModeloNota)
          .subscribe(res=>{
            console.log(res);
            this.blockBtnAddNota=false;
  
            var status=res["status"];
  
            if(status===200){
              this.limpiarNota();
              M.toast({ html: 'Se registro la nota' });
              this.HideDivs();
              this.divListaAlum=true;
            }
            else{
              M.toast({ html: 'Error al registrar' });
            }
          });
        }
        
        
      }
    }

    EliminarNota( nota: GetNotasFiltradas){

      const id= nota._id
      this.notaService.deleteNota(id)
      .subscribe(res =>{
        console.log(res);

        var status=res["status"];
        if(status==200){
          this.ShowPromedio();
          M.toast({ html: 'Se elimino el tipo de nota' });


        }


      })
    }

    ObtenerPeriodo(){  // ********* Observar si debe de obtner el ultimo periodo vigente
      let fechaActual = new Date();
      var anioActual=fechaActual.getFullYear().toString();
    
      return this.periodoService.getPeriodoActual(anioActual,this.inputColCod)
      .subscribe(res=>{
        console.log(res);
        this.prdCod=res[0]._id;
        this.ObtenerCiclo();
        console.log("Este es el periodooooo"+this.prdCod);
      });


    }

    ObtenerCiclo(){
      
      return this.detallePeriodoService.getCiclo(this.prdCod)
      .subscribe(res=>{
        console.log(res);
        console.log("Este es el numero de ciclooo");
        this.lblCiclo=res["detPrdSgt"];
        this.nroClo=res["_id"];
        console.log("Numero de ciclo"+ this.nroClo);
        this.ObtenerCiclos();
      });
    }

    ObtenerCiclos(){
      console.log("llamadaa")
      return this.detallePeriodoService.getDetallePeriodo(this.prdCod)
      .subscribe(res=>{

        let fechaActual = new Date();
        this.arrayDetallePeriodo=res as GetDetallePeriodo[];

        ////////////////////////////////////////////////////////////////////**//*** */ */

        var count=0;
        for(let i=0; i<this.arrayDetallePeriodo.length; i++){
          let fechaMongo=Date.parse(this.arrayDetallePeriodo[i].detPrdIni); 
          let fechaDetPrd=new Date(fechaMongo);

          if(fechaDetPrd<=fechaActual){
            this.arrayFilter.push(this.arrayDetallePeriodo[i])
          }

        }

        var hash = {};
        this.arrayFilter = this.arrayFilter.filter(function(current) {
          var exists = !hash[current._id];
          hash[current._id] = true;
          return exists;
        });

        console.log(this.arrayFilter);


        this.ModeloDtPrd._id=this.nroClo;
        console.log(count);
        console.log(this.arrayFilter);

      })
    }


    PreEditarTpoNta(tpoNta: GetTipoNotaCurso){
      this.ModeloTipoNotaCurso._id=tpoNta._id;
      this.ModeloTipoNota._id=tpoNta.tpoNtaCod._id;

      this.nomBtnConfNot="Editar";
    }

    eliminarTpoNta(tpoNta: GetTipoNotaCurso){

      const id=tpoNta._id;
      this.tipoNotaCursoService.deleteTipoNota(id)
      .subscribe(res=>{

        var status=res["status"];

        if(status===200){
          M.toast({ html: 'Se elimino el tipo de nota' });
          this.CargarTblTpoNtas();
        }
        else if((status===400)){
          M.toast({ html: 'Existen notas asociadas, no se puede eliminar' });
        }

      })

    }

    CargarPromedioCiclo(){
      console.log("5555555474444");
      this.arrayPromedioClo=[];
      return this.promedioService.GetPromedioCiclo(this.alvCod,this.nroClo,this.curCod)
      .subscribe(res=>{
        this.arrayPromedioClo=res as Promedio[];
        console.log(this.arrayPromedioClo);
        if(this.arrayPromedioClo.length===0){
          this.divSinRegistros=true;
        }
        console.log(this.arrayPromedioClo);
      })
    }

    CargarDetallePromNta(aluCod:string, alvCod:string, curCod:string, nroClo: string){
      console.log("aaaaaaaaaa");
      this.divSinRegistros=false;
      this.arrayDetallePromNta=[]
      return this.notaService.getDetNotasSegunTipo(aluCod,curCod, nroClo)
      .subscribe(res=>{
        this.arrayDetallePromNta=res as GetNotaSegunTipo[];
        console.log("El tamaño es  : " + this.arrayDetallePromNta.length);
        if(this.arrayDetallePromNta.length==0){
          this.divSinRegistros=true;
        }
      });
    }

    CargarTblTpoNtas(){
      return this.tipoNotaCursoService.getTipoNota(this.alvCod,this.curCod,this.inputColCod)
      .subscribe(res=>{
        this.arrayTpoNotaCurso=res as GetTipoNotaCurso[];
        console.log(this.arrayTpoNotaCurso);
      });
    }

    CargarSelectTpoNota(){
      return this.tipoNotaService.getTipoNota()
      .subscribe(res=>{
        console.log(res);
        this.selecTipoNota=res as TipoNota[];
        this.selecTipoNota.unshift({
          estCod: "",
          _id: "string",
          tpoNtaNom: "-- Seleccione --",
          timestamp: "2020-02-07T01:23:16.947Z",
          __v: 0
        });
      })
    }

    CargarCursosSegunAula(alvCod: string, prfCod: string){
      return this.aulaCursoService.getCursosAulaDocente(alvCod,prfCod,this.inputColCod)
      .subscribe(res=>{
        this.arrayCursos= res as GetCurso[];

        console.log(this.arrayCursos);
      });
    }

    CargarAulasDocente(){

      console.log(this.codMbr);
      console.log(this.inputColCod);

      return this.aulaCursoService.getAulasDocente(this.inputColCod,this.codMbr)
      .subscribe(res=>{
        
        this.arrayAlv=res as GetAulaVirtual[];

        var aulaVirtual = {};
        this.arrayAulaVirtual = this.arrayAlv.filter(function (e) { 
            return aulaVirtual[e._id] ? false : (aulaVirtual[e._id] = true);
        });
        console.log(this.arrayAlv);
      });
    }
  
    CargarAlumnos(){
      return this.matriculaService.getAlumnosPorAula(this.inputColCod,this.graCod,this.NivCod,this.secCod,this.TurCod)
      .subscribe(res=>{
        this.arrayMatricula=res as GetMatricula[];

        console.log(this.arrayMatricula);
      });
    }

    CargarFiltroTpoNta(){
      return this.tipoNotaCursoService.getTipoNota(this.alvCod,this.curCod,this.inputColCod)
      .subscribe(res=>{
        this.arrayfltTpoNotaCurso=res as GetTipoNotaCurso[];

        this.arrayfltTpoNotaCurso.unshift({
          estCod: "string",
          _id: "string",
          tpoNtaCod: {
              estCod: "string",
              _id: "string",
              tpoNtaNom: "Tipo de nota",
              timestamp: "string",
              __v: 0,
          },
          aulVirCod: "string",
          curCod: "string",
          colCod: "string",
          prdCod: "string",
          timestamp: "string",
          __v: 0,
        });

        console.log(this.arrayfltTpoNotaCurso); 
      });
    }

    GetTipoNota(val: any){ 
      console.log(val); 
      console.log("val"); 
      
      if(this.mtdAgreNota=="1"){
      this.ShowDivAgrNotMas();
      }

      for(let i=0;i<this.arrayfltTpoNotaCurso.length;i++){
        if(val==this.arrayfltTpoNotaCurso[i]._id){
          this.ModeloTipoNotaCurso.tpoNtaCod=val;
          this.notaVar=null;
        }
      }
     
    }

    GetHorario(){
      return this.horarioService.getHorario(this.inputColCod,this.alvCod)
      .subscribe(res=>{
        this.arrayHorario=res as GetHorario[];
        for(let i=0;i<this.arrayHorario.length;i++){
          console.log(this.arrayHorario[i].sabado.ncoCurNom);
          if(this.arrayHorario[i].sabado.ncoCurNom!="Sin definir"){
            this.sabadoDisable=false;
          
          }
        }
        console.log(res); 
      })
    }


  ngOnInit() {

    this.ObtenerPeriodo();
    this.CargarAulasDocente();
    this.CargarSelectTpoNota();
    this.ModeloTipoNota._id="string";
    this.ModeloTipoNotaCurso.tpoNtaCod="string";

  }

}
