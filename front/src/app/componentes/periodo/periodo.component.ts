import { Component, OnInit,Input } from '@angular/core';
import { MatDialog, yearsPerPage } from '@angular/material';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ModalOptPeriodoComponent } from '../modal-opt-periodo/modal-opt-periodo.component';

//Importacion de modelos
import { Periodo,Dia, Mes, Anio,GetPeriodo } from '../../modelos/periodo';
import { TipoPeriodo } from 'src/app/modelos/tipo-periodo';
import { DetallePeriodo, arraySegmento,GetDetallePeriodo } from 'src/app/modelos/detalle-periodo';


//Importacion de servicios
import { PeriodoService } from '../../servicios/periodo.service';
import { TipoPeriodoService } from '../../servicios/tipo-periodo.service';
import { DetallePeriodoService } from '../../servicios/detalle-periodo.service';




declare var M: any;

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {

  @Input() inputColCod:string;

  modeloPeriodo: Periodo=new Periodo();
  ModeloTipoPrd: TipoPeriodo=new TipoPeriodo();
  modeloDetPrd: DetallePeriodo=new DetallePeriodo();

  getPeriodoArray: GetPeriodo	[]; 
  periodoArray: Periodo[];

  arrayTipoPrd: TipoPeriodo[];
  arrayDetallePrd: GetDetallePeriodo[];

  arraySegmento: arraySegmento[];
  ModeloSegmento: arraySegmento=new arraySegmento();

  arrayDia: Dia[];
  arrayMes: Mes[];
  arrayAnio: Anio[];

  diaSeleccionado: string;
  mesSeleccionado: string;
  anioSeleccionado: string;
  finDiaSeleccionado: string;
  finMesSeleccionado: string;
  finAnioSeleccionado: string;

  diaFch: string;
  mesFch: string;
  AnioFch: string;
  finDiaFch: string;
  finMesFch: string;
  finAnioFch: string;

  año: string;
  mes: string;
  dia: string;

  anioActual : string;
  NomBotonPeriodo: string="Crear";

  prdCodActual: string="";
  tpoPrdCodActual: string="";
  lblBimTrim:string="";

 /************ Interaccion de div´s Registrar periodo y listar Periodos *************************** */

  divListar:boolean=true;
  divCrear:boolean=false;

  divDetalle: boolean=false;
  divDetallePrd: boolean=false;
  divConfDet:boolean=false;

  optionsDetalle:boolean=false;
  optionsPeriodo:boolean=true;

  _idDetPrd:string;
  dsbSelectSeg: boolean=false; // desabilitar select numero de segmento de periodo
  NomBtnDetPrd: string="Crear"

   /************   *************************** */
  varOptSetModal:number=0;
  habilitado: boolean=true;



  constructor(
     private periodoService         : PeriodoService,
     private tipoPeriodoService     : TipoPeriodoService,
     private detallePeriodoService  : DetallePeriodoService,
     public dialog                  : MatDialog ) { }


  openDialog(){
      
        const dialogRef =this.dialog.open(ConfirmDialogComponent,{
          width: '250px',
          data:' Si cambia el tipo de periodo actual se borraran los detalles asociados a este periodo, ¿Desea continuar? '
        });
        dialogRef.afterClosed().subscribe(res=>{

          if(res===true){       
            console.log("Se cambio el tipo de periodo");
            return this.periodoService.putPeriodo(this.modeloPeriodo)
            .subscribe(res=>{
              console.log(res);
              this.CargarTablaPeriodos();
              this.divListar=true;
              this.divCrear=false;

          var ff="ffds";
          var status=res["status"];
          if(status==200){
            M.toast({ html: 'Se actualizo el periodo' });
          }
          else if(status==500){
            M.toast({ html: 'Error al editar' });
          }else if(status==400){
            M.toast({ html: 'Imposible editar el tipo de periodo' });
          }
        });
          }
          else{
            console.log("Operacion Cancelada");
          }
        });   
      
      
  }

  openDialogElimDet(getDetallePeriodo:GetDetallePeriodo){
      
    const dialogRef =this.dialog.open(ConfirmDialogComponent,{
      width: '250px',
      data:' Eliminar este detalle, ¿Desea continuar? '
    });
    dialogRef.afterClosed().subscribe(res=>{

      if(res===true){       
        const _id=getDetallePeriodo._id;
        return this.detallePeriodoService.deleteDetallePeriodo(_id)
        .subscribe(res=>{
    
          var status=res["status"];
              console.log(status);
              if(status==200){
                M.toast({ html: 'Se elimino correctamente' });
                this.CargarTablaDetallePeriodo(this.prdCodActual);
              }
              else if(status==500){
                M.toast({ html: 'No se puede eliminar ya que existen notas asociadas a este detalle'+this.lblBimTrim });
              }
        })
      }
      else{
        console.log("Operacion Cancelada");
      }
    });    
  }

  openDialogModalPeriodo(){

    var objMensaje={

      opcion:this.varOptSetModal,

    }
      
    const dialogRef =this.dialog.open(ModalOptPeriodoComponent,{
      width: '250px',
      data: objMensaje,
    });
    dialogRef.afterClosed().subscribe(res=>{

      var getOptModal=this.periodoService.optSelectedModal;
      console.log(getOptModal);

      if(getOptModal=="ShowDivListar"){
        this.ShowDivListar()
      }
      else if(getOptModal=="ShowDivCrear"){
        this.ShowDivCrear();
      }
      else if(getOptModal=="ShowDivConfDet"){
        this.ShowDivConfDet();
      }
      else if(getOptModal=="ShowDivListarDet"){
        this.ShowDivListarDet();
      }


     
    });    
}

  

  ShowDivDetalle(prdCod: GetPeriodo){
    this.Limpiar();
    this.optionsDetalle=true;
    this.divDetallePrd=true;
    this.divListar=false;
    this.divCrear=false;
    this.prdCodActual=prdCod._id;
    this.tpoPrdCodActual=prdCod.tpoPrdCod.tpoPrdNom;
    this.ModeloTipoPrd._id=prdCod.tpoPrdCod._id;
    this.AnioFch=prdCod.prdAnio;
    this.CargarTablaDetallePeriodo(this.prdCodActual);
    this.varOptSetModal=1;
  }

  ShowDivConfDet(){
    
    this.optionsDetalle=true;
    this.divDetallePrd=false;
    this.divListar=false;
    this.divCrear=false;
    this.divConfDet=true;
    console.log(this.tpoPrdCodActual);
    
    if(this.tpoPrdCodActual=="Bimestral"){
      this.lblBimTrim="Bimestre";
      this.arraySegmento=[
        {_id:"0",nom:"Seleccione Bimestre"},
        {_id:"1",nom:"Primer Bimestre"},
        {_id:"2",nom:"Segundo Bimestre"},
        {_id:"3",nom:"Tercer Bimestre"},
        {_id:"4",nom:"Cuarto Bimestre"},
      ];
      this.ModeloSegmento.nom="Seleccione Bimestre";
    }
    else if(this.tpoPrdCodActual=="Trimestral"){
      this.lblBimTrim="Trimestre";
      this.arraySegmento=[
        {_id:"0",nom:"Seleccione Trimestre"},
        {_id:"1",nom:"Primer Trimestre"},
        {_id:"2",nom:"Segundo Trimestre"},
        {_id:"3",nom:"Tercer Trimestre"},
      ];
      this.ModeloSegmento.nom="Seleccione Trimestre";
    }

    this.LimpiarCalendario();

    this.anioSeleccionado=this.anioActual;
    this.NomBtnDetPrd="Crear";
    this.dsbSelectSeg=false;
    console.log(this.arraySegmento);

  }

  ShowDivListarDet(){
    this.optionsDetalle=true;
    this.divDetallePrd=true;
    this.divListar=false;
    this.divCrear=false;
    this.divConfDet=false;
  }

  ShowDivListar(){
    this.divListar=true;
    this.divCrear=false;
    this.optionsDetalle=false;
    this.divDetallePrd=false;
    this.divConfDet=false;
    this.divDetalle=true;
    this.Limpiar();
    this.varOptSetModal=2;
  }

  ShowDivCrear(){
    this.divListar=false;
    this.divCrear=true;
    this.optionsDetalle=false;
    this.divDetallePrd=false;
    this.divDetalle=true;
    this.divConfDet=false;
    
    this.Limpiar();
    this.AnioFch=this.anioActual;
    this.varOptSetModal=2;
  }

  ValidarFrm():boolean{
    var trueOrFalse=false

    if(this.modeloPeriodo.tpoPrdCod==undefined||this.modeloPeriodo.tpoPrdCod=="string"){
      M.toast({ html: 'Elija el tipo de periodo' });
      trueOrFalse=true;
    }
    else if(this.diaFch==undefined||this.diaFch=="Dia"){
      M.toast({ html: 'Elija el dia de inicio' });
      trueOrFalse=true;
    }
    else if(this.mesFch==undefined||this.mesFch=="Mes"){
      M.toast({ html: 'Elija el mes de inicio' });
      trueOrFalse=true;
    }
    else if(this.AnioFch==undefined||this.AnioFch=="Año"){
      M.toast({ html: 'Elija el año de inicio' });
      trueOrFalse=true;
    }
    else if(this.finDiaFch==undefined||this.finDiaFch=="Dia"){
      M.toast({ html: 'Elija el dia  final' });
      trueOrFalse=true;
    }
    else if(this.finMesFch==undefined||this.finMesFch=="Mes"){
      M.toast({ html: 'Elija el mes final' });
      trueOrFalse=true;
    }
    else if(this.finAnioFch==undefined||this.finAnioFch=="Año"){
      M.toast({ html: 'Elija el año final' });
      trueOrFalse=true;
    }
    return trueOrFalse;
  }

  ValidarFrmDetPrd():boolean{
    var trueOrFalse=false
    console.log(this.ModeloSegmento.nom);

    if(this.ModeloSegmento.nom==undefined||this.ModeloSegmento.nom=="Seleccione Bimestre"||this.ModeloSegmento.nom=="Seleccione Trimestre"){
      M.toast({ html: 'Elija el '+this.lblBimTrim });
      trueOrFalse=true;
      console.log("Entrooooo");
    }
    else if(this.diaFch==undefined||this.diaFch=="Dia"){
      M.toast({ html: 'Elija el dia de inicio' });
      trueOrFalse=true;
    }
    else if(this.mesFch==undefined||this.mesFch=="Mes"){
      M.toast({ html: 'Elija el mes de inicio' });
      trueOrFalse=true;
    }
    else if(this.AnioFch==undefined||this.AnioFch=="Año"){
      M.toast({ html: 'Elija el año de inicio' });
      trueOrFalse=true;
    }
    else if(this.finDiaFch==undefined||this.finDiaFch=="Dia"){
      M.toast({ html: 'Elija el dia  final' });
      trueOrFalse=true;
    }
    else if(this.finMesFch==undefined||this.finMesFch=="Mes"){
      M.toast({ html: 'Elija el mes final' });
      trueOrFalse=true;
    }
    else if(this.finAnioFch==undefined||this.finAnioFch=="Año"){
      M.toast({ html: 'Elija el año final' });
      trueOrFalse=true;
    }
    return trueOrFalse;
  }

  CrearPeriodo(){

    let mi=parseInt(this.mesFch);
    let mf=parseInt(this.finMesFch);
    console.log(mi);


    if(mi<10){
    this.mesFch="0"+mi;
    }
    if(mf<10){
    this.finMesFch="0"+mf;
    }


    this.modeloPeriodo.tpoPrdCod=this.ModeloTipoPrd._id;
    this.modeloPeriodo.prdFchIni=this.AnioFch+ "-" +this.mesFch+ "-" +this.diaFch;
    this.modeloPeriodo.prdFchFin=this.finAnioFch+ "-" +this.finMesFch+ "-" +this.finDiaFch;
    this.modeloPeriodo.colCod=this.inputColCod;
    this.modeloPeriodo.prdAnio=this.anioActual;

    if(this.ValidarFrm()==true){

    }
    else{
      if(this.NomBotonPeriodo=="Editar"){

        if(this.tpoPrdCodActual!=this.ModeloTipoPrd._id){
          this.openDialog();
        }
        else{
          return this.periodoService.putPeriodo(this.modeloPeriodo)
            .subscribe(res=>{
              console.log(res);
              this.CargarTablaPeriodos();
              this.divListar=true;
              this.divCrear=false;


          var status=res["status"];
          console.log(status);
          if(status==200){
            M.toast({ html: 'Se actualizo el periodo' });
          }
          else if(status==508){
            M.toast({ html: 'Fecha de inicio no valida' });
          }
          else if(status==521){
            M.toast({ html: 'La fecha de inicio no puede ser mayor a la de fin' });
          }
          else if(status==513){
            M.toast({ html: 'La fecha de fin esta dentro de otro periodo' });
          }
          else if(status==512){
            M.toast({ html: 'La fecha de inicio esta dentro de otro periodo' });
          }
          else if(status==510){
            M.toast({ html: 'Ya existe un periodo en este año' });
          }
          else if(status==514){
            M.toast({ html: 'Fecha de inicio no puede ser mayor que la fecha de inicio del primer detalle de periodo' });
          }
          else if(status==515){
            M.toast({ html: 'Fecha de fin no puede ser menor que la fecha de inicio del ultimo detalle de periodo' });
          }
          else if(status==400){
            M.toast({ html: 'Actualmente ya se colocaron calificacion, es imposible editar el tipo de periodo' });
          }
          else if(status==201){
            M.toast({ html: 'Se actualizo el periodo y se eliminaron los detalles asociados al periodo' });
          }

        });
        }

      }else{
  
        return this.periodoService.postPeriodo(this.modeloPeriodo)
        .subscribe(res => {  
          console.log(res);
          var status=res["status"];
          if(status==200){
            M.toast({ html: 'Se registro el periodo' });
            this.CargarTablaPeriodos();
            this.divListar=true;
          }
          else if(status==508){
            M.toast({ html: 'Fecha de inicio no valida' });
          }
          else if(status==509){
            M.toast({ html: 'Fecha de fin no valida' });
          }
          else if(status==521){
            M.toast({ html: 'La fecha de inicio no puede ser mayor a la de fin' });
          }
          else if(status==513){
            M.toast({ html: 'La fecha de fin esta dentro de otro periodo' });
          }
          else if(status==512){
            M.toast({ html: 'La fecha de inicio esta dentro de otro periodo' });
          }
          else if(status==510){
            M.toast({ html: 'Ya existe un periodo en este año' });
          }
        });
      } 
    } 
  }

  FormatearFecha(fecha : string){

    console.log(fecha);
    let fechaformat= new Date(fecha);
    console.log(fechaformat);
    var mesFch= fechaformat.getUTCMonth()+1;
    var diaFch= fechaformat.getUTCDate();
    var anioFch= fechaformat.getUTCFullYear();

    console.log(diaFch);
    var mes= mesFch.toString();
    var dia=diaFch.toString();
    if(mesFch<10){
      
      mes= "0"+mes;
    }
    if(diaFch<10){
      
      dia= "0"+dia;
    }

    if (mes == "01") { mes = "Ene"; }
    if (mes == "02") { mes = "Feb"; }
    if (mes == "03") { mes = "Mar"; }
    if (mes == "04") { mes = "Abr"; }
    if (mes == "05") { mes = "May"; }
    if (mes == "06") { mes = "Jun"; }
    if (mes == "07") { mes = "Jul"; }
    if (mes == "08") { mes = "Ago"; }
    if (mes == "09") { mes = "Set"; }
    if (mes == "10") { mes = "Oct"; }
    if (mes == "11") { mes = "Nov"; }
    if (mes == "12") { mes = "Dic"; }

    fecha = dia + " - " + mes + " - " +anioFch
    return fecha;
  }

  CrearDetallePeriodo(){
    
    const validar=this.ValidarFrmDetPrd();
    
    if(validar==true){
      console.log("dsfdfdfds");
    }
    else{

      if(this.NomBtnDetPrd=="Editar"){

       let mi=parseInt(this.mesFch);
       let mf=parseInt(this.finMesFch);
       console.log(mi);


       if(mi<10){
        this.mesFch="0"+mi;
       }
       if(mf<10){
        this.finMesFch="0"+mf;
       }

        
        this.modeloDetPrd._id       =this._idDetPrd;
        this.modeloDetPrd.detPrdIni =this.AnioFch+ "-" +this.mesFch+ "-" +this.diaFch;
        this.modeloDetPrd.detPrdFin =this.finAnioFch+ "-" +this.finMesFch+ "-" +this.finDiaFch;

        console.log(this.modeloDetPrd);

        return this.detallePeriodoService.editDetallePeriodo(this.modeloDetPrd)
        .subscribe(res=>{
          var status=res["status"];
          if(status==200){
            M.toast({ html: 'Se edito el registro' });
            this.CargarTablaDetallePeriodo(this.prdCodActual);
            this.divDetallePrd=true;
            this.divConfDet=false;
          }
          else if(status==500){
            M.toast({ html: 'Error al editar' });
          }
          else if(status==520){
            M.toast({ html: 'No se puede exceder del rango del periodo ' });
          }
          else if(status==521){
            M.toast({ html: 'La fecha de inicio es superior a la de fin ' });
          }
          else if(status==522){
            M.toast({ html: 'La fecha de fin es superior a la de inicio ' });
          }
          else if(status==508){
            M.toast({ html: 'La Fecha de inicio es invalida '});
          }
          else if(status==509){
            M.toast({ html: 'La Fecha de fin es invalida '});
          }else if(status==512){
            M.toast({ html: 'La fecha de inicio ingresada esta dentro de un periodo ya existente '});
          }
          else if(status==513){
            M.toast({ html: 'La fecha de fin ingresada esta dentro de un periodo ya existente '});
          }
        })

      }
      else if(this.NomBtnDetPrd=="Crear"){
        console.log("holaaaaaaaaaaaa");
        let mi=parseInt(this.mesFch);
        let mf=parseInt(this.finMesFch);
        console.log(mi);


        if(mi<10){
          this.mesFch="0"+mi;
        }
        if(mf<10){
          this.finMesFch="0"+mf;
        }

        
        this.modeloDetPrd.prdCod    =this.prdCodActual;
        this.modeloDetPrd.tpoPrdCod =this.ModeloTipoPrd._id;
        this.modeloDetPrd.detPrdSgt =this.ModeloSegmento.nom;
        this.modeloDetPrd.detPrdIni =this.AnioFch+ "-" +this.mesFch+ "-" +this.diaFch;
        this.modeloDetPrd.detPrdFin =this.finAnioFch+ "-" +this.finMesFch+ "-" +this.finDiaFch;

        
    
        return this.detallePeriodoService.postDetallePeriodo(this.modeloDetPrd)
            .subscribe(res=>{
          
              var status=res["status"];
              if(status==200){
                M.toast({ html: 'Registro Guardado' });
                this.divDetallePrd=true;
                this.CargarTablaDetallePeriodo(this.prdCodActual);
              }
              else if(status==510){
                M.toast({ html: 'Error, ya se registro este '+this.lblBimTrim });
              }
              else if(status==500){
                M.toast({ html: 'Error al editar' });
              }
              else if(status==520){
                M.toast({ html: 'No se puede exceder del rango del periodo ' });
              }
              else if(status==521){
                M.toast({ html: 'La fecha de inicio es superior a la de fin ' });
              }
              else if(status==522){
                M.toast({ html: 'La fecha de fin es superior a la de inicio ' });
              }
              else if(status==508){
                M.toast({ html: 'La Fecha de inicio es invalida '});
              }
              else if(status==509){
                M.toast({ html: 'La Fecha de fin es invalida '});
              }else if(status==512){
                M.toast({ html: 'La fecha de inicio ingresada esta dentro de un horario ya existente '});
              }
              else if(status==513){
                M.toast({ html: 'La fecha de fin ingresada esta dentro de un horario ya existente '});
              }
            })
      } 
    }

  }

  Pre_EditarPeriodo(periodo : GetPeriodo){

    this.modeloPeriodo._id=periodo._id;
    this.ModeloTipoPrd._id=periodo.tpoPrdCod._id;

    var año = periodo.prdFchIni.substr(0, 4);
    var mes = periodo.prdFchIni.substr(-19, 2);
    var dia = periodo.prdFchIni.substr(-16, 2);

    var finAño = periodo.prdFchFin.substr(0, 4);
    var finMes = periodo.prdFchFin.substr(-19, 2);
    var finDia = periodo.prdFchFin.substr(-16, 2);


    if (mes == "01") { this.mesFch = "Ene"; }
    if (mes == "02") { this.mesFch = "Feb"; }
    if (mes == "03") { this.mesFch = "Mar"; }
    if (mes == "04") { this.mesFch = "Abr"; }
    if (mes == "05") { this.mesFch = "May"; }
    if (mes == "06") { this.mesFch = "Jun"; }
    if (mes == "07") { this.mesFch = "Jul"; }
    if (mes == "08") { this.mesFch = "Ago"; }
    if (mes == "09") { this.mesFch = "Set"; }
    if (mes == "10") { this.mesFch = "Oct"; }
    if (mes == "11") { this.mesFch = "Nov"; }
    if (mes == "12") { this.mesFch = "Dic"; }

    if (finMes == "01") { this.finMesFch = "Ene"; }
    if (finMes == "02") { this.finMesFch = "Feb"; }
    if (finMes == "03") { this.finMesFch = "Mar"; }
    if (finMes == "04") { this.finMesFch = "Abr"; }
    if (finMes == "05") { this.finMesFch = "May"; }
    if (finMes == "06") { this.finMesFch = "Jun"; }
    if (finMes == "07") { this.finMesFch = "Jul"; }
    if (finMes == "08") { this.finMesFch = "Ago"; }
    if (finMes == "09") { this.finMesFch = "Set"; }
    if (finMes == "10") { this.finMesFch = "Oct"; }
    if (finMes == "11") { this.finMesFch = "Nov"; }
    if (finMes == "12") { this.finMesFch = "Dic"; }

    this.diaSeleccionado=dia; // Dato que se muestra en select
    this.diaFch=dia;
    this.mesSeleccionado=this.mesFch; // Dato que se muestra en select
    this.mesFch=mes;
    this.anioSeleccionado=año; // Dato que se muestra en select
    this.AnioFch=año;

    this.tpoPrdCodActual=periodo.tpoPrdCod._id;

    
    this.finDiaSeleccionado=finDia;
    this.finDiaFch=finDia;
    this.finMesSeleccionado=this.finMesFch;
    this.finMesFch=finMes;
    this.finAnioSeleccionado=finAño;
    this.finAnioFch=finAño

    console.log("------");
    console.log(this.diaFch );
    console.log(this.mesFch );
    console.log(this.AnioFch);

    console.log("------");
    console.log(this.finDiaFch  );
    console.log(this.finMesFch  );
    console.log(this.finAnioFch );

    // console.log(this.diaFch);

    this.NomBotonPeriodo="Editar";
    this.divCrear=true;
    this.divListar=false;
  }

  Pre_EditarDetPeriodo(detPrd : GetDetallePeriodo){
    console.log(detPrd);
    this.prdCodActual=detPrd.prdCod._id;
    this.NomBtnDetPrd="Editar";
    this._idDetPrd=detPrd._id;

    var año = detPrd.detPrdIni.substr(0, 4);
    var mes = detPrd.detPrdIni.substr(-19, 2);
    var dia = detPrd.detPrdIni.substr(-16, 2);

    var finAño = detPrd.detPrdFin.substr(0, 4);
    var finMes = detPrd.detPrdFin.substr(-19, 2);
    var finDia = detPrd.detPrdFin.substr(-16, 2);

    this.tpoPrdCodActual=detPrd.tpoPrdCod.tpoPrdNom;

    if(this.tpoPrdCodActual=="Bimestral"){
      this.lblBimTrim="Bimestre";
      this.arraySegmento=[
        {_id:"0",nom:"Seleccione Bimestre"},
        {_id:"1",nom:"Primer Bimestre"},
        {_id:"2",nom:"Segundo Bimestre"},
        {_id:"3",nom:"Tercer Bimestre"},
        {_id:"4",nom:"Cuarto Bimestre"},
      ];
      this.ModeloSegmento.nom=detPrd.detPrdSgt;
    }
    else if(this.tpoPrdCodActual=="Trimestral"){
      this.lblBimTrim="Trimestre";
      this.arraySegmento=[
        {_id:"0",nom:"Seleccione Trimestre"},
        {_id:"1",nom:"Primer Trimestre"},
        {_id:"2",nom:"Segundo Trimestre"},
        {_id:"3",nom:"Tercer Trimestre"},
      ];
      this.ModeloSegmento.nom=detPrd.detPrdSgt;
    }


    if (mes == "01") { this.mesFch = "Ene"; }
    if (mes == "02") { this.mesFch = "Feb"; }
    if (mes == "03") { this.mesFch = "Mar"; }
    if (mes == "04") { this.mesFch = "Abr"; }
    if (mes == "05") { this.mesFch = "May"; }
    if (mes == "06") { this.mesFch = "Jun"; }
    if (mes == "07") { this.mesFch = "Jul"; }
    if (mes == "08") { this.mesFch = "Ago"; }
    if (mes == "09") { this.mesFch = "Set"; }
    if (mes == "10") { this.mesFch = "Oct"; }
    if (mes == "11") { this.mesFch = "Nov"; }
    if (mes == "12") { this.mesFch = "Dic"; }

    if (finMes == "01") { this.finMesFch = "Ene"; }
    if (finMes == "02") { this.finMesFch = "Feb"; }
    if (finMes == "03") { this.finMesFch = "Mar"; }
    if (finMes == "04") { this.finMesFch = "Abr"; }
    if (finMes == "05") { this.finMesFch = "May"; }
    if (finMes == "06") { this.finMesFch = "Jun"; }
    if (finMes == "07") { this.finMesFch = "Jul"; }
    if (finMes == "08") { this.finMesFch = "Ago"; }
    if (finMes == "09") { this.finMesFch = "Set"; }
    if (finMes == "10") { this.finMesFch = "Oct"; }
    if (finMes == "11") { this.finMesFch = "Nov"; }
    if (finMes == "12") { this.finMesFch = "Dic"; }

    this.diaSeleccionado=dia; // Dato que se muestra en select
    this.diaFch=dia;
    this.mesSeleccionado=this.mesFch; // Dato que se muestra en select
    this.mesFch=mes;
    this.anioSeleccionado=año; // Dato que se muestra en select
    this.AnioFch=año;

    
    this.finDiaSeleccionado=finDia;
    this.finDiaFch=finDia;
    this.finMesSeleccionado=this.finMesFch;
    this.finMesFch=finMes;
    this.finAnioSeleccionado=finAño;
    this.finAnioFch=finAño

    console.log("------");
    console.log("dia inicio :"+this.diaFch );
    console.log("mes inicio :"+this.mesFch );
    console.log("año inicio :"+this.AnioFch);

    console.log("------");
    console.log("dia fin :"+this.finDiaFch  );
    console.log("mes fin :"+this.finMesFch  );
    console.log("año fin :"+this.finAnioFch );

    this.divConfDet=true;
    this.divDetallePrd=false;
    this.dsbSelectSeg=true;
  }


  
  LimpiarCalendario(){
    this.AnioFch = this.anioActual;;
    this.mesFch  = "Mes";
    this.diaFch  = "Dia";

    this.finDiaFch="Dia";
    this.finMesFch="Mes";
    this.finAnioFch="Año";

    this.anioSeleccionado = "Año";
    this.mesSeleccionado = "Mes";
    this.diaSeleccionado = "Dia";

    this.finDiaSeleccionado="Dia";
    this.finMesSeleccionado="Mes";
    this.finAnioSeleccionado="Año";
    console.log(this.anioSeleccionado);
  }

  Limpiar(){
    this.diaFch =undefined;
    this.mesFch =undefined;
    

    this.finDiaFch =undefined;
    this.finMesFch =undefined
    this.finAnioFch=undefined;

    this.anioSeleccionado = "Año";
    this.mesSeleccionado  = "Mes";
    this.diaSeleccionado  = "Dia";

    this.finDiaSeleccionado="Dia";
    this.finMesSeleccionado="Mes";
    this.finAnioSeleccionado="Año";

    this.anioSeleccionado=this.anioActual;
    this.ModeloTipoPrd._id="string";
    this.NomBotonPeriodo="Crear";

    this.prdCodActual=undefined;
    this.tpoPrdCodActual=undefined;
    this.AnioFch=this.anioActual;
    this.dsbSelectSeg=false;
    this.NomBtnDetPrd="Crear";
  }

  LimpiarDetPrd(){
    this.diaFch =undefined;
    this.mesFch =undefined;
    

    this.finDiaFch =undefined;
    this.finMesFch =undefined
    this.finAnioFch=undefined;

    this.anioSeleccionado = "Año";
    this.mesSeleccionado  = "Mes";
    this.diaSeleccionado  = "Dia";

    this.finDiaSeleccionado="Dia";
    this.finMesSeleccionado="Mes";
    this.finAnioSeleccionado="Año";

    this.anioSeleccionado=this.anioActual;
    this.NomBotonPeriodo="Crear";

    this.AnioFch=this.anioActual;
    this.dsbSelectSeg=false;
    this.NomBtnDetPrd="Crear";

    if(this.tpoPrdCodActual=="Bimestral"){
      this.lblBimTrim="Bimestre";
      this.arraySegmento=[
        {_id:"0",nom:"Seleccione Bimestre"},
        {_id:"1",nom:"Primer Bimestre"},
        {_id:"2",nom:"Segundo Bimestre"},
        {_id:"3",nom:"Tercer Bimestre"},
        {_id:"4",nom:"Cuarto Bimestre"},
      ];
      this.ModeloSegmento.nom="Seleccione Bimestre";
    }
    else if(this.tpoPrdCodActual=="Trimestral"){
      this.lblBimTrim="Trimestre";
      this.arraySegmento=[
        {_id:"0",nom:"Seleccione Trimestre"},
        {_id:"1",nom:"Primer Trimestre"},
        {_id:"2",nom:"Segundo Trimestre"},
        {_id:"3",nom:"Tercer Trimestre"},
      ];
      this.ModeloSegmento.nom="Seleccione Trimestre";
    }
  }

  EditarPeriodo(){
  }

  CargarTablaPeriodos(){

    return this.periodoService.getPeriodosColegio(this.inputColCod)
    .subscribe(res => {  
      this.getPeriodoArray = res as GetPeriodo[];
      console.log(this.getPeriodoArray);
    });
  }

  CargarTablaDetallePeriodo(prdCod:string){

    this.habilitado=true;
    return this.detallePeriodoService.getDetallePeriodo(prdCod)
    .subscribe(res => {  
      this.arrayDetallePrd=res as GetDetallePeriodo[];

      if(this.arrayDetallePrd.length==0){

      }
      else{
        console.log("entroOOOOOOOOO");
        if(this.arrayDetallePrd[0].prdCod.estCod=="5e0a8a479644411040ebf293"){
          console.log("entro 5454545");
          this.habilitado=false;
        }


      }

      console.log(this.arrayDetallePrd);
    });
  }

  CargarSelectTipoPeriodo(){
    return this.tipoPeriodoService.getTipoPeriodo()
    .subscribe(res => {  
      this.arrayTipoPrd = res as TipoPeriodo[];
      this.arrayTipoPrd.unshift({
        estCod: "",
        _id: "string",
        tpoPrdNom: "- Seleccione -",
        timestamp: "2019-12-21T00:09:54.212Z",
      })
      console.log(this.arrayTipoPrd);
    });
    
  }

  capturarDia(val: any) {
    this.diaFch = val;
    console.log(this.diaFch)
  }

  capturarMes(val: any) {
    this.mesFch = val;
    if (this.mesFch == "Ene") { this.mesFch = "1"; }
    if (this.mesFch == "Feb") { this.mesFch = "2"; }
    if (this.mesFch == "Mar") { this.mesFch = "3"; }
    if (this.mesFch == "Abr") { this.mesFch = "4"; }
    if (this.mesFch == "May") { this.mesFch = "5"; }
    if (this.mesFch == "Jun") { this.mesFch = "6"; }
    if (this.mesFch == "Jul") { this.mesFch = "7"; }
    if (this.mesFch == "Ago") { this.mesFch = "8"; }
    if (this.mesFch == "Set") { this.mesFch = "9"; }
    if (this.mesFch == "Oct") { this.mesFch = "10"; }
    if (this.mesFch == "Nov") { this.mesFch = "11"; }
    if (this.mesFch == "Dic") { this.mesFch = "12"; }

    console.log(this.mesFch)
  }

  capturarAnio(val: any) {
    this.AnioFch = val;

    console.log(this.AnioFch)
  }

  /******************************************** */
  finCapturarDia(val: any) {
    this.finDiaFch = val;
    console.log(this.finDiaFch)
  }

  finCapturarMes(val: any) {
    this.finMesFch = val;
    if (this.finMesFch == "Ene") { this.finMesFch = "1"; }
    if (this.finMesFch == "Feb") { this.finMesFch = "2"; }
    if (this.finMesFch == "Mar") { this.finMesFch = "3"; }
    if (this.finMesFch == "Abr") { this.finMesFch = "4"; }
    if (this.finMesFch == "May") { this.finMesFch = "5"; }
    if (this.finMesFch == "Jun") { this.finMesFch = "6"; }
    if (this.finMesFch == "Jul") { this.finMesFch = "7"; }
    if (this.finMesFch == "Ago") { this.finMesFch = "8"; }
    if (this.finMesFch == "Set") { this.finMesFch = "9"; }
    if (this.finMesFch == "Oct") { this.finMesFch = "10"; }
    if (this.finMesFch == "Nov") { this.finMesFch = "11"; }
    if (this.finMesFch == "Dic") { this.finMesFch = "12"; }
    console.log(this.finMesFch)
  }

  finCapturarAnio(val: any) {
    this.finAnioFch = val;
    console.log(this.finAnioFch)
  }

  eliminarDetallePrd(detallePeriodo:GetDetallePeriodo){
    this.openDialogElimDet(detallePeriodo);
  }

  ngOnInit() {
    this.CargarSelectTipoPeriodo();
    this.CargarTablaPeriodos();


    let fechaActual = new Date();
    this.anioActual=fechaActual.getFullYear().toString();
    this.anioSeleccionado=this.anioActual;
    console.log(this.anioActual);


    this.arrayDia = [
      { idDia: 0, nomDia: "Dia" },
      { idDia: 1, nomDia: "01" }, { idDia: 2, nomDia: "02" }, { idDia: 3, nomDia: "03" }, { idDia: 4, nomDia: "04" }, { idDia: 5, nomDia: "05" },
      { idDia: 6, nomDia: "06" }, { idDia: 7, nomDia: "07" }, { idDia: 8, nomDia: "08" }, { idDia: 9, nomDia: "09" }, { idDia: 10, nomDia: "10" }, { idDia: 11, nomDia: "11" },
      { idDia: 12, nomDia: "12" }, { idDia: 13, nomDia: "13" }, { idDia: 14, nomDia: "14" }, { idDia: 15, nomDia: "15" }, { idDia: 16, nomDia: "16" },
      { idDia: 17, nomDia: "17" }, { idDia: 18, nomDia: "18" }, { idDia: 19, nomDia: "19" }, { idDia: 20, nomDia: "20" }, { idDia: 21, nomDia: "21" },
      { idDia: 22, nomDia: "22" }, { idDia: 23, nomDia: "23" }, { idDia: 24, nomDia: "24" }, { idDia: 25, nomDia: "25" }, { idDia: 26, nomDia: "26" },
      { idDia: 27, nomDia: "27" }, { idDia: 28, nomDia: "28" }, { idDia: 29, nomDia: "29" }, { idDia: 30, nomDia: "30" }, { idDia: 31, nomDia: "31" },
    ];

    this.arrayMes = [
      { idMes: 0, nomMes: "Mes" },
      { idMes: 1, nomMes: "Ene" },
      { idMes: 2, nomMes: "Feb" },
      { idMes: 3, nomMes: "Mar" },
      { idMes: 4, nomMes: "Abr" },
      { idMes: 5, nomMes: "May" },
      { idMes: 6, nomMes: "Jun" },
      { idMes: 7, nomMes: "Jul" },
      { idMes: 8, nomMes: "Ago" },
      { idMes: 9, nomMes: "Set" },
      { idMes: 10, nomMes: "Oct" },
      { idMes: 11, nomMes: "Nov" },
      { idMes: 12, nomMes: "Dic" },
    ];

    this.arrayAnio = [
      { idAnio: 0, nomAnio: "Año" },{ idAnio: 2022, nomAnio: "2022" },{ idAnio: 2019, nomAnio: "2021" },{ idAnio: 2019, nomAnio: "2020" }, { idAnio: 2019, nomAnio: "2019" }, { idAnio: 2018, nomAnio: "2018" }, { idAnio: 2017, nomAnio: "2017" },
      { idAnio: 2016, nomAnio: "2016" }, { idAnio: 2015, nomAnio: "2015" }, { idAnio: 2014, nomAnio: "2014" }, { idAnio: 2013, nomAnio: "2013" },
      { idAnio: 2012, nomAnio: "2012" }, { idAnio: 2011, nomAnio: "2011" }, { idAnio: 2010, nomAnio: "2010" }, { idAnio: 2009, nomAnio: "2009" },
      { idAnio: 2008, nomAnio: "2008" }, { idAnio: 2007, nomAnio: "2007" }, { idAnio: 2006, nomAnio: "2006" }, { idAnio: 2005, nomAnio: "2005" },
      { idAnio: 2004, nomAnio: "2004" }, { idAnio: 2003, nomAnio: "2003" }, { idAnio: 2002, nomAnio: "2002" }, { idAnio: 2001, nomAnio: "2001" },
      { idAnio: 2000, nomAnio: "2000" }, { idAnio: 1999, nomAnio: "1999" }, { idAnio: 1998, nomAnio: "1998" }, { idAnio: 1997, nomAnio: "1997" },
      { idAnio: 1996, nomAnio: "1996" }, { idAnio: 1995, nomAnio: "1995" }, { idAnio: 1994, nomAnio: "1994" }, { idAnio: 1993, nomAnio: "1993" },
      { idAnio: 1992, nomAnio: "1992" }, { idAnio: 1991, nomAnio: "1991" }, { idAnio: 1990, nomAnio: "1990" }, { idAnio: 1989, nomAnio: "1989" },
      { idAnio: 1988, nomAnio: "1988" }, { idAnio: 1987, nomAnio: "1987" }, { idAnio: 1986, nomAnio: "1986" }, { idAnio: 1985, nomAnio: "1985" },
      { idAnio: 1984, nomAnio: "1984" }, { idAnio: 1983, nomAnio: "1983" }, { idAnio: 1982, nomAnio: "1982" }, { idAnio: 1981, nomAnio: "1981" },
      { idAnio: 1980, nomAnio: "1980" }, { idAnio: 1979, nomAnio: "1979" }, { idAnio: 1978, nomAnio: "1978" }, { idAnio: 1976, nomAnio: "1976" },
    ];
    this.anioSeleccionado = "Año";
    this.mesSeleccionado = "Mes";
    this.diaSeleccionado = "Dia";

    this.finDiaSeleccionado="Dia";
    this.finMesSeleccionado="Mes";
    this.finAnioSeleccionado="Año";

    this.anioSeleccionado=this.anioActual;
    this.ModeloTipoPrd._id="string";
  }
  
}
