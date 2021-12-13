import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ModalPerfilColegioComponent } from '../modal-perfil-colegio/modal-perfil-colegio.component';


// Importacion de modelos
import { GaleriaCol }  from '../../modelos/galeria-col';
import { TipoImagen }  from '../../modelos/tipo-imagen';
import { 
  QuienesSomos,GetQuienesSomos,arrayTpoQs,
  Actividades,GetActividades,
  BioNiveles,GetBioNivel,arrayNivelTpo,
  BioTaller,GetBioTaller,
  BioInfraestructura,GetBioInfraestructura,
  BioAnuncio, GetBioAnuncio,
  BioPortada,GetBioPortada,
  objEmblema,getObjEmblema,
  objImgPfl,getObjImgPfl,
  objMision,objVision,objValores
  }  from '../../modelos/biografia';

// Importacion de servicios
import { GaleriaColService }  from '../../servicios/galeria-col.service';
import { TipoImagenService }  from '../../servicios/tipo-imagen.service';
import { BiografiaService }  from '../../servicios/biografia.service';
import { ColegioService }  from '../../servicios/colegio.service';
import { MntAdminCrabbService }  from '../../servicios/mnt-admin-crabb.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


declare var M: any;

@Component({
  selector: 'app-perfil-colegio',
  templateUrl: './perfil-colegio.component.html',
  styleUrls: ['./perfil-colegio.component.css']
})
export class PerfilColegioComponent implements OnInit {

  readonly URL='http://localhost:3000';

  btnGuardarEditar:string="Guardar"; 
  imgCodSelected:string;

  /** Div's referentes a las opciones de la biografia */
  divCrearQs:boolean=false;
  divMision:boolean=false;
  divVision:boolean=false;
  divValores:boolean=false;
  /*************************************************************************** */

  /** Referente a biografia - apartado nivel */
  encabezadoNivel:string;
  encabezadoNivelArreglo: GetBioNivel=new GetBioNivel();
  opcionNivel:string;
  ttlNivel:string;
  ttlListNivImgs:string;
  ttlMntNivel:string;
  MatselectNivel:GetBioNivel[]
  disabledMatSlt:boolean=false;
  arrayNivelTpo:arrayNivelTpo[]=[{"_id":"0","name":"Elija un nivel"},{"_id":"1","name":"Inicial"},{"_id":"2","name":"Primaria"},{"_id":"3","name":"Secundaria"}];
  ModeloNivelTpo: arrayNivelTpo=new arrayNivelTpo();
  ModeloMatSltNiv: GetBioNivel=new GetBioNivel();
  matSelectNivTpo:boolean=false;
  ModeloNivel: BioNiveles=new BioNiveles();
  arrayNiveles: GetBioNivel[];
  arrayNivMaestro:  GetBioNivel[];
  /**************************************************************************** */

  /** Referente a Quienes somos */
  arrayQsOptions:arrayTpoQs[]=[{"_id":"0","name":"Tipo de apartado"},{"_id":"1","name":"Misión"},{"_id":"2","name":"Visión"},{"_id":"3","name":"Valores"}];
  ModeloQsOptions: arrayTpoQs=new arrayTpoQs();
  matSelectTpoApart:boolean=false;
  ModeloQuienesSomos: QuienesSomos=new QuienesSomos();
  arrayQuienesSomos: GetQuienesSomos[];
  objMision:  objMision= new objMision();
  objVision:  objVision= new objVision();
  objValores: objValores= new objValores();
  /*************************************************************************** */

  /** Referente a Actividad */
  ModeloActividad: Actividades=new Actividades();
  ttlMntActividad:string;
  opcionActividad: string;
  arrayActividades: GetActividades[];
  arrayActividadEbz:  GetActividades[];
  encabezadoActividad: string;
  encabezadoActividadArreglo: GetActividades= new GetActividades();
  encabezadoActividadTf:boolean=false;
  
  /*************************************************************************** */

  /** Referente a Taller */
  ModeloTaller: BioTaller=new BioTaller();
  ttlMntTaller:string;
  opcionTaller:string;
  arrayTaller: GetBioTaller[];
  arrayTallerEbz:  GetBioTaller[];
  encabezadoTallerArreglo: GetBioTaller= new GetBioTaller();
  encabezadoTallerTf:boolean=false;
  /*************************************************************************** */

  /** Referente a Infraestructura */
  ModeloInfraestructura: BioInfraestructura=new BioInfraestructura();
  ttlMntInfraestructura:string;
  opcionInfraestructura:string;
  arrayInfraestructura: GetBioInfraestructura[];
  arrayInfraestructuraEbz:  GetBioInfraestructura[];
  encabezadoInfraestructura: string;
  encabezadoInfraestructuraArreglo:GetBioInfraestructura=new GetBioInfraestructura();
  encabezadoInfraestructuraTf:boolean=false;
  /*************************************************************************** */

  /** Referente a Anuncios */
  ModeloAnuncio: BioAnuncio=new BioAnuncio();
  ttlMntAnuncio:string;
  arrayAnuncio: GetBioAnuncio[];
  /*************************************************************************** */

    /** Referente a Portada */
    ModeloPortada: BioPortada=new BioPortada();
    ttlMntPortada:string;
    arrayPortada: GetBioPortada[];
    /*************************************************************************** */

  /** Referente a Emblema */
  objetoEmblema: objEmblema=new objEmblema();
  ttlMntEmblema:string;
  arrayEmblema: getObjEmblema[]=[];
  /*************************************************************************** */

  /** Referente a Imagen de perfil */
  objetoImgPfl: objImgPfl=new objImgPfl();
  ttlMntImgPfl:string;
  arrayImgPfl: getObjImgPfl[]=[];
  /*************************************************************************** */


 
  /** Referente a Subir imagenes */
  arrayTipoImagen: TipoImagen[];
  ModeloTipoImagen: TipoImagen = new TipoImagen();
  photoSelected: string | ArrayBuffer;
  file: File;
  divSubirImg:boolean;
  divListarImgs:boolean=true;
  divImgPfl:boolean=false;
  divCardImg:boolean=true;
  ModeloGaleriaCol: GaleriaCol=new GaleriaCol();
  arrayImagenes: GaleriaCol[];
  imagen: GaleriaCol=new GaleriaCol();
  btnEditarGuardar:string="Guardar Imagen";
  modEditImg:Boolean=true;
  modCreartImg:Boolean=false;
  /*************************************************************************** */

  li_SubirImagen:      boolean;
  li_ListarImagenes:   boolean;
  listQuienesSomos:    boolean=false;
  listActividades:     boolean=false;
  listTalleres:        boolean=false;
  listNiveles:         boolean=false;
  listNivelImgs:       boolean=false;
  listInfraestructura: boolean=false;
  listAnuncios:        boolean=false;
  listPortada:         boolean=false; 
  listEmblema:         boolean=false;
  listImgPfl:          boolean=false;
  

  crearQuienesSomos:    boolean=false;
  crearActividades:     boolean=false;
  crearTalleres:        boolean=false;
  crearNiveles:         boolean=false;
  asociarImgNiv:        boolean=false;
  crearInfraestructura: boolean=false;
  crearAnuncio:         boolean=false;
  crearPortada:         boolean=false;
  crearEmblema:         boolean=false;
  crearImgPfl:          boolean=false;
  

  @Input() inputColCod:string;
  @Input() codMbr:string;
  @Output() portada= new EventEmitter();
  @Output() ptIzquierda= new EventEmitter();
  @Output() ptDerecha= new EventEmitter();

  constructor(
    private galeriaColService:GaleriaColService,
    private tipoImagenService:TipoImagenService,
    private biografiaService:BiografiaService,
    public dialog            : MatDialog,
    private colegioService:ColegioService,
    ) { }

  HideDivs(){
    this.divListarImgs        =false;
    this.divSubirImg          =false;
    this.listQuienesSomos     =false;
    this.listActividades      =false;
    this.listTalleres         =false;
    this.listNiveles          =false;
    this.listNivelImgs        =false;
    this.listInfraestructura  =false;
    this.listAnuncios         =false;
    this.listEmblema          =false;
    this.listImgPfl           =false;
    this.listPortada          =false;  
  
    this.crearQuienesSomos    =false;
    this.crearActividades     =false;
    this.crearTalleres        =false;
    this.crearNiveles         =false;
    this.asociarImgNiv        =false;
    this.crearInfraestructura =false;
    this.crearAnuncio         =false;
    this.crearEmblema         =false;
    this.crearImgPfl          =false;
    this.crearPortada         =false;
  }

  ShowSubirImagen(){
    this.modEditImg=false;
    this.modCreartImg=true;
    this.cargarTipoImagen();
    this.ModeloTipoImagen._id="seleccionar";
    this.HideDivs();
    this.limpiar();
    this.btnEditarGuardar="Guardar Imagen";
    this.photoSelected=null;
    this.imgCodSelected=null;
    this.divSubirImg=true;
  }

  ShowListarImagenes(){
    this.HideDivs();
    this.getFotos();
    this.cargarTipoImagenFlt();
    this.ModeloTipoImagen._id="111";
    this.divListarImgs=true;
    this.divCardImg=true;
    this.divImgPfl=false;
  }

  /**Metodos de Quienes Somos */
  ShowDivQuienesSomos(){
    this.HideDivs();
    this.getQuienesSomos();
    this.photoSelected=null;
    this.imgCodSelected=null;
    this.listQuienesSomos=true;
  }

  ShowDivCrearQs(){
    this.HideDivs();
    this.crearQuienesSomos=true;
    this.ModeloQsOptions.name="Tipo de apartado";
    this.btnEditarGuardar="Guardar";
    this.matSelectTpoApart=false;
    this.ModeloQuienesSomos=new QuienesSomos();
    this.photoSelected=null;
    this.imgCodSelected=null;
    console.log("Exito");
  }

  /**Metodos de actividades */
  ShowDivActividades(){
    this.HideDivs();  
    this.photoSelected=null;
    this.imgCodSelected=null;
    this.listActividades=true;
    this.getActividad();
  }

  ShowDivCrearActividad(opcion:string,){

    this.HideDivs();
    this.opcionActividad=opcion;

    if(this.opcionActividad=="crear"){
      this.ttlMntActividad="Crear encabezado actividad"
      this.crearActividades=true;
      this.btnEditarGuardar="Guardar";

      this.ModeloActividad=new Actividades();
      this.photoSelected=null;
      this.imgCodSelected=null;
    }
    else if(this.opcionActividad=="asociar"){
      this.ttlMntActividad="Asociar imagen a actividad"
      this.crearActividades=true;
      this.btnEditarGuardar="Guardar";
      this.ModeloActividad=new Actividades();
      this.photoSelected=null;
      this.imgCodSelected=null;
    }
  }

  /**Metodos de Niveles */
  ShowDivNiveles(){
    this.HideDivs();
    
    this.getNivel();
    this.photoSelected=null;
    this.imgCodSelected=null;
    this.listNiveles=true;
  }

  ShowDivCrearNivel(opcion:string,nivTtl:string){
    this.HideDivs();
    this.opcionNivel=opcion;

    if(this.opcionNivel=="crear"){
      this.ttlMntNivel="Crear nuevo nivel"
      this.crearNiveles=true;
      this.btnEditarGuardar="Guardar";
      this.ModeloNivelTpo.name="Elija un nivel";
      this.ModeloNivel=new BioNiveles();
      this.photoSelected=null;
      this.imgCodSelected=null;
    }
    else if(this.opcionNivel=="asociar"){
      this.ttlMntNivel="Asociar imagen a nivel"
      this.ModeloMatSltNiv.nivTtl=nivTtl;
      this.matSelectNivTpo=true;
      this.asociarImgNiv=true;
      this.btnEditarGuardar="Guardar";
      this.ModeloNivel=new BioNiveles();
      this.photoSelected=null;
      this.imgCodSelected=null;
    }

  }

  /**Metodos de Talleres */
  ShowDivTalleres(){
    this.HideDivs();
    this.getTaller();
    this.photoSelected=null;
    this.imgCodSelected=null;
    this.listTalleres=true;
  }

  ShowDivCrearTaller(opcion:string){
    this.HideDivs();
    this.opcionTaller=opcion;

    if(this.opcionTaller=="crear"){
      this.ttlMntTaller="Crear encabezado Taller"
      this.crearTalleres=true;
      this.btnEditarGuardar="Guardar";

      this.ModeloTaller=new BioTaller();
      this.photoSelected=null;
      this.imgCodSelected=null;
    }
    else if(this.opcionTaller=="asociar"){
      this.ttlMntTaller="Asociar imagen a Taller"
      this.crearTalleres=true;
      this.btnEditarGuardar="Guardar";
      this.ModeloTaller=new BioTaller();
      this.photoSelected=null;
      this.imgCodSelected=null;
    }

  }


  /**Metodos de Infraestructura */
  ShowDivInfraestructura(){
    this.HideDivs();
    this.getInfraestructura();
    this.photoSelected=null;
    this.imgCodSelected=null;
    this.listInfraestructura=true;
  }

  ShowDivCrearInfraestructura(opcion:string){
    this.HideDivs();
    this.opcionInfraestructura=opcion;
    console.log(opcion);

    if(this.opcionInfraestructura=="crear"){
      this.ttlMntInfraestructura="Crear encabezado Infraestructura"
      this.crearInfraestructura=true;
      this.btnEditarGuardar="Guardar";

      this.ModeloInfraestructura=new BioInfraestructura();
      this.photoSelected=null;
      this.imgCodSelected=null;
    }
    else if(this.opcionInfraestructura=="asociar"){
      this.ttlMntInfraestructura="Asociar imagen a Infraestructura"
      this.crearInfraestructura=true;
      this.btnEditarGuardar="Guardar";
      this.ModeloInfraestructura=new BioInfraestructura();
      this.photoSelected=null;
      this.imgCodSelected=null;
    }
  }

  /**Metodos de Anuncio */
  ShowDivAnuncio(){
    this.HideDivs();
    this.getAnuncios();
    this.photoSelected=null;
    this.imgCodSelected=null;
    this.listAnuncios=true;
  }

  ShowDivCrearAnuncio(){
    this.HideDivs();
 
    this.ttlMntAnuncio="Crear Anuncio"
    this.crearAnuncio=true;
    this.btnEditarGuardar="Guardar";

    this.ModeloAnuncio=new BioAnuncio();
    this.photoSelected=null;
    this.imgCodSelected=null;
    
  }

  /**Metodos de portada */
  ShowDivPortada(){
    this.HideDivs();
    this.getPortada();
    this.photoSelected=null;
    this.imgCodSelected=null;
    this.listPortada=true;

  }

  ShowDivCrearPortada(){
    this.HideDivs();
 
    this.ttlMntPortada="Crear Portada"
    this.crearPortada=true;
    this.btnEditarGuardar="Guardar";

    this.ModeloPortada=new BioPortada();
    this.photoSelected=null;
    this.imgCodSelected=null; 
  }


  /**Metodos de Emblema */
  ShowDivEmblema(){
    this.HideDivs();
    this.getEmblema();
    this.photoSelected=null;
    this.imgCodSelected=null;

    this.listEmblema=true;
  }

  ShowDivCrearEmblema(){
    this.HideDivs();
 
    this.ttlMntEmblema="Crear Emblema"
    this.crearEmblema=true;
    this.btnEditarGuardar="Guardar";

    this.objetoEmblema=new objEmblema();
    this.photoSelected=null;
    this.imgCodSelected=null;
    
  }

   /**Metodos de Imagen de perfil */
   ShowDivImgPfl(){
    this.HideDivs();
    this.getImgPfl();
    this.photoSelected=null;
    this.imgCodSelected=null;

    this.listImgPfl=true;
  }

  ShowDivCrearImgPfl(){
    this.HideDivs();
 
    this.ttlMntImgPfl="Crear Imagen para el perfil"
    this.crearImgPfl=true;
    this.btnEditarGuardar="Guardar";

    this.objetoImgPfl=new objImgPfl();
    this.photoSelected=null;
    this.imgCodSelected=null;
    
  }




  openDialogEliminarImg(imagen:GaleriaCol){
    const dialogRef =this.dialog.open(ConfirmDialogComponent,{
      width: '250px',
      data:' ¿ Seguro de eliminar ? ',
      
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res===true){       

        this.eliminarFoto(imagen);
      // this.DeshabilitarPerfil();//----------> En caso el cuadro de dialogo devuelva true llamara al metodo DeshabilitarPerfil()   
      }
      else{  
      }
    });   
  }

  openDialogEliminarAct(actividad: GetActividades){
    const dialogRef =this.dialog.open(ConfirmDialogComponent,{
      width: '250px',
      data:' ¿ Seguro de eliminar ? ',
      
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res===true){       

        this.EliminarActividad(actividad._id);
      
      }
      else{  
      }
    });   
  }

  openDialogEliminarNiv(bioNivel: GetBioNivel){
    const dialogRef =this.dialog.open(ConfirmDialogComponent,{
      width: '250px',
      data:' ¿ Seguro de eliminar ? ',
      
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res===true){       

        this.eliminarBioNivel(bioNivel._id);
      
      }
      else{  
      }
    });   
  }

  openDialogEliminarTaller(bioTaller: GetBioTaller){
    const dialogRef =this.dialog.open(ConfirmDialogComponent,{
      width: '250px',
      data:' ¿ Seguro de eliminar ? ',
      
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res===true){       

        this.eliminarBioTaller(bioTaller._id);
      
      }
      else{  
      }
    });   
  }

  openDialogEliminarInfraestructura(bioTaller: GetBioTaller){
    const dialogRef =this.dialog.open(ConfirmDialogComponent,{
      width: '250px',
      data:' ¿ Seguro de eliminar ? ',
      
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res===true){       

        this.eliminarBioInfraestructura(bioTaller._id);
      
      }
      else{  
      }
    });   
  }

  openDialogEliminarAnuncio(getBioAnuncio: GetBioAnuncio){
    const dialogRef =this.dialog.open(ConfirmDialogComponent,{
      width: '250px',
      data:' ¿ Seguro de eliminar ? ',
      
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res===true){       

        this.eliminarBioAnuncio(getBioAnuncio._id);
      
      }
      else{  
      }
    });   
  }

  openDialogEliminarPortada(getBioPortada: GetBioPortada){
    const dialogRef =this.dialog.open(ConfirmDialogComponent,{
      width: '250px',
      data:' ¿ Seguro de eliminar ? ',
      
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res===true){       

        this.eliminarBioPortada(getBioPortada._id);
      
      }
      else{  
      }
    });   
  }

  openModalImg(imagen: GaleriaCol){

      
    console.log(imagen);

    const dialogRef =this.dialog.open(ModalPerfilColegioComponent,{
      width: '500px',
      data: imagen,
      
    });

    dialogRef.afterClosed().subscribe(res=>{
      let getOpt=this.galeriaColService.optionModal;
      console.log(getOpt);
      if(getOpt=="editar"){
        this.preEditar(imagen);
      }
      else if(getOpt=="eliminar"){
        this.eliminarFoto(imagen)
      }
    });
  }

  openModalOptions(){

    const obj={
      option:"3",
      colCod:this.inputColCod
    };

    const dialogRef =this.dialog.open(ModalPerfilColegioComponent,{
      width: '500px',
      data: obj,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(res=>{
      const option= this.galeriaColService.optionModal;
      console.log("La opcion es :" +option);

      if(option=="qs"){
        console.log("entroa sss");
         this.ShowDivQuienesSomos()
      }
      else if(option=="li"){  this.ShowListarImagenes()}
      else if(option=="ac"){ this.ShowDivActividades()}
      else if(option=="ta"){ this.ShowDivTalleres()}
      else if(option=="ni"){ this.ShowDivNiveles()}
      else if(option=="in"){ this.ShowDivInfraestructura()}
      else if(option=="an"){ this.ShowDivAnuncio()}
      else if(option=="po"){ this.ShowDivPortada()}
      else if(option=="em"){ this.ShowDivEmblema()}
      else if(option=="ip"){ this.ShowDivImgPfl()}

    });
  }

  ModalMostrarImagenes(){

    const obj={
      option:"1",
      colCod:this.inputColCod
    };

    const dialogRef =this.dialog.open(ModalPerfilColegioComponent,{
      width: '800px',
      data: obj,    
    });

    dialogRef.afterClosed().subscribe(res=>{
      let imgSelected=this.galeriaColService.imgSelected;
      let ruta=imgSelected["colImgRta"];
      this.imgCodSelected=imgSelected["_id"];
      console.log(imgSelected);

      this.photoSelected=this.URL+ruta.toString();

    });
  }



  validarFrm():boolean{
    var trueOrFalse=false;

    if(this.ModeloGaleriaCol.colImgTtl==null||this.ModeloGaleriaCol.colImgTtl==undefined){
      trueOrFalse=true;
      M.toast({ html: 'Escriba un titulo para la imagen' });
    }
    else if(this.photoSelected==null||this.photoSelected==undefined){
      trueOrFalse=true;
      M.toast({ html: 'Seleccione la imagen' });
    }

    return trueOrFalse;
  }

  cargarTipoImagen(){
    console.log("GO");
    return this.tipoImagenService.getTipoImagen()
    .subscribe(res=>{

      this.arrayTipoImagen = res as TipoImagen[];
      this.arrayTipoImagen.unshift({
        _id:"seleccionar",
        tpoImgNom   :"- Tipo de imagen -",
        tpoImgDes   :"",  
        timestamp   :"",

      });

    

    })
  }

  cargarTipoImagenFlt(){
    return this.tipoImagenService.getTipoImagen()
    .subscribe(res=>{

      this.arrayTipoImagen = res as TipoImagen[];
      this.arrayTipoImagen.unshift({
        _id:"111",
        tpoImgNom   :"Todas las imagenes",
        tpoImgDes   :"",  
        timestamp   :"",

      });

    

    })
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
      console.log(this.file);
    }
  }

  uploadPhoto() {
    
    var trueOrFalse=this.validarFrm();
    console.log(trueOrFalse);
    if(trueOrFalse==false){
      if(this.btnEditarGuardar=="Guardar Imagen"){
        
        const titulo= ""+this.ModeloGaleriaCol.colImgTtl;
        const descripcion= ""+this.ModeloGaleriaCol.colImgDes;
        const tpoImgCod= ""+this.ModeloTipoImagen._id;
    
        this.galeriaColService.createFoto(titulo, descripcion, tpoImgCod ,this.file,this.inputColCod)
        .subscribe(
          res => {

          console.log(res); 
          var status=res["status"];

          if(status===200){
            this.HideDivs();
          
            this.ShowListarImagenes();
            this.portada.emit("ok");
            M.toast({ html: ' Se guargo la imagen ' });
          } 
          else if(status===519){
            M.toast({ html: ' Solo se permiten 10 portadas ' });
          }
          
          else if(status===520){
            M.toast({ html: ' Ya existe una foto de perfil ' });
          }

        });

      }else{
        this.ModeloGaleriaCol.tpoImgCod=this.ModeloTipoImagen._id;
        console.log(this.ModeloGaleriaCol);
        this.editarFoto(this.ModeloGaleriaCol);

      }
    }
    else{

    }   
  }

  getImgsFiltros(val:any){
    var tpoImgCod=val;
    console.log(tpoImgCod);

    var obj={
      tpoImgCod:tpoImgCod.toString(),
      colCod: this.inputColCod,
    }

    if(tpoImgCod=="5ed8390428519b089cb858c1"){
      console.log("0000000")
      this.divImgPfl=true;
      this.divCardImg=false;
    }
    else{
      console.log("12355")
      this.divImgPfl=false;
      this.divCardImg=true;
    }

    return this.galeriaColService.getImgsFiltros(obj)
    .subscribe(res=>{
      this.arrayImagenes=res as GaleriaCol[];




    })
  }

  getFotos(){
    this.galeriaColService.GetFotos(this.inputColCod)
    .subscribe(res=>{
      this.arrayImagenes=res as GaleriaCol[];
      console.log(this.arrayImagenes);
    });
  }
 
  preEditar(imagen:GaleriaCol){
    this.cargarTipoImagen();
    this.ModeloTipoImagen._id=imagen.tpoImgCod;
    this.ModeloGaleriaCol.colImgTtl=imagen.colImgTtl;
    this.ModeloGaleriaCol.colImgDes=imagen.colImgDes;
    this.ModeloGaleriaCol._id=imagen._id;
    this.photoSelected=this.URL+imagen.colImgRta.toString();
    console.log(this.photoSelected);
    this.HideDivs();
    this.divSubirImg=true;
    this.btnEditarGuardar="Editar Imagen";
    this.modEditImg=true;
    this.modCreartImg=false;
  }

  editarFoto(imagen:GaleriaCol){
    return this.galeriaColService.editFoto(imagen)
    .subscribe(res=>{
      console.log(res)

      console.log(res); 
          var status=res["status"];

          if(status===200){
            M.toast({ html: ' Se edito la imagen ' });
            this.portada.emit("ok");
            this.HideDivs();
            this.divListarImgs=true;
            this.btnEditarGuardar="Guardar Imagen";
            this.limpiar();
            this.ShowListarImagenes();
          }
          else if(status===519){
            M.toast({ html: ' Solo se permiten 10 portadas ' });
          }
          else if(status===520){
            M.toast({ html: ' Ya existe una foto de perfil ' });
          }

    });
  }

  eliminarFoto(imagen:GaleriaCol){
    return this.galeriaColService.eliminarFoto(imagen._id, imagen.colCod)
    .subscribe(res=>{

      console.log(res)
      var status=res["status"];

      if(status===200){
        M.toast({ html: "Se elimino la imagen correctamente"});
        this.getFotos();
      }
      else if(status===410){

        let msg=res["msg"]

        M.toast({ html: msg});
      }
      
    });
  }
  
  limpiar(){
    this.photoSelected=null;
    this.ModeloGaleriaCol= new GaleriaCol();
    this.ModeloInfraestructura=new BioInfraestructura();
  }

  

  cancelar(opcion:string){
    this.HideDivs();
    this.limpiar();
    console.log(opcion);


    if(opcion=="in"){
      this.ShowDivInfraestructura();
    }
    else if(opcion=="qs"){
      this.ShowDivQuienesSomos();
    }
    else if(opcion=="ac"){
      this.ShowDivActividades();
    }
    else if(opcion=="ni"){
      this.ShowDivNiveles();
    }
    else if(opcion=="an"){
      this.ShowDivAnuncio();
    }
    else if(opcion=="po"){
      this.ShowDivPortada();
    }
    else if(opcion=="ip"){
      this.ShowDivPortada();
    }
    else{
      this.ShowListarImagenes();
    }
    
    
  }

  /** Biografia**/


  /** Quienes Somos */
  validarFrmQs():boolean{
    
    var trueOrFalse=false;

    if(this.ModeloQuienesSomos.qsTtl=="Tipo de apartado"){
      M.toast({ html: 'Elija un tipo de apartado' });
      trueOrFalse=true;
    }
    else if(this.ModeloQuienesSomos.qsDes==null||this.ModeloQuienesSomos.qsDes==undefined||this.ModeloQuienesSomos.qsDes==""){
      M.toast({ html: 'Ingrese la descripcion' });
      trueOrFalse=true;
    }
    else if(this.ModeloQuienesSomos.imgCod==null||this.ModeloQuienesSomos.imgCod==undefined){
      M.toast({ html: 'Elija una imagen' });
      trueOrFalse=true;
    }
    else if(this.ModeloQuienesSomos.colCod==null||this.ModeloQuienesSomos.colCod==undefined){
      M.toast({ html: 'No se pudo capturar el colegio' });
      trueOrFalse=true;
    }   
    return trueOrFalse;
  }

  postQuienesSomos(){

    this.ModeloQuienesSomos.qsTtl=this.ModeloQsOptions.name
    this.ModeloQuienesSomos.colCod=this.inputColCod;
    this.ModeloQuienesSomos.imgCod=this.imgCodSelected;
    if(this.validarFrmQs()==true){

    }
    else{
      if(this.ModeloQuienesSomos._id){
        return this.biografiaService.putQuienesSomos(this.ModeloQuienesSomos)
        .subscribe(res=>{

          var status=res["status"];
          if(status==510){
            M.toast({ html: 'Error al editar' });
          }
          else if(status==200){
            M.toast({ html: 'Se edito el apartado' });
            this.ModeloQuienesSomos=new QuienesSomos();
            this.HideDivs();
            this.getQuienesSomos();
            this.listQuienesSomos=true;
          } 
        });
      }
      else{
        return this.biografiaService.postQuienesSomos(this.ModeloQuienesSomos)
        .subscribe(res=>{

          var status=res["status"];
          if(status==510){
            M.toast({ html: 'Ya existe este tipo de apartado' });
          }
          else if(status==200){
            M.toast({ html: 'Se registro el apartado' });
            this.ModeloQuienesSomos=new QuienesSomos();
            this.HideDivs();
            this.getQuienesSomos();
            this.listQuienesSomos=true;
          } 
        });
      }
    } 
  }

  getQuienesSomos(){
  
    return this.biografiaService.getQuienesSomos(this.inputColCod)
    .subscribe(res=>{
      this.arrayQuienesSomos= res as GetQuienesSomos[];

      for(let i=0;i<this.arrayQuienesSomos.length;i++){
        if(this.arrayQuienesSomos[i].qsTtl=="Misión"){
          this.objMision=this.arrayQuienesSomos[i]
          this.ModeloQuienesSomos.qsDes=this.objMision["qsDes"];
          this.divMision=true;
          console.log(this.objMision);
        }
        else if(this.arrayQuienesSomos[i].qsTtl=="Visión"){
          this.objVision=this.arrayQuienesSomos[i]
          this.divVision=true;
        }
        else if(this.arrayQuienesSomos[i].qsTtl=="Valores"){
          this.objValores=this.arrayQuienesSomos[i]
          this.divValores=true;
        }
      }

      
      console.log(this.arrayQuienesSomos);
    });
  }

  EditarQs(obj:object){
    this.btnEditarGuardar="Editar";
    
    this.ModeloQuienesSomos._id=obj["_id"];
    this.ModeloQuienesSomos.qsTtl=obj["qsTtl"];
    this.ModeloQuienesSomos.qsDes=obj["qsDes"];
    this.ModeloQuienesSomos.colCod=this.inputColCod
    this.ModeloQsOptions.name=obj["qsTtl"].toString();
    this.ModeloQuienesSomos.imgCod=obj["imgCod"]._id;
    this.imgCodSelected=obj["imgCod"]._id;
    const ruta=obj["imgCod"].colImgRta;
    
    this.photoSelected=this.URL+ruta.toString();
    this.HideDivs();
    this.matSelectTpoApart=true;

    this.crearQuienesSomos=true;
  }


  /**Actividades */
  validarFrmAct():boolean{
    
    var trueOrFalse=false;

    if(this.ModeloActividad.actTtl==""||this.ModeloActividad.actTtl==undefined||this.ModeloActividad.actTtl==null){
      M.toast({ html: 'Ingrese un titulo para la actividad' });
      trueOrFalse=true;
    }
    else if(this.ModeloActividad.actDes==""||this.ModeloActividad.actDes==undefined||this.ModeloActividad.actDes==null){
      M.toast({ html: 'Ingrese una descripcion' });
      trueOrFalse=true;
    }
    else if(this.ModeloActividad.imgCod==null||this.ModeloActividad.imgCod==undefined){
      M.toast({ html: 'Elija una imagen' });
      trueOrFalse=true;
    }
    else if(this.ModeloActividad.colCod==null||this.ModeloActividad.colCod==undefined){
      M.toast({ html: 'No se pudo capturar el colegio' });
      trueOrFalse=true;
    }   
    return trueOrFalse;
  }

  postActividades(){

    if(this.opcionActividad=="crear"){
      this.ModeloActividad.actTpo="1";
    }
    else if(this.opcionActividad=="asociar"){
      this.ModeloActividad.actTpo="0";
    }
    
    this.ModeloActividad.imgCod=this.imgCodSelected;
    this.ModeloActividad.colCod=this.inputColCod;   
    if(this.validarFrmAct()==true){

    }
    else{
      
  
      if(this.ModeloActividad._id){
        return this.biografiaService.putActividad(this.ModeloActividad)
        .subscribe(res=>{
          var status=res["status"];
            if(status==510){
              M.toast({ html: 'Error al editar' });
            }
            else if(status==200){
              M.toast({ html: 'Se edito el apartado' });
              this.ModeloActividad=new Actividades();
              this.HideDivs();
              this.getActividad();
              this.listActividades=true;
            } 
        })
      }
      else{
        return this.biografiaService.postActividad(this.ModeloActividad)
        .subscribe(res=>{
          var status=res["status"];
            if(status==510){
              M.toast({ html: 'Error al registrar' });
            }
            else if(status==200){
              M.toast({ html: 'Se registro la actividad' });
              this.ModeloActividad=new Actividades();
              this.HideDivs();
              this.getActividad();
              this.listActividades=true;
            } 
        })
      }
    }
  
  }

  EditarActividad(actividad: GetActividades){
    this.HideDivs();
    this.btnEditarGuardar="Editar";
    this.ModeloActividad._id=actividad._id;
    this.ModeloActividad.actTtl=actividad.actTtl;
    this.ModeloActividad.actDes=actividad.actDes;
    this.ModeloActividad.imgCod=actividad.imgCod._id;
    this.imgCodSelected=actividad.imgCod._id;
    const ruta=actividad.imgCod.colImgRta;
  
    this.photoSelected=this.URL+ruta.toString();
    this.ModeloActividad.colCod=actividad.colCod;
    this.crearActividades=true;
  }

  getActividad(){
    let actTpo="1"
    return this.biografiaService.getActividades(this.inputColCod,actTpo)
    .subscribe(res=>{
      this.arrayActividades=res as GetActividades[];
      this.encabezadoActividadTf=false;
    });
  }

  ListarActividades(){
    let actTpo1="1"
    this.biografiaService.getActividades(this.inputColCod,actTpo1)
    .subscribe(res=>{
      this.arrayActividades=res as GetActividades[];
      this.encabezadoActividad=this.arrayActividades[0].actDes;
      this.encabezadoActividadArreglo=this.arrayActividades[0];
      this.encabezadoActividadTf=true;
      console.log(this.encabezadoActividadArreglo);

      let actTpo0="0"
      this.biografiaService.getActividades(this.inputColCod,actTpo0)
      .subscribe(res=>{
        this.arrayActividades=res as GetActividades[];
      });
    });
  }

  EliminarActividad(_id:string){
    return this.biografiaService.removeActividad(_id)
    .subscribe(res=>{
      var status=res["status"];
          if(status==200){
            M.toast({ html: 'Actividad eliminada' });
            this.ModeloActividad=new Actividades();
            this.HideDivs();
            this.getActividad();
            this.listActividades=true;
          }
          else{
            M.toast({ html: 'Error al eliminar' });
           
          } 
    })
  }

  /***Niveles */
  validarFrmNiv():boolean{
    
    var trueOrFalse=false;

    if(this.ModeloNivel.nivTtl=="Elija un nivel"||this.ModeloNivel.nivTtl==undefined||this.ModeloNivel.nivTtl==null){
      M.toast({ html: 'Ingrese un titulo'});
      trueOrFalse=true;
    }
    else if(this.ModeloNivel.nivDes==""||this.ModeloNivel.nivDes==undefined||this.ModeloNivel.nivDes==null){
      M.toast({ html: 'Ingrese una descripcion' });
      trueOrFalse=true;
    }
    else if(this.ModeloNivel.imgCod==null||this.ModeloNivel.imgCod==undefined){
      M.toast({ html: 'Elija una imagen' });
      trueOrFalse=true;
    }
    else if(this.ModeloNivel.colCod==null||this.ModeloNivel.colCod==undefined){
      M.toast({ html: 'No se pudo capturar el colegio' });
      trueOrFalse=true;
    }   
    return trueOrFalse;
  }

  postNivel(){ //Crear un nuevo nivel
    if(this.opcionNivel=="crear"){
      this.ModeloNivel.nivTpo="1";
      this.ModeloNivel.nivTtl=this.ModeloNivelTpo.name
    }
    else if(this.opcionNivel=="asociar"){
      this.ModeloNivel.nivTpo="0";
      this.ModeloNivel.nivTtl=this.ModeloMatSltNiv.nivTtl;
    }
    this.ModeloNivel.imgCod=this.imgCodSelected;
    this.ModeloNivel.colCod=this.inputColCod;   

    if(this.validarFrmNiv()==true){
    }
    else{

      if(this.ModeloNivel._id){

        return this.biografiaService.putNivel(this.ModeloNivel)
        .subscribe(res=>{
          var status=res["status"];
          if(status==510){
            M.toast({ html: 'Error al editar' });
          }
          else if(status==200){
            M.toast({ html: 'Se edito correctamente' });
            this.ModeloNivel=new BioNiveles();
            this.HideDivs();
            this.getNivel();
            
            this.listNiveles=true;
           
            this.btnGuardarEditar="Guardar"
          } 
        });
     

      }
      else{

        return this.biografiaService.postNivel(this.ModeloNivel)
        .subscribe(res=>{
          var status=res["status"];
          if(status==510){
            M.toast({ html: 'Error al registrar' });
          }
          else if(status==200){
            M.toast({ html: 'Se registro correctamente' });
            this.ModeloNivel=new BioNiveles();
            this.HideDivs();
            this.getNivel();
            this.listNiveles=true;
            this.btnGuardarEditar="Guardar"
          } 
        });
      }
    } 
  }

  EditarNivel(Nivel:GetBioNivel){

    this.opcionNivel="crear";

    this.HideDivs();
    this.crearNiveles=true;
    this.ttlMntNivel="Editar Nivel";
    this.btnEditarGuardar="Editar";
    this.ModeloNivel._id=Nivel._id;
    this.ModeloNivelTpo.name=Nivel.nivTtl;
    this.ModeloNivel.nivDes=Nivel.nivDes;
    this.ModeloNivel.colCod=this.inputColCod;
    this.ModeloNivel.nivTpo=Nivel.nivTpo;
    this.imgCodSelected=Nivel.imgCod._id;
    const ruta=Nivel.imgCod.colImgRta;
    this.matSelectNivTpo=true;
  
    this.photoSelected=this.URL+ruta.toString();
  
  
  }

  EditarNivelImg(Nivel:GetBioNivel){

    this.opcionNivel="asociar";

    this.HideDivs();
    this.asociarImgNiv=true;
    this.ttlMntNivel="Editar imagen asociada";
    this.btnEditarGuardar="Editar";
    this.ModeloNivel._id=Nivel._id;
    this.ModeloMatSltNiv.nivTtl=Nivel.nivTtl;
    this.ModeloNivel.nivDes=Nivel.nivDes;
    this.ModeloNivel.colCod=this.inputColCod;
    this.ModeloNivel.nivTpo=Nivel.nivTpo;
    this.imgCodSelected=Nivel.imgCod._id;
    const ruta=Nivel.imgCod.colImgRta;
    this.matSelectNivTpo=true;
 
    this.photoSelected=this.URL+ruta.toString();
  
  
  }

  getNivel(){
    const nivOpt1="1"
    this.matSelectNivTpo=false;
    this.biografiaService.getNivel(this.inputColCod,nivOpt1)
    .subscribe(res=>{
      //this.encabezadoNivel=res[0]["nivDes"];
      this.arrayNivMaestro=res as GetBioNivel[];
      this.arrayNiveles= res as GetBioNivel[];
      var nivel = {};
        this.MatselectNivel = this.arrayNivMaestro.filter(function (e) { 
            return nivel[e.nivTtl] ? false : (nivel[e.nivTtl] = true);
        });
        
        this.MatselectNivel.unshift({
          estCod: "string",
          _id: "string",
          nivTpo: "string",
          nivTtl: "Seleccione nivel",
          nivDes: "string",
          imgCod: {
              estCod: "string",
              _id: "string",
              colImgTtl: "string",
              colImgDes: "string",
              colImgRta: "string",
              colImgOrgNom: "string",
              colImgTpoAch: "string",
              colImgTmñ: "string",
              tpoImgCod: "string",
              colCod: "string",
              timestamp: "string",
              __v: 0
          },
          colCod: "string",
          timestamp: "string",
          __v: 0
      });
      this.ModeloMatSltNiv.nivTtl="Seleccione nivel";
    });


  }

  getNivelImgs(nivel: GetBioNivel){
    this.matSelectNivTpo=false;
    const nivOpt0="0"
    this.HideDivs();
    this.listNivelImgs=true;

    this.biografiaService.getNivelSgnNiv(this.inputColCod,nivOpt0,nivel.nivTtl)
    .subscribe(res=>{
      this.encabezadoNivel=nivel.nivDes;
      this.encabezadoNivelArreglo=nivel;
      this.ttlListNivImgs=nivel.nivTtl;
      this.arrayNiveles= res as GetBioNivel[];
      
    });

    

  }

  eliminarBioNivel(_id:string){
    this.biografiaService.deleteNivel(_id)
    .subscribe(res=>{
      var status=res["status"];
          if(status==510){
            M.toast({ html: 'Error al eliminar' });
          }
          else if(status==200){
            M.toast({ html: 'Se elimino correctamente' });
            this.ModeloNivel=new BioNiveles();
            this.HideDivs();
            this.getNivel();
            this.listNiveles=true;
            this.btnGuardarEditar="Guardar"
          } 
    })
  }

  /***Taller */
  validarFrmTal():boolean{
    
    var trueOrFalse=false;

    if(this.ModeloTaller.talTtl==""||this.ModeloTaller.talTtl==undefined||this.ModeloTaller.talTtl==null){
      M.toast({ html: 'Ingrese un titulo'});
      trueOrFalse=true;
    }
    else if(this.ModeloTaller.talDes==""||this.ModeloTaller.talDes==undefined||this.ModeloTaller.talDes==null){
      M.toast({ html: 'Ingrese una descripcion' });
      trueOrFalse=true;
    }
    else if(this.ModeloTaller.imgCod==null||this.ModeloTaller.imgCod==undefined){
      M.toast({ html: 'Elija una imagen' });
      trueOrFalse=true;
    }
    else if(this.ModeloTaller.colCod==null||this.ModeloTaller.colCod==undefined){
      M.toast({ html: 'No se pudo capturar el colegio' });
      trueOrFalse=true;
    }   
    return trueOrFalse;
  }  

  postTaller(){

    if(this.opcionTaller=="crear"){
      this.ModeloTaller.talTpo="1";
    }
    else if(this.opcionTaller=="asociar"){
      this.ModeloTaller.talTpo="0";
    }

    this.ModeloTaller.imgCod=this.imgCodSelected;
    this.ModeloTaller.colCod=this.inputColCod;

    if(this.validarFrmTal()==true){

    }
    else{
      if(this.ModeloTaller._id){
        this.biografiaService.putTaller(this.ModeloTaller)
        .subscribe(res=>{
    
          var status=res["status"];
          if(status==510){
            M.toast({ html: 'Error al editar' });
          }
          else if(status==200){
            M.toast({ html: 'Se edito correctamente' });
            this.ModeloTaller=new BioTaller();
            this.HideDivs();
            this.getTaller();
            
            this.listTalleres=true;
           
            this.btnGuardarEditar="Guardar"
          } 
        })
      }
      else{
        this.biografiaService.postTaller(this.ModeloTaller)
        .subscribe(res=>{
    
          var status=res["status"];
          if(status==510){
            M.toast({ html: 'Error al registrar' });
          }
          else if(status==200){
            M.toast({ html: 'Se registro correctamente' });
            this.ModeloTaller=new BioTaller();
            this.HideDivs();
            
            this.getTaller();
            this.listTalleres=true;
           
            this.btnGuardarEditar="Guardar"
          } 
        })
      }

    }

    

    
 
  }

  getTaller(){
    let talOpt1="1"
    this.biografiaService.getTaller(this.inputColCod,talOpt1)
    .subscribe(res=>{
      this.arrayTaller=res as GetBioTaller[];
      this.encabezadoTallerTf=false;
      console.log(this.arrayTaller);
    });
  }

  ListarTalleres(){
    let talOpt1="1"
    this.biografiaService.getTaller(this.inputColCod,talOpt1)
    .subscribe(res=>{
      this.arrayTaller=res as GetBioTaller[];
      this.encabezadoTallerArreglo=this.arrayTaller[0];
      this.encabezadoTallerTf=true;

      let talOpt0="0"
      this.biografiaService.getTaller(this.inputColCod,talOpt0)
      .subscribe(res=>{
        this.arrayTaller=res as GetBioTaller[];
      });
    });

    


  }

  EditarTaller(taller:GetBioTaller){
    this.HideDivs();
    this.crearTalleres=true;
    this.ttlMntTaller="Editar Taller";
    this.btnEditarGuardar="Editar";
    this.ModeloTaller._id=taller._id;
    this.ModeloTaller.talDes=taller.talDes;
    this.ModeloTaller.talTtl=taller.talTtl;
    this.ModeloTaller.colCod=this.inputColCod;
    this.ModeloTaller.talTpo=taller.talTpo;
    this.imgCodSelected=taller.imgCod._id;
    const ruta=taller.imgCod.colImgRta;
    this.matSelectNivTpo=true;
  
    this.photoSelected=this.URL+ruta.toString();
  }

  eliminarBioTaller(_id:string){
    this.biografiaService.deleteTaller(_id)
    .subscribe(res=>{
        var status=res["status"];
        if(status==510){
          M.toast({ html: 'Error al eliminar' });
        }
        else if(status==200){
          M.toast({ html: 'Se elimino correctamente' });
          this.ModeloTaller=new BioTaller();
          this.HideDivs();
          this.getTaller();
          this.listTalleres=true;
          this.btnGuardarEditar="Guardar"
        } 
    })
  }

  /**Infraestructura */
  validarFrmInf():boolean{
    
    var trueOrFalse=false;

    if(this.ModeloInfraestructura.infTtl==""||this.ModeloInfraestructura.infTtl==undefined||this.ModeloInfraestructura.infTtl==null){
      M.toast({ html: 'Ingrese un titulo'});
      trueOrFalse=true;
    }
    else if(this.ModeloInfraestructura.infDes==""||this.ModeloInfraestructura.infDes==undefined||this.ModeloInfraestructura.infDes==null){
      M.toast({ html: 'Ingrese una descripcion' });
      trueOrFalse=true;
    }
    else if(this.ModeloInfraestructura.imgCod==null||this.ModeloInfraestructura.imgCod==undefined){
      M.toast({ html: 'Elija una imagen' });
      trueOrFalse=true;
    }
    else if(this.ModeloInfraestructura.colCod==null||this.ModeloInfraestructura.colCod==undefined){
      M.toast({ html: 'No se pudo capturar el colegio' });
      trueOrFalse=true;
    }   
    return trueOrFalse;
  }  

  postInfraestructura(){

    if(this.opcionInfraestructura=="crear"){
      this.ModeloInfraestructura.infTpo="1";
    }
    else if(this.opcionInfraestructura=="asociar"){
      this.ModeloInfraestructura.infTpo="0";
    }

    this.ModeloInfraestructura.colCod=this.inputColCod;
    this.ModeloInfraestructura.imgCod=this.imgCodSelected;
    if(this.validarFrmInf()==true){

    }
    else{
      if(this.ModeloInfraestructura._id){
        this.biografiaService.putInfraestructura(this.ModeloInfraestructura)
        .subscribe(res=>{
    
          var status=res["status"];
          if(status==510){
            M.toast({ html: 'Error al editar' });
          }
          else if(status==200){
            M.toast({ html: 'Se edito correctamente' });
            this.ModeloInfraestructura=new BioInfraestructura();
            this.HideDivs();
            this.getInfraestructura();
            this.listInfraestructura=true;
            this.btnGuardarEditar="Guardar"
          } 
        })
      }
      else{
        this.biografiaService.postInfraestructura(this.ModeloInfraestructura)
        .subscribe(res=>{
    
          var status=res["status"];
          if(status==510){
            M.toast({ html: 'Error al registrar' });
          }
          else if(status==200){
            M.toast({ html: 'Se registro correctamente' });
            this.ModeloInfraestructura=new BioInfraestructura();
            this.HideDivs();
            this.getInfraestructura();
            this.listInfraestructura=true;
            this.btnGuardarEditar="Guardar"
          } 
        })
      }
    } 
  } 

  getInfraestructura(){
    let infTpo1="1"
    this.biografiaService.getInfraestructura(this.inputColCod,infTpo1)
    .subscribe(res=>{
      this.arrayInfraestructura=res as GetBioInfraestructura[];
      
      this.encabezadoInfraestructuraTf=false;
      console.log(this.arrayTaller);
    });
  }

  ListarInfraestructura(){
    let infTpo1="1"
    this.biografiaService.getInfraestructura(this.inputColCod,infTpo1)
    .subscribe(res=>{
      this.arrayInfraestructura=res as GetBioInfraestructura[];
      this.encabezadoInfraestructura=this.arrayInfraestructura[0].infDes;
      this.encabezadoInfraestructuraArreglo=this.arrayInfraestructura[0];
      this.encabezadoInfraestructuraTf=true;
      
      let infTpo0="0"
      this.biografiaService.getInfraestructura(this.inputColCod,infTpo0)
      .subscribe(res=>{
        this.arrayInfraestructura=res as GetBioInfraestructura[];
      });
    });

    

  }

  EditarInfraestructura(infraestructura: GetBioInfraestructura){
    this.HideDivs();
    this.crearInfraestructura=true;
    this.ttlMntInfraestructura="Editar Infraestructura";
    this.btnEditarGuardar="Editar";
    this.ModeloInfraestructura._id=infraestructura._id;
    this.ModeloInfraestructura.infDes=infraestructura.infDes;
    this.ModeloInfraestructura.infTtl=infraestructura.infTtl;
    this.ModeloInfraestructura.colCod=this.inputColCod;
    this.ModeloInfraestructura.infTpo=infraestructura.infTpo;
    this.imgCodSelected=infraestructura.imgCod._id;
    const ruta=infraestructura.imgCod.colImgRta;
  
    this.photoSelected=this.URL+ruta.toString();
  }

  eliminarBioInfraestructura(_id:string){
    this.biografiaService.deleteInfraestructura(_id)
    .subscribe(res=>{
        var status=res["status"];
        if(status==510){
          M.toast({ html: 'Error al eliminar' });
        }
        else if(status==200){
          M.toast({ html: 'Se elimino correctamente' });
          this.ModeloInfraestructura=new BioInfraestructura();
          this.HideDivs();
          this.getInfraestructura();
          this.listInfraestructura=true;
          this.btnGuardarEditar="Guardar"
        } 
    })
  }

  /** Anuncios */
  validarFrmAnu():boolean{
    
    var trueOrFalse=false;

    if(this.ModeloAnuncio.imgCod==null||this.ModeloAnuncio.imgCod==undefined){
      M.toast({ html: 'Elija una imagen' });
      trueOrFalse=true;
    }
    else if(this.ModeloAnuncio.colCod==null||this.ModeloAnuncio.colCod==undefined){
      M.toast({ html: 'No se pudo capturar el colegio' });
      trueOrFalse=true;
    }   
    return trueOrFalse;
  }  

  postAnuncio(){
    this.ModeloAnuncio.colCod=this.inputColCod;
    this.ModeloAnuncio.imgCod=this.imgCodSelected;
    if(this.validarFrmAnu()==true){

    }
    else{
      if(this.ModeloAnuncio._id){
        this.biografiaService.putAnuncio(this.ModeloAnuncio)
        .subscribe(res=>{
    
          var status=res["status"];
          if(status==510){
            M.toast({ html: 'Error al editar' });
          }
          else if(status==200){
            M.toast({ html: 'Se edito correctamente' });
            this.ModeloAnuncio=new BioAnuncio();
            this.HideDivs();
            this.getAnuncios();
            this.listAnuncios=true;
            this.btnEditarGuardar="Guardar"
          } 
        })
      }
      else{
        this.biografiaService.postAnuncio(this.ModeloAnuncio)
        .subscribe(res=>{
    
          var status=res["status"];
          if(status==408){
            var status=res["status"];
            if(status==408){
            let msg=res["msg"]
            M.toast({ html: msg });
          }
          }
          else if(status==200){
            M.toast({ html: 'Se registro correctamente' });
            this.ModeloAnuncio=new BioAnuncio();
            this.HideDivs();
            this.getAnuncios();
            this.listAnuncios=true;
            this.btnEditarGuardar="Guardar"
          } 
        })
      }
    } 
  } 

  getAnuncios(){
    this.biografiaService.getAnuncios(this.inputColCod)
    .subscribe(res=>{
      this.arrayAnuncio=res as GetBioAnuncio[];
      console.log(this.arrayAnuncio);
    });
  }

  EditarAnuncio(getBioAnuncio: GetBioAnuncio){
    this.HideDivs();
    this.crearAnuncio=true;
    this.ttlMntAnuncio="Editar Anuncio";
    this.btnEditarGuardar="Editar";
    this.ModeloAnuncio._id=getBioAnuncio._id;
    this.ModeloAnuncio.colCod=this.inputColCod;
    this.imgCodSelected=getBioAnuncio.imgCod._id;
    const ruta=getBioAnuncio.imgCod.colImgRta;
  
    this.photoSelected=this.URL+ruta.toString();
  }

  eliminarBioAnuncio(_id:string){
    this.biografiaService.deleteAnuncio(_id)
    .subscribe(res=>{
        var status=res["status"];
        if(status==510){
          M.toast({ html: 'Error al eliminar' });
        }
        else if(status==200){
          M.toast({ html: 'Se elimino correctamente' });
          this.ModeloAnuncio=new BioAnuncio();
          this.HideDivs();
          this.getAnuncios();
          this.listAnuncios=true;
          this.btnGuardarEditar="Guardar"
        } 
    })
  }

  /** Portada */
  validarFrmPrt():boolean{
    
    var trueOrFalse=false;

    if(this.ModeloPortada.imgCod==null||this.ModeloPortada.imgCod==undefined){
      M.toast({ html: 'Elija una imagen' });
      trueOrFalse=true;
    }
    else if(this.ModeloPortada.colCod==null||this.ModeloPortada.colCod==undefined){
      M.toast({ html: 'No se pudo capturar el colegio' });
      trueOrFalse=true;
    }   
    return trueOrFalse;
  }  

  postPortada(){
    this.ModeloPortada.colCod=this.inputColCod;
    this.ModeloPortada.imgCod=this.imgCodSelected;
    if(this.validarFrmPrt()==true){

    }
    else{
      if(this.ModeloPortada._id){
        this.biografiaService.putPortada(this.ModeloPortada)
        .subscribe(res=>{
          console.log(res);
          var status=res["status"];
          if(status==510){
            
            M.toast({ html: "Error al editar" });
          }
          else if(status==200){
            M.toast({ html: 'Se edito correctamente' });
            this.ModeloPortada=new BioPortada();
            this.HideDivs();
            this.getPortada();
            this.listPortada=true;
            this.btnGuardarEditar="Guardar"
          } 
        })
      }
      else{
        this.biografiaService.postPortada(this.ModeloPortada)
        .subscribe(res=>{
    
          var status=res["status"];
          if(status==408){
            let msg=res["msg"]
            M.toast({ html: msg });
          }
          else if(status==200){
            M.toast({ html: 'Se registro correctamente' });
            this.ModeloPortada=new BioPortada();
            this.HideDivs();
            this.getPortada();
            this.listPortada=true;
            this.btnGuardarEditar="Guardar"
          } 
        })
      }
    } 
  } 

  getPortada(){
    this.biografiaService.getPortadas(this.inputColCod)
    .subscribe(res=>{
      this.arrayPortada=res as GetBioPortada[];
      console.log(this.arrayPortada);
    });
  }

  EditarPortada(getBioPortada: GetBioPortada){
    this.HideDivs();
    this.crearPortada=true;
    this.ttlMntPortada="Editar portada";
    this.btnEditarGuardar="Editar";
    this.ModeloPortada._id=getBioPortada._id;
    this.ModeloPortada.colCod=this.inputColCod;
    this.imgCodSelected=getBioPortada.imgCod._id;
    const ruta=getBioPortada.imgCod.colImgRta;
  
    this.photoSelected=this.URL+ruta.toString();
  }

  eliminarBioPortada(_id:string){
    this.biografiaService.deletePortada(_id)
    .subscribe(res=>{
        var status=res["status"];
        if(status==510){
          M.toast({ html: 'Error al eliminar' });
        }
        else if(status==200){
          M.toast({ html: 'Se elimino correctamente' });
          this.ModeloPortada=new BioPortada();
          this.HideDivs();
          this.getPortada();
          this.listPortada=true;
          this.btnGuardarEditar="Guardar"
        } 
    })
  }

  /** Emblema */
  validarFrmEmb():boolean{
    
    var trueOrFalse=false;

    if(this.objetoEmblema.colImgEmb==null||this.objetoEmblema.colImgEmb==undefined){
      M.toast({ html: 'Elija una imagen' });
      trueOrFalse=true;
    }
    else if(this.objetoEmblema.colCod==null||this.objetoEmblema.colCod==undefined){
      M.toast({ html: 'No se pudo capturar el colegio' });
      trueOrFalse=true;
    }   
    return trueOrFalse;
  }  

  postEmblema(){
    this.objetoEmblema.colImgEmb=this.imgCodSelected;
    this.objetoEmblema.colCod=this.inputColCod;
    if(this.validarFrmEmb()==true){
    }
    else{

      if(this.ttlMntEmblema=="Editar Emblema"){
        this.biografiaService.putEmblema(this.objetoEmblema)
        .subscribe(res=>{

          var status=res["status"];
          if(status==200){
            M.toast({ html: 'Se edito correctamente' });
            this.HideDivs()
            this.getEmblema();
            this.listEmblema=true;
          }
        })
      }
      else{
        this.biografiaService.addEmblema(this.objetoEmblema)
        .subscribe(res=>{
    
          var status=res["status"];
          var status=res["status"];
          if(status==200){
            M.toast({ html: 'Se guardo el emblema' });
            this.HideDivs()
            this.getEmblema();
            this.listEmblema=true;
          }
        })  
      }  

    } 
  } 

  getEmblema(){
    this.biografiaService.getEmblema(this.inputColCod)
    .subscribe(res=>{
      console.log(res);
      this.arrayEmblema=res as getObjEmblema[];
    })
  }

  EditarEmblema(getObjEmblema: getObjEmblema){
    this.HideDivs();
    this.crearEmblema=true;
    this.ttlMntEmblema="Editar Emblema";
    this.btnEditarGuardar="Editar";
    this.objetoEmblema.colCod=getObjEmblema._id;
    this.imgCodSelected=getObjEmblema.colImgEmb._id;
    const ruta=getObjEmblema.colImgEmb.colImgRta;
  
    this.photoSelected=this.URL+ruta.toString();
  }

  /** Imagen de perfil del colegio */
  validarFrmImgPfl():boolean{
    
    var trueOrFalse=false;

    if(this.objetoImgPfl.colImgPfl==null||this.objetoImgPfl.colImgPfl==undefined){
      M.toast({ html: 'Elija una imagen' });
      trueOrFalse=true;
    }
    else if(this.objetoImgPfl.colCod==null||this.objetoImgPfl.colCod==undefined){
      M.toast({ html: 'No se pudo capturar el colegio' });
      trueOrFalse=true;
    }   
    return trueOrFalse;
  }  

  postImgPfl(){
    this.objetoImgPfl.colImgPfl=this.imgCodSelected;
    this.objetoImgPfl.colCod=this.inputColCod;
    if(this.validarFrmImgPfl()==true){
    }
    else{

      if(this.ttlMntImgPfl=="Editar Emblema"){
        this.biografiaService.putImgPfl(this.objetoImgPfl)
        .subscribe(res=>{

          var status=res["status"];
          if(status==200){
            M.toast({ html: 'Se edito correctamente' });
            this.HideDivs()
            this.getImgPfl();
            this.listImgPfl=true;
          }
        })
      }
      else{
        this.biografiaService.addImgPfl(this.objetoImgPfl)
        .subscribe(res=>{
    
          var status=res["status"];
          var status=res["status"];
          if(status==200){
            M.toast({ html: 'Se guardo el emblema' });
            this.HideDivs()
            this.getImgPfl();
            this.listImgPfl=true;
          }
        })  
      }  

    } 
  } 

  getImgPfl(){
    this.biografiaService.getImgPfl(this.inputColCod)
    .subscribe(res=>{
      console.log(res);
      this.arrayImgPfl=res as getObjImgPfl[];
    })
  }

  EditarImgPfl(getObjImgPfl: getObjImgPfl){
    this.HideDivs();
    this.crearImgPfl=true;
    this.ttlMntImgPfl="Editar imagen de perfil";
    this.btnEditarGuardar="Editar";
    this.objetoImgPfl.colCod=getObjImgPfl._id;
    this.imgCodSelected=getObjImgPfl.colImgPfl._id;
    const ruta=getObjImgPfl.colImgPfl.colImgRta;
  
    this.photoSelected=this.URL+ruta.toString();
  }

   

  ngOnInit() {
    this.getFotos();
    this.cargarTipoImagenFlt();
    this.ModeloTipoImagen._id="111";
    this.getQuienesSomos();
    console.log(this.arrayQsOptions);
  }

}
