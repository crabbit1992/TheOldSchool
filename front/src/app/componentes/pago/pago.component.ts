import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalPagoComponent } from '../modal-pago/modal-pago.component';

/** Importacion de modelos */
import { PersonaRepositorio, Mes}  from '../../modelos/persona-repositorio';
import { Pago, ArrayPago }  from '../../modelos/pago';
import { TipoPago }  from '../../modelos/tipo-pago';
import { GetAlumno }  from '../../modelos/alumno';
import { Matricula, GetMatricula }  from '../../modelos/matricula';



/** Importacion de servicios */
import { PersonaRepositorioService } from '../../servicios/persona-repositorio.service';
import { PagoService } from '../../servicios/pago.service';
import { TipoPagoService } from '../../servicios/tipo-pago.service';
import { MantenimientoCargoService } from '../../servicios/mantenimiento-cargo.service'; 
import { MntAdminCrabbService } from '../../servicios/mnt-admin-crabb.service'; 
import { MatriculaService } from '../../servicios/matricula.service'; 


declare var M: any;
@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  @Input() inputColCod:string;
  @Input() codMbr:string;

  idPerActivo:string //Este es el id de la persona que se encuentra logueado
  idPflActivo:string //Este es el id de la persona que se encuentra logueado

  ttlFrmPago:string="Registrar pago";
  ttlFrmTipoPago:string="Registrar tipo de pago";

  arrayMes: Mes[];
  mesSeleccionado: string;
  mesFch: string;

  arrayMatricula :GetMatricula[];
  filterMatricula :GetMatricula[]=[];

  ModeloPerRep: PersonaRepositorio = new PersonaRepositorio();
  ArrayPersonaRepo: PersonaRepositorio[]

  ModeloPago: Pago = new Pago();
  arrayPago: ArrayPago[];
  arrayPagoFilter: ArrayPago[];

  ModeloTipoPago: TipoPago = new TipoPago();
  ArrayTipoPago: TipoPago[];
  selectTipoPago: TipoPago[];

  divCrearPago:boolean=false;
  divListarPago:boolean=true;
  divCrearTipoPago:boolean=false;
  divListarTipoPago:boolean=false;

    /******** Referente a alumno   ********** */

  alumnosArray :GetAlumno[];
  aluArray :GetAlumno[]=[];
  alumno_id:string;
  alumnoNomApe:string;
  alumnoApeFiltro:string;
  perRepCod:string;
  alumno_dni:string;

  reqMes:boolean=false;
  selectMesEnabled=true;

  itemTpoPago:boolean=false;
  btnNom:string= "Registrar";

  constructor(
    private personaRepositorioService:PersonaRepositorioService,
    private pagoService:PagoService,
    private tipoPagoService:TipoPagoService,
    public  dialog         : MatDialog,
    private mantenimientoCargoService: MantenimientoCargoService,
    private mntAdminCrabbService: MntAdminCrabbService
  ) { }

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.arrayPago = this.listFilter ? this.performFilter(this.listFilter) : this.arrayPagoFilter;
  }

  performFilter(filterBy: string): ArrayPago[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.arrayPagoFilter.filter((pago: ArrayPago) =>
      pago.pgoPerAso.perRepDni.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
/************************** */

_listFiltera: string;
  get listFiltera(): string {
    return this._listFiltera;
  }
  set listFiltera(value: string) {
    this._listFiltera = value;
    this.alumnosArray = this.listFiltera ? this.performFiltera(this.listFiltera) : this.aluArray;
  }

  performFiltera(filterBy: string): GetAlumno[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.aluArray.filter((alumno: GetAlumno) =>
      alumno.perRepCod.perRepDni.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


/************************** */


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

  hideDivs(){
    this.divCrearPago=false;
    this.divListarPago=false;
    this.divCrearTipoPago=false;
    this.divListarTipoPago=false;
  }

  openModalOptPago(fltOrOpt:string){
    this.pagoService.optPagoSelected="...";
    var objMensaje={


      fltOrOpt:fltOrOpt,
      colCod: this.inputColCod

    }
    console.log(objMensaje);

    const dialogRef =this.dialog.open(ModalPagoComponent,{
      width: '400px',
      data: objMensaje,
    });

    dialogRef.afterClosed().subscribe(res=>{



      if(fltOrOpt=="Filtros"){

          console.log("eee :" + this.pagoService.optPagoSelected);
          var tpoPgo=this.pagoService.optPagoSelected;
          this.BuscarSgnConcepto(tpoPgo);
          
      }
      else{
        var opcion=this.pagoService.optPago;
        console.log("Esta es la opcion : " + opcion);
  
        if(opcion=="lisPago"){
          this.showListarPago();
        }
        else if(opcion=="regPago"){
          this.showCrearPago();
        }
        else if(opcion=="regTpoPago"){
          this.showCrearTipoPago();
        }
        else if(opcion=="lisTpoPago"){
          this.showListarTipoPago();
        }
      }
      
    });   
  }

  /**  Metodos para pago******************************************* */
  ValidarFrmPago():boolean{

    var trueOrFalse=false;
    var expresionNum = /^[0-9]+$/;

    if(this.ModeloPago.tpoPgoCod==undefined||this.ModeloPago.tpoPgoCod==null||this.ModeloPago.tpoPgoCod=="..."){
      trueOrFalse= true;
      M.toast({ html: 'Por favor elija un concepto' });
    }
    else if(this.ModeloPago.pgoMto==undefined||this.ModeloPago.pgoMto==null){
      trueOrFalse= true;
      M.toast({ html: 'Por favor ingrese un monto' });
    }
    else if(this.ModeloPago.pgoPerAso==undefined||this.ModeloPago.pgoPerAso==null||this.ModeloPago.pgoPerAso==""){
      trueOrFalse= true;
      M.toast({ html: 'Por favor seleccione un alumno' });
    }

    var monto= this.ModeloPago.pgoMto.toString();
    
    if (!expresionNum.test(monto)) {  
      trueOrFalse= true;
      M.toast({ html: 'Monto no valido' });;
      
    }

    if(this.reqMes==true){
      console.log(this.reqMes);

      if(this.ModeloPago.pgoMes==undefined||this.ModeloPago.pgoMes==null||this.ModeloPago.pgoMes=="Elija un mes"){
        trueOrFalse= true;
        M.toast({ html: 'Por favor seleccione un mes' });
      }

    }

    return trueOrFalse;
  }

  CrearPago(){
    this.ModeloPago.tpoPgoCod=this.ModeloTipoPago._id;
    this.ModeloPago.pgoMes=this.mesFch;
    this.ModeloPago.pgoPerAso=this.perRepCod;
    this.ModeloPago.pgoPerReg=this.idPerActivo;
    this.ModeloPago.colCod=this.inputColCod;

    if(this.ValidarFrmPago()==true){

    }
    else{

      if(this.ModeloPago.pgoMes=="Elija un mes"||this.ModeloPago.pgoMes==undefined||this.ModeloPago.pgoMes==null){
        this.ModeloPago.pgoMes="--------";
      }

      console.log(this.ModeloPago);
      return this.pagoService.postPago(this.ModeloPago)
      .subscribe(res=>{

        var status=res["status"];

        if(status==200){
          M.toast({ html: 'Se registro el pago' });
          this.mesSeleccionado="Elija un mes";
          this.ttlFrmPago="Registrar pago";
        }
        console.log(res);
        this.showListarPago();
      });
 
    }
    
    console.log(this.ModeloPago);
  }
  ListarPagos(){

    return this.pagoService.getPagos(this.inputColCod)
    .subscribe(res=>{

      this.arrayPago= res as ArrayPago[];
      this.arrayPagoFilter= res as ArrayPago[];
      this.hideDivs();
      this.divListarPago=true;
      
      console.log(res);
    });
  }
  //PreEditarPago(){}

  CargarFiltroTipoPago(){
    return this.tipoPagoService.getTipoPagos(this.inputColCod)
    .subscribe(res => {  
      this.selectTipoPago = res as TipoPago[];
      
      this.selectTipoPago.unshift({
        colCod: "5e0e813f64fd00126cfff445",
        estCod: "5e0a8a3b9644411040ebf292",
        timestamp: "2021-03-06T08:27:42.338Z",
        tpoPgoNom: "Seleccione un concepto",
        tpoPgoReqMes:"",
        tpoPgoDes: "",
        tpoPgoMon: 0,
        _id: "..."
      });
      console.log(this.selectTipoPago);
      this.ModeloTipoPago._id="..."
    });
  }

  showCrearPago(){
    this.hideDivs();
    this.CargarFiltroTipoPago();
    this.ModeloPago=new Pago();
    this.alumnoNomApe=undefined;
    console.log("Este es el mes" +this.mesSeleccionado);
    this.divCrearPago=true;
  }
  showListarPago(){
    this.hideDivs();
    this.ListarPagos();
    this.CargarFiltroTipoPago();
  }

  CargarTablaAlumnos() {
    this.mantenimientoCargoService.getAlumnosColegio(this.inputColCod)
      .subscribe(res => {
        this.alumnosArray = res as GetAlumno[];
        this.aluArray=this.alumnosArray;
        console.log(this.alumnosArray);
      });
  }
  /***************************************************************** */


  /**  Metodos para tipo de pago************************************ */
  ValidarFrmTipoPago():boolean{

    var trueOrFalse=false;

    if(this.ModeloTipoPago.tpoPgoNom==undefined|| this.ModeloTipoPago.tpoPgoNom== ""|| this.ModeloTipoPago.tpoPgoNom==null){
      trueOrFalse=true;
      M.toast({ html: 'Por favor ingrese un concepto' });
    }
    else if(this.ModeloTipoPago.tpoPgoDes==undefined|| this.ModeloTipoPago.tpoPgoDes== ""|| this.ModeloTipoPago.tpoPgoDes==null){
      trueOrFalse=true;
      M.toast({ html: 'Por favor ingrese una descripción' });
    }
    else if(this.ModeloTipoPago.tpoPgoReqMes==undefined|| this.ModeloTipoPago.tpoPgoReqMes== ""|| this.ModeloTipoPago.tpoPgoReqMes==null){
      trueOrFalse=true;
      M.toast({ html: 'Por favor defina si requerira el mes' });
    }

    var expresionNum = /^[0-9]+$/;

    var monto= this.ModeloTipoPago.tpoPgoMon.toString();
    
    if (!expresionNum.test(monto)) {  
      trueOrFalse= true;
      M.toast({ html: 'Monto no valido' });;
      
    }

    return trueOrFalse;
  }

  CrearTipoPago(){
    this.ModeloTipoPago.colCod=this.inputColCod;
    console.log(this.ModeloTipoPago);

    if(this.ValidarFrmTipoPago()==true){

    }
    else{

      if(this.ModeloTipoPago._id){
        
        return this.tipoPagoService.editTipoPago(this.ModeloTipoPago)
        .subscribe(res=>{
          console.log(res);

          var status=res["status"];

          if(status==200){
            M.toast({ html: 'Se edito el tipo de pago' });
            this.ModeloTipoPago= new TipoPago();
            this.ttlFrmTipoPago="Editar tipo de pago";
            this.btnNom="Registrar";
            this.showListarTipoPago();
          }
        });
      }
      else{
        console.log("65656565656");
        return this.tipoPagoService.postTipoPago(this.ModeloTipoPago)
        .subscribe(res=>{

        var status=res["status"];

        if(status==200){
          M.toast({ html: 'Se registro el tipo de tipo de pago' });
          console.log(res);
          this.ModeloTipoPago= new TipoPago();
          this.ttlFrmTipoPago="Registrar tipo de pago";
          this.btnNom="Registrar";
          this.showListarTipoPago();
        }
        });
      }
    }
  }

  eliminarTipoPago(tipoPago:TipoPago){
    const id= tipoPago._id

    return this.tipoPagoService.deleteTipoPago(id)
    .subscribe(res=>{
      var status=res["status"];

        if(status==200){
          M.toast({ html: 'Se elimino el tipo de pago' });
          this.showListarTipoPago();
        }
        else{
          M.toast({ html: 'No se puede eliminar, hay registros asociados' });
        }
    })
  };

  ListarTipoPagos(){
    return this.tipoPagoService.getTipoPagos(this.inputColCod)
    .subscribe(res=>{
      console.log(res);
      this.ArrayTipoPago= res as TipoPago[];
      console.log(this.ArrayTipoPago);
    })
  };

  PreEditarTipoPago(tipoPago: TipoPago){

    this.ModeloTipoPago._id= tipoPago._id;
    this.ModeloTipoPago.tpoPgoNom= tipoPago.tpoPgoNom;
    this.ModeloTipoPago.tpoPgoDes= tipoPago.tpoPgoDes;
    this.ModeloTipoPago.tpoPgoMon= tipoPago.tpoPgoMon;
    this.ModeloTipoPago.tpoPgoReqMes= tipoPago.tpoPgoReqMes;
    this.btnNom="Editar";
    this.ttlFrmTipoPago="Editar tipo de pago"
    this.hideDivs();
    this.divCrearTipoPago=true;
  }

  showCrearTipoPago(){
    this.hideDivs();
    this.ModeloTipoPago= new TipoPago();
    this.ttlFrmTipoPago="Registrar pago";
    this.btnNom="Registrar"
    this.divCrearTipoPago=true;
  }

  showListarTipoPago(){
    this.hideDivs();
    this.ListarTipoPagos();
    this.divListarTipoPago=true;
  }

  /****************************************************************** */

  Cancelar(opt :string){

    this.alumnoNomApe=undefined;
    if(opt=="tpoPgo"){
      this.ModeloTipoPago= new TipoPago();
      this.showListarTipoPago();
    }
    else if(opt=="pa"){
      this.ModeloPago= new Pago();
      this.showListarPago();
    }
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

capturarTipoPago(val: any) {

  this.reqMes=false;
  this.ModeloPago= new Pago;
  this.mesFch="Elija un mes";
  this.ModeloPago.pgoMes= "Elija un mes"
  

  if(val=="..."){
    console.log("Entreo 99");
    this.selectMesEnabled=true;
    this.mesSeleccionado = "Elija un mes";

  }
  
  for(let i=0; i<this.ArrayTipoPago.length;i++){

    if(this.ArrayTipoPago[i]._id==val){
      console.log(this.ArrayTipoPago[i]);
      this.ModeloPago.pgoDes=this.ArrayTipoPago[i].tpoPgoDes;
      this.ModeloPago.pgoMto=this.ArrayTipoPago[i].tpoPgoMon;

      if(this.ArrayTipoPago[i].tpoPgoReqMes=="1"){
        this.reqMes=true;
        this.selectMesEnabled=false;
        
      }
      else if(this.ArrayTipoPago[i].tpoPgoReqMes=="0"){
        this.reqMes=false;
        this.selectMesEnabled=true;
        this.mesSeleccionado = "Elija un mes";
      }
    }
  }
}

BuscarSgnConcepto(val: any) {
  console.log(val);
  console.log(this.inputColCod);

  const tpoPgoCod=val.toString();
  
  return this.pagoService.filterPago(tpoPgoCod, this.inputColCod)
  .subscribe( res=>{
    this.arrayPago= res as ArrayPago[];
    this.arrayPagoFilter= this.arrayPago;
  });

};

  capturarMes(val: any) {
    this.mesFch = val;
    if (this.mesFch == "Enero") { this.mesFch = "Enero"; }
    if (this.mesFch == "Febrero") { this.mesFch = "Febrero"; }
    if (this.mesFch == "Marzo") { this.mesFch = "Marzo"; }
    if (this.mesFch == "Abril") { this.mesFch = "Abril"; }
    if (this.mesFch == "Mayo") { this.mesFch = "Mayo"; }
    if (this.mesFch == "Junio") { this.mesFch = "Junio"; }
    if (this.mesFch == "Julio") { this.mesFch = "Julio"; }
    if (this.mesFch == "Agosto") { this.mesFch = "Agosto"; }
    if (this.mesFch == "Setiembre") { this.mesFch = "Setiembre"; }
    if (this.mesFch == "Octubre") { this.mesFch = "Octubre"; }
    if (this.mesFch == "Noviembre") { this.mesFch = "Noviembre"; }
    if (this.mesFch == "Diciembre") { this.mesFch = "Diciembre"; }
  }



  ngOnInit() {

    this.idPerActivo= JSON.parse(localStorage.getItem('idPerRep'));
    this.idPerActivo= this.mntAdminCrabbService.decript(this.idPerActivo);

    this.idPflActivo= JSON.parse(localStorage.getItem('prfactcod'));
    this.idPflActivo= this.mntAdminCrabbService.decript(this.idPflActivo);

    if(this.idPflActivo=="5e0a9164c2a58d0b8872b2b8"){
      this.itemTpoPago=true;
    }

    



    this.showListarPago();
    this.ListarTipoPagos();
    this.CargarFiltroTipoPago();

    this.CargarTablaAlumnos();
    this.arrayMes = [
      { idMes: 0, nomMes: "Elija un mes" },
      { idMes: 1, nomMes: "Enero" },
      { idMes: 2, nomMes: "Febrero" },
      { idMes: 3, nomMes: "Marzo" },
      { idMes: 4, nomMes: "Abril" },
      { idMes: 5, nomMes: "Mayo" },
      { idMes: 6, nomMes: "Junio" },
      { idMes: 7, nomMes: "Julio" },
      { idMes: 8, nomMes: "Agosto" },
      { idMes: 9, nomMes: "Setiembre" },
      { idMes: 10, nomMes: "Octubre" },
      { idMes: 11, nomMes: "Noviembre" },
      { idMes: 12, nomMes: "Diciembre" },
    ];

    this.mesSeleccionado = "Elija un mes";
  }

}
