import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

// Importacion de modelos
import { 
  NucleoImg,
  NucleoPortada, GetNucleoPortada,
  NucleoArea,
  NucleoCurso,GetNucleoCurso,
  NucleoCurricula,
  NucleoAnio,
  GetNucleoCurricula

}  from '../../modelos/mnt-admin-crabb';
import { ModalPerfilColegioComponent } from '../modal-perfil-colegio/modal-perfil-colegio.component';
import { Colegio } from '../../modelos/colegio';
import { PersonaRepositorio, FrmPersona, Dia, Mes, Anio } from '../../modelos/persona-repositorio';
import { Administrador } from '../../modelos/cargos';

// Importacion de servicios
import { MntAdminCrabbService }  from '../../servicios/mnt-admin-crabb.service';
import { GaleriaColService }  from '../../servicios/galeria-col.service';
import { PersonaRepositorioService } from '../../servicios/persona-repositorio.service';
import { ColegioService }  from '../../servicios/colegio.service';

import { MantenimientoCargoService } from '../../servicios/mantenimiento-cargo.service';
import { PerfilService } from '../../servicios/perfil.service';
import { Perfil,PerfilFrm } from 'src/app/modelos/perfil';


interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

declare var M: any;

@Component({
  selector: 'app-mantenimiento-administrativo',
  templateUrl: './mantenimiento-administrativo.component.html',
  styleUrls: ['./mantenimiento-administrativo.component.css']
})
export class MantenimientoAdministrativoComponent implements OnInit {

  ModeloNcoImagen: NucleoImg=new NucleoImg();
  arrayImagenes: NucleoImg[];

  perfil: Administrador=new Administrador();

  areaSlt:string;

  photoSelected: string | ArrayBuffer;
  file: File;
  imgCodSelected:string;

  divCrearImg       :boolean=false;
  divListarImg      :boolean=true;

  /** Referente a admin colegio */
  divCrearAdminCol:boolean=false;
  divDetalleAdmin:boolean=false;
  divDetalleAdminVoid:boolean=false;
  administrador:Administrador=new Administrador();
  perfilAdmin: Perfil[];
  ModeloPerfil:PerfilFrm=new PerfilFrm();
  

  /** Referente  a Persona */
  divCrearPersona:boolean=false;

  /** Referente  a Colegio */
  ModeloColegio: Colegio=new Colegio();
  arrayColegio: Colegio[];
  divCrearColegio   :boolean=false;
  divListarColegio  :boolean=false;
  ttlMntColegio:string;
  colCod_selected:string;

  /** Referente  a Portada */
  ModeloNcoPortada:NucleoPortada=new NucleoPortada()
  arrayPortada: GetNucleoPortada[];
  divCrearPortada:boolean=false;
  divListarPortada:boolean=false;
  ttlMntPortada:string;

  /** Referente a Area */
  ModeloNcoArea:NucleoArea=new NucleoArea()
  arrayNucleoArea: NucleoArea[];
  divCrearArea:boolean=false;
  divListarArea:boolean=false;
  ttlMntArea:string;

  /** Referente a Curso */
  ModeloNcoCurso:NucleoCurso=new NucleoCurso()
  arrayNucleoCurso: GetNucleoCurso[];
  divCrearCurso:boolean=false;
  divListarCursos:boolean=false;
  ttlMntCurso:string;
  arraySelectNucleoArea:NucleoArea[];

  /** Referente a Curricula */
  ModeloNcoCurricula:NucleoCurricula=new NucleoCurricula()
  arrayNucleoCurricula: GetNucleoCurricula[];
  divCrearCurricula:boolean=false;
  divListarCurricula:boolean=false;
  ttlMntCurricula:string;
  arraySelectNucleocurso:GetNucleoCurso[];
  anio:NucleoAnio[];
  anioSeleccionado:string;
  anioActual:string;
  areCodSlt:string;
  

  btnEditarGuardar:string;

  constructor(
    private personaRepositorioService: PersonaRepositorioService,
    private mntAdminCrabbService:MntAdminCrabbService,
    private galeriaColService:GaleriaColService,
    private colegioService:ColegioService,
    private perfilService: PerfilService,
    private mantenimientoCargoService : MantenimientoCargoService,
    public dialog            : MatDialog,

  ) { }


  HideDivs(){
    this.divCrearImg       =false;
    this.divListarImg      =false;
    this.divCrearCurricula =false;
    this.divListarCurricula=false;
    this.divCrearColegio   =false;
    this.divListarColegio  =false;
    this.divCrearPortada   =false;
    this.divListarPortada  =false;
    this.divCrearArea      =false;
    this.divListarArea     =false;
    this.divCrearCurso     =false;
    this.divListarCursos   =false;
    this.divListarCurricula=false;
    this.divListarCurricula=false;
    this.divCrearPersona=false;
    this.divCrearAdminCol=false;
    this.divDetalleAdmin=false;
    this.divDetalleAdminVoid=false;
  }

  showListarImagenes(){
    this.HideDivs();
    this.getImagenes();
    this.divListarImg=true;
  }

  showCrearImagenes(){
    this.HideDivs();
    this.limpiarMntImgs();
    this.divCrearImg=true;
  }

  showListarPortadas(){
    this.HideDivs();
    this.getPortada();
    this.divListarPortada=true;
  }

  showCrearPortada(){
    this.HideDivs();
    //this.limpiarMntImgs();
    this.divCrearPortada=true;
    this.photoSelected=null;
    this.btnEditarGuardar="Guardar"
  }

  showListarArea(){
    this.HideDivs();
    this.getAreas();
    this.divListarArea=true;
  }
  
  showCrearArea(){
    this.HideDivs();
    this.divCrearArea=true;
    this.ModeloNcoArea=new NucleoArea();
    this.ttlMntArea="Crear Area";
    this.btnEditarGuardar="Guardar"
  }

  showListarCurso(){
    this.HideDivs();
    this.getCursos();
    this.getSltAreas();
    this.divListarCursos=true;
  }

  showCrearCurso(){
    this.HideDivs();
    this.getSltAreas();
    this.divCrearCurso=true;
    this.ModeloNcoCurso=new NucleoCurso();
    this.ttlMntCurso="Crear Curso";
    this.btnEditarGuardar="Guardar"


    this.ModeloNcoArea._id="string";
    

  }

  showListarCurricula(){
    this.HideDivs();

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
    this.obtenerAñoActual();
    this.anioSeleccionado=this.anioActual;
  
    this.getSltAreas();
    this.getCurricula();
    
    this.divListarCurricula=true;

  }

  showCrearCurricula(){
    this.HideDivs();
    this.ModeloNcoCurricula=new NucleoCurricula();
    this.ModeloNcoCurso._id="string";
    this.ModeloNcoArea._id="string";
    this.obtenerAñoActual();
    this.anioSeleccionado=this.anioActual;

    this.btnEditarGuardar="Guardar";
    this.divCrearCurricula=true;
  }



  showListarColegios(){
    this.HideDivs();
    this.getColegios();
    
  }

  showCrearColegio(){
    this.HideDivs();
    this.ModeloColegio=new Colegio();
    this.ttlMntColegio="Registrar colegio";
    this.btnEditarGuardar="Guardar";
    this.divCrearColegio=true;
    
  }

  showVerAdmin(){

  }

  showAsignarAdmin(){
    this.HideDivs();
    this.btnEditarGuardar="Guardar";
    this.divDetalleAdmin=true;
    console.log(this.colCod_selected);
  }





  showListarPersonas(){
    this.HideDivs();
    this.divCrearPersona=true;
  }

  


  cancelar(option: string){

    if(option=="img"){
      this.showListarImagenes();
    }
    else if(option=="por"){
      this.showListarPortadas();
    }
    else if(option=="are"){
      this.showListarArea();
    }
    else if(option=="cur"){
      this.showListarCurso();
    }
    else if(option=="curri"){
      this.showListarCurricula();
    }
    else if(option=="col"){
      this.showListarColegios();
    }

  }

  limpiarMntImgs(){
    this.ModeloNcoImagen=new NucleoImg();
    this.photoSelected=null;
    this.btnEditarGuardar="Guardar Imagen";
  }


  /** Modals */

  openDialogEliminarPortada(getNucleoPortada: GetNucleoPortada){
    const dialogRef =this.dialog.open(ConfirmDialogComponent,{
      width: '250px',
      data:' ¿ Seguro de eliminar ? ',
      
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res===true){       

        this.eliminarPortada(getNucleoPortada._id);
      
      }
      else{  
      }
    });   
  }

  ModalMostrarImagenes(){

    const obj={
      option:"5",
    };

    const dialogRef =this.dialog.open(ModalPerfilColegioComponent,{
      width: '800px',
      data: obj,    
    });

    dialogRef.afterClosed().subscribe(res=>{
      let imgSelected=this.galeriaColService.imgSelected;

      if(imgSelected["colImgRta"]==undefined || imgSelected["colImgRta"]==null){
        let ruta=imgSelected["ncoImgRta"];
        this.imgCodSelected=imgSelected["_id"];
        console.log(imgSelected);
  
        this.photoSelected='http://209.145.52.133:3000/'+ruta.toString();
      }
      else{
        let ruta=imgSelected["colImgRta"];
        this.imgCodSelected=imgSelected["_id"];
        console.log(imgSelected);
  
        this.photoSelected='http://209.145.52.133:3000/'+ruta.toString();

      }



    });
  }

  openModalImg(imagen: NucleoImg){

  
    const dialogRef =this.dialog.open(ModalPerfilColegioComponent,{
      width: '500px',
      data: imagen,
      
    });

    dialogRef.afterClosed().subscribe(res=>{
      let getOpt=this.galeriaColService.optionModal;
      console.log(getOpt);
      if(getOpt=="editar"){
        this.HideDivs();
        this.preEditar(imagen);
      }
      else if(getOpt=="eliminar"){
        this.eliminarFoto(imagen)
      }
    });
  }


  /** Metodos referentes a imagenes */

  validarFrm():boolean{
    var trueOrFalse=false;
    console.log(this.photoSelected);

    if(this.ModeloNcoImagen.ncoImgTtl==null||this.ModeloNcoImagen.ncoImgTtl==undefined){
      trueOrFalse=true;
      M.toast({ html: 'Escriba un titulo para la imagen' });
    }
    else if(this.photoSelected==null||this.photoSelected==undefined){
      trueOrFalse=true;
      M.toast({ html: 'Seleccione la imagen' });
    }
  
    console.log(trueOrFalse);
    return trueOrFalse;
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
      console.log(this.photoSelected);
    }
  }

  uploadPhoto() {

    console.log(this.file);
  
    if(this.validarFrm()==false){
      if(this.btnEditarGuardar=="Guardar Imagen"){
        console.log("entro a guardar imagen");
        const titulo= ""+this.ModeloNcoImagen.ncoImgTtl;
        const descripcion= "...";

        this.mntAdminCrabbService.createFoto(titulo, descripcion, this.file)
        .subscribe(
          res => {

          console.log(res); 
          var status=res["status"];

          if(status===200){
            this.HideDivs();
          
            this.getImagenes();
            this.showListarImagenes();

            M.toast({ html: ' Se guargo la imagen ' });
          }
        });

      }else{
  
 
        this.editarFoto(this.ModeloNcoImagen);

      }
    }
    else{

    }   
  }

  getImagenes(){
    this.mntAdminCrabbService.getNucleoImagenes()
    .subscribe(res=>{
      this.arrayImagenes=res as NucleoImg[];
      console.log(this.arrayImagenes);
    });
  }
 
  preEditar(imagen:NucleoImg){
    this.ModeloNcoImagen.ncoImgTtl=imagen.ncoImgTtl;
    this.ModeloNcoImagen.ncoImgDes=imagen.ncoImgDes;
    this.ModeloNcoImagen._id=imagen._id;
    this.photoSelected='http://209.145.52.133:3000/'+imagen.ncoImgRta.toString();
    console.log(this.photoSelected);
    //this.HideDivs();
    this.divCrearImg=true;
    this.btnEditarGuardar="Editar Imagen";
  }

  editarFoto(imagen:NucleoImg){
    return this.mntAdminCrabbService.editFoto(imagen)
    .subscribe(res=>{
      console.log(res)

      console.log(res); 
          var status=res["status"];

          if(status===200){
            M.toast({ html: ' Se edito la imagen ' });
            this.HideDivs();
            
            this.btnEditarGuardar="Guardar Imagen";
            this.getImagenes();
            this.divListarImg=true;
          }

    });
  }

  eliminarFoto(imagen:NucleoImg){
    return this.mntAdminCrabbService.eliminarFoto(imagen._id)
    .subscribe(res=>{

      console.log(res)
      var status=res["status"];

      if(status===200){
        M.toast({ html: "Se elimino la imagen correctamente"});
        this.getImagenes();
        this.showListarImagenes();
      }
      else if(status===410){

        let msg=res["msg"]

        M.toast({ html: msg});
      }
      
    });
  }


  /** Metodos referentes a colegios */
  validarFrmColegio():boolean{
    var trueOrFalse=false;

    if(this.ModeloColegio.colNom==null||this.ModeloColegio.colNom==undefined||this.ModeloColegio.colNom==""){
      M.toast({ html: 'Escriba el nombre del colegio' });
      trueOrFalse=true;
    }
    else if(this.ModeloColegio.colRuc==null||this.ModeloColegio.colRuc==undefined||this.ModeloColegio.colRuc==""){
      M.toast({ html: 'Escriba el ruc del colegio' });
      trueOrFalse=true;
    }

    return trueOrFalse;
  }

  getColegios(){
    return this.colegioService.getColegios()
    .subscribe(res=>{
      this.arrayColegio= res as Colegio[];
      this.divListarColegio=true;
      console.log(this.arrayColegio);
    })
  }

  PostColegios(){

    if(this.validarFrmColegio()==true){

    }
    else{
      if(this.ModeloColegio._id){
        console.log("Editar registro");
        return this.colegioService.putColegio(this.ModeloColegio)
        .subscribe(res=>{
          var status=res["status"];
          if(status==510){
            M.toast({ html: "Error al editar" });
          }
          else if(status==200){
            M.toast({ html: 'Se edito correctamente' });
            this.HideDivs();

            this.getColegios();
            this.divListarColegio=true;
            this.btnEditarGuardar="Guardar";
          }

        });
      }
      else{
        console.log("Registrar colegio");
        return this.colegioService.postColegio(this.ModeloColegio)
        .subscribe(res=>{
          var status=res["status"];
          if(status==510){
            M.toast({ html: "Error al registrar" });
          }
          else if(status==200){
            M.toast({ html: 'Se registro correctamente' });
            this.HideDivs();

            this.getColegios();
            this.divListarColegio=true;
            this.btnEditarGuardar="Guardar";
          }

        });
      }
    }

  }

  EditarColegio(colegio:Colegio){
    console.log(colegio);
    this.HideDivs();
    this.ModeloColegio.colNom=colegio.colNom;
    this.ModeloColegio.colRuc=colegio.colRuc;
    this.ModeloColegio._id=colegio._id;
    this.btnEditarGuardar="Editar";
    this.divCrearColegio=true;
  }


  /** Metodos referentes a asignar administrador a colegio */
  selectPersona(persona:PersonaRepositorio){
    this.ModeloPerfil.perRepDni=persona.perRepDni;
    this.ModeloPerfil.perRepNom=persona.perRepNom;
    this.ModeloPerfil.perRepApe=persona.perRepApe;

    this.administrador.perRepCod= persona._id;
    this.administrador.colCod= this.colCod_selected;
    console.log(this.administrador);
    this.nombreBotonGuardar="Guardar";
  }

  getAdminCol(colegio:Colegio){

    this.colCod_selected=colegio._id;

    const objetoCargo={
      carCod: "5e0a9164c2a58d0b8872b2b8",
      colCod: this.colCod_selected,
    }

    this.ModeloPerfil=new PerfilFrm();
    this.administrador=new Administrador();
    
    this.perfilService.getPlfSegunCargo(objetoCargo)
    .subscribe(res=>{
      
      this.perfilAdmin=res as Perfil[];
      

      if(this.perfilAdmin.length==0){
        this.HideDivs();
        this.divDetalleAdminVoid=true;
        
  
       
        
      }
      else{
        console.log(this.perfilAdmin);
        this.ModeloPerfil.perRepApe=this.perfilAdmin[0].perRepCod.perRepApe;
        this.ModeloPerfil.perRepNom=this.perfilAdmin[0].perRepCod.perRepNom;
        this.ModeloPerfil.perRepDni=this.perfilAdmin[0].perRepCod.perRepDni;

        this.administrador._id=this.perfilAdmin[0].codMiem;
        this.administrador.perRepCod=this.perfilAdmin[0].perRepCod._id;
        this.administrador.colCod=this.perfilAdmin[0].colCod._id;

        this.HideDivs();
        this.btnEditarGuardar="Guardar";
        this.divDetalleAdminVoid=false;
        this.divDetalleAdmin=true;
      }
    });
  }

  validarAdmin():boolean{
    var trueOrFalse=false;

    if(this.ModeloPerfil.perRepDni==""||this.ModeloPerfil.perRepDni==undefined||this.ModeloPerfil.perRepDni==null){
      M.toast({ html: "Seleccione una persona" });
    }
    else if(this.ModeloPerfil.perRepNom==""||this.ModeloPerfil.perRepNom==undefined||this.ModeloPerfil.perRepNom==null){
      M.toast({ html: "Seleccione una persona" });
    }
    else if(this.ModeloPerfil.perRepApe==""||this.ModeloPerfil.perRepApe==undefined||this.ModeloPerfil.perRepApe==null){
      M.toast({ html: "Seleccione una persona" });
    }

    return trueOrFalse
  }

  postAdminCol(){

    console.log(this.administrador);

    if(this.administrador._id){
      console.log("Se va actualizar");
      return this.mantenimientoCargoService.putAdministrador(this.administrador)
      .subscribe(res => {  
  
        var status=res["status"];
  
        if(status===200){
          M.toast({ html: 'Se actualizo el pefil !' });   
          console.log(res);
      
        }
        else if(status===510){
          M.toast({ html: 'Error al actualizar' });   
    
        }
      });

    }
    else{
      console.log("Se va registrar");
       
     return this.mantenimientoCargoService.createAdministrador(this.administrador)
    .subscribe(res => {  

      var status=res["status"];

      if(status===200){
        M.toast({ html: 'Perfil Registrado !' });   
        console.log(res);
    
      }
      else if(status===510){
        M.toast({ html: 'Ya existe un Administrador en el colegio' });   
  
      }
    });
  
    }

    
   
    

  }

 





  /** Metodos referentes a portada */

  validarFrmPrt():boolean{
    
    var trueOrFalse=false;

    if(this.ModeloNcoPortada.imgCod==null||this.ModeloNcoPortada.imgCod==undefined){
      M.toast({ html: 'Elija una imagen' });
      trueOrFalse=true;
    }   
    return trueOrFalse;
  } 

  
  postPortada(){

    this.ModeloNcoPortada.imgCod=this.imgCodSelected;
    if(this.validarFrmPrt()==true){

    }
    else{
      if(this.ModeloNcoPortada._id){
        this.mntAdminCrabbService.putPortada(this.ModeloNcoPortada)
        .subscribe(res=>{
          console.log(res);
          var status=res["status"];
          if(status==510){
            
            M.toast({ html: "Error al editar" });
          }
          else if(status==200){
            M.toast({ html: 'Se edito correctamente' });
            this.ModeloNcoPortada=new NucleoPortada();
            this.HideDivs();
            this.getPortada();
            this.divListarPortada=true;
            this.btnEditarGuardar="Guardar"
          } 
        })
      }
      else{
        console.log("Entro a post portada");
        this.mntAdminCrabbService.postPortada(this.ModeloNcoPortada)
        .subscribe(res=>{
    
          var status=res["status"];
          if(status==408){
            let msg=res["msg"]
            M.toast({ html: msg });
          }
          else if(status==200){
            M.toast({ html: 'Se registro correctamente' });
            this.ModeloNcoPortada=new NucleoPortada();
            this.HideDivs();
            this.getPortada();
            this.divListarPortada=true;
            this.btnEditarGuardar="Guardar"
          } 
        })
      }
    } 


  } 

  getPortada(){
    this.mntAdminCrabbService.getPortadas()
    .subscribe(res=>{
      this.arrayPortada=res as GetNucleoPortada[];
    });
  }

  EditarPortada(nucleoPortada: GetNucleoPortada){
    this.HideDivs();
    this.divCrearPortada=true;
    this.ttlMntPortada="Editar portada";
    this.btnEditarGuardar="Editar";
    this.ModeloNcoPortada._id=nucleoPortada._id;
    this.imgCodSelected=nucleoPortada.imgCod._id;
    const ruta=nucleoPortada.imgCod.ncoImgRta;
  
    this.photoSelected='http://209.145.52.133:3000/'+ruta.toString();
  }

  eliminarPortada(_id:string){
    this.mntAdminCrabbService.deletePortada(_id)
    .subscribe(res=>{
        var status=res["status"];
        if(status==510){
          M.toast({ html: 'Error al eliminar' });
        }
        else if(status==200){
          M.toast({ html: 'Se elimino correctamente' });
          this.ModeloNcoPortada=new NucleoPortada();
          this.HideDivs();
          this.getPortada();
          this.divListarPortada=true;
          this.btnEditarGuardar="Guardar"
        } 
    })
  }

  /** Metodos referentes a area*/
  validarFrmArea():boolean{
    
    var trueOrFalse=false;

    if(this.ModeloNcoArea.ncoAreNom==null||this.ModeloNcoArea.ncoAreNom==undefined){
      M.toast({ html: 'Ingrese el nombre del area' });
      trueOrFalse=true;
    }
    return trueOrFalse;
  } 

  postArea(){

    if(this.validarFrmArea()==true){

    }
    else{

      if(this.ModeloNcoArea._id){
        this.mntAdminCrabbService.putArea(this.ModeloNcoArea)
        .subscribe(res=>{
          var status=res["status"];

          if(status==200){
            this.showListarArea();
            M.toast({ html: "Se edito el area" });
          }
          else{
            M.toast({ html: "Error al editar" });
          }

        });
      }
      else{
        this.mntAdminCrabbService.postArea(this.ModeloNcoArea)
        .subscribe(res=>{
        var status=res["status"];

        if(status==200){
            this.showListarArea();
            M.toast({ html: "Se registro el area" });
          }
          else{
            M.toast({ html: "Error al registrar" });
          }
        });
      }
  
      

    }
  }

  getAreas(){
    this.mntAdminCrabbService.getAreas()
    .subscribe(res=>{
      this.arrayNucleoArea=res as NucleoArea[];
      console.log(this.arrayNucleoArea);
    });
  }

  preEditarArea(area: NucleoArea){
    console.log(area);
    this.HideDivs();
    this.ModeloNcoArea._id=area._id;
    this.ModeloNcoArea.ncoAreNom=area.ncoAreNom;
    this.btnEditarGuardar="Editar"
    this.divCrearArea=true;

  }

  /** Metodos referentes a curso*/
  validarFrmCurso():boolean{
    
    var trueOrFalse=false;

    if(this.ModeloNcoCurso.ncoCurNom==null||this.ModeloNcoCurso.ncoCurNom==undefined||this.ModeloNcoCurso.ncoCurNom==""){
      M.toast({ html: 'Ingrese el nombre del curso' });
      trueOrFalse=true;
    }
    else if(this.ModeloNcoCurso.areCod==null||this.ModeloNcoCurso.areCod==undefined||this.ModeloNcoCurso.areCod=="string"){
      M.toast({ html: 'seleccione el area' });
      trueOrFalse=true;
    }
    return trueOrFalse;
  } 

  capturarArea(e){
    console.log(e);
    const areCod=e;
    this.mntAdminCrabbService.getCursosArea(areCod)
    .subscribe(res=>{
      console.log(res);
      this.arrayNucleoCurso=res as GetNucleoCurso[];
    });
  }

  capturarArea_Curso(e){
    this.arraySelectNucleocurso=[];
    console.log(e);
    const areCod=e;
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
      console.log(this.arraySelectNucleoArea);
    });
  }


  postCurso(){

    this.ModeloNcoCurso.areCod=this.ModeloNcoArea._id;

    if(this.validarFrmCurso()==true){

    }
    else{
      console.log(this.ModeloNcoCurso);
      if(this.ModeloNcoCurso._id){
        console.log(this.ModeloNcoCurso);
        this.mntAdminCrabbService.putCurso(this.ModeloNcoCurso)
        .subscribe(res=>{
          var status=res["status"];
  
          if(status==200){
            M.toast({ html: "Se edito el curso" });
            this.showListarCurso();
          }
          else{
            M.toast({ html: "Error al editar" });
          }
        });
      }
      else{
        console.log(this.ModeloNcoCurso);
        this.mntAdminCrabbService.postCurso(this.ModeloNcoCurso)
        .subscribe(res=>{
          var status=res["status"];
  
          if(status==200){
            M.toast({ html: "Se registro el curso" });
            this.showListarCurso();
          }
          else{
            M.toast({ html: "Error al registrar" });
          }
        });
      }

      
 
    }
    
    
  
    
  }

  getCursos(){
    this.mntAdminCrabbService.getCursos()
    .subscribe(res=>{
      console.log(res);
      this.arrayNucleoCurso=res as GetNucleoCurso[];
      
    });
  }

  deleteCurso(curso:GetNucleoCurso){
    this.mntAdminCrabbService.deleteCurso( curso._id)
    .subscribe(res=>{
      var status=res["status"];
  
          if(status==200){
            M.toast({ html: "Se elimino el curso" });
            this.showListarCurso();
          }
          else{
            M.toast({ html: "Error al eliminar" });
          }
    })
  }

  preEditarCurso(curso:GetNucleoCurso){
    this.ModeloNcoArea._id=curso.areCod._id;
    this.ModeloNcoCurso._id=curso._id;
    this.ModeloNcoCurso.ncoCurNom=curso.ncoCurNom;
    this.btnEditarGuardar="Editar";
    this.ttlMntCurso="Editar Curso";
    this.HideDivs();
    this.divCrearCurso=true;
  }

  /** Metodos referentes a curricula*/

  validarFrmCurricula():boolean{
    
    var trueOrFalse=false;

    if(this.ModeloNcoCurricula.prd==null||this.ModeloNcoCurricula.prd==undefined||this.ModeloNcoCurricula.prd=="string"){
      M.toast({ html: 'Seleccione el año' });
      trueOrFalse=true;
    }
    else if(this.ModeloNcoCurricula.areCod==null||this.ModeloNcoCurricula.areCod==undefined||this.ModeloNcoCurricula.areCod=="string"){
      M.toast({ html: 'seleccione el area' });
      trueOrFalse=true;
    }
    else if(this.ModeloNcoCurricula.curCod==null||this.ModeloNcoCurricula.curCod==undefined||this.ModeloNcoCurricula.curCod=="string"){
      M.toast({ html: 'seleccione el curso' });
      trueOrFalse=true;
    }
    return trueOrFalse;
  } 

  capturarArea_Curricula(e){
    console.log();
    this.areCodSlt=e;
   
  }
 

  capturarAnio(e){
    console.log();
    this.anioActual=e;

  }

  BuscarCurricula(){
    if(this.areCodSlt=="string"||this.areCodSlt==undefined||this.areCodSlt==null){
      this.areCodSlt=null;
    }
    if(this.anioSeleccionado=="Seleccione un año"){
      this.anioActual=null;
    }

    if(this.areCodSlt==null && this.anioActual==null){
      M.toast({ html: "Debe elegir al menos una opcion" });
    }
    else if(this.anioActual==null){
      M.toast({ html: "Debe seleccionar un año" });
    }
    else{
      this.mntAdminCrabbService.getCuriculaPrdAreCod(this.anioActual,this.areCodSlt)
      .subscribe(res=>{
        console.log(res);
        this.arrayNucleoCurricula=res as GetNucleoCurricula[];
      })
    }


  }

  postCurricula(){
    this.ModeloNcoCurricula.areCod=this.ModeloNcoArea._id;
    this.ModeloNcoCurricula.curCod=this.ModeloNcoCurso._id;
    this.ModeloNcoCurricula.prd=this.anioSeleccionado;


    if(this.validarFrmCurricula()==true){

    }
    else{
      console.log(this.ModeloNcoCurricula);
      this.mntAdminCrabbService.postCurricula(this.ModeloNcoCurricula)
      .subscribe(res=>{
        
        var status=res["status"];
  
          if(status==200){
            M.toast({ html: "Se agrego un nuevo registro" });
            //this.HideDivs();
            //this.getCurricula();
           // this.divListarCurricula=true;
     
          }
          else{
            M.toast({ html: "Error, ya se registro este curso" });
          }

      })
    }
    
  }

  getCurricula(){
    this.mntAdminCrabbService.getCuriculaPrd(this.anioActual)
    .subscribe(res=>{
      console.log(res);
      this.arrayNucleoCurricula=res as GetNucleoCurricula[];
    })
  }

  deleteCurricula(curricula: GetNucleoCurricula){
    this.mntAdminCrabbService.deleteCurricula(curricula._id)
    .subscribe(res=>{
      var status=res["status"];
  
          if(status==200){
            M.toast({ html: "Se elimino el registro" });
            this.showListarCurricula();
          }
          else{
            M.toast({ html: "Error al eliminar" });
          }
    })
  }

  obtenerAñoActual(){
    let fechaActual = new Date();
    this.anioActual=fechaActual.getFullYear().toString();
    console.log(this.anioActual);
  }

  /**Metodos para el registro de personas */
  frmPersona: FrmPersona = new FrmPersona();
  ModeloPerRep: PersonaRepositorio = new PersonaRepositorio();
  arrayDia: Dia[];
  arrayMes: Mes[];
  arrayAnio: Anio[];
  filteredPersona: PersonaRepositorio[];
  perArray: PersonaRepositorio[] = [];
  array: PersonaRepositorio[] = [];
  filteredDni: PersonaRepositorio;
  diaSeleccionado: string;
  mesSeleccionado: string;
  anioSelected: string;
  diaFch: string;
  mesFch: string;
  AnioFch: string;
  año: string;
  mes: string;
  dia: string
  nombreBotonGuardar = "Registrar";
  errorMessage: string;

  camErrNom: boolean = false;
  camErrApe: boolean = false;
  camErrDni: boolean = false;
  camErrSex: boolean = false;
  camErrFch: boolean = false;
  dniExist:  boolean = false;
  dniReadOn: boolean = false;
  estado:string="";

  msgNom: string;
  msgApe: string;
  msgDni: string;
  msgSex: string;
  msgFch: string;
  ok: boolean = true;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredPersona = this.listFilter ? this.performFilter(this.listFilter) : this.perArray;
  }

  performFilter(filterBy: string): PersonaRepositorio[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.perArray.filter((persona: PersonaRepositorio) =>
      persona.perRepDni.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

   validarCampos=function():boolean {
    this.ok=true; 
    var expresionNum = /^[0-9]+$/;

    if (this.frmPersona.perDni === null || this.frmPersona.perDni === undefined || this.frmPersona.perDni === "") {
      M.toast({ html: 'DNI requerido' });
      this.ok = false;
    } else if (this.frmPersona.perDni.substr(0, 1) == " ") {
      M.toast({ html: 'Evita espacios al inicio (DNI)' });
      this.ok = false;
    } else if (!expresionNum.test(this.frmPersona.perDni)) {  
      M.toast({ html: 'DNI no valido' });;
      this.ok = false;
    } else if (this.frmPersona.perDni.length < 8) {
      M.toast({ html: 'DNI debe ser 8 digitos' });
      this.ok = false;
    }
    
    if (this.frmPersona.perNom == "" || this.frmPersona.perNom == null || this.frmPersona.perNom == undefined) {
      M.toast({ html: 'Nombre requerido' });
      this.ok = false;
    }
    else if (this.frmPersona.perNom.substr(0, 1) == " ") {
      M.toast({ html: 'Evite espacios al inicio (Nombre)' });
      this.ok = false;
    }

    if (this.frmPersona.perApe === null || this.frmPersona.perApe === undefined || this.frmPersona.perApe === "") {
      M.toast({ html: 'Apellidos requeridos' });
      this.ok = false;
    } else if (this.frmPersona.perApe.substr(0, 1) == " ") {
      M.toast({ html: 'Evite espacios al inicio (Apellidos)' });
      this.ok = false;
    }
  
    if (this.frmPersona.perSex === null || this.frmPersona.perSex === undefined || this.frmPersona.perSex === "") {
      M.toast({ html: 'Elija un sexo' });
      this.ok = false;
    }

    if (this.nombreBotonGuardar === "Registrar") {
      if (this.diaFch == "Dia" || this.diaFch == null || this.diaFch == undefined ||
        this.mesFch == "Mes" || this.mesFch == null || this.mesFch == undefined ||
        this.AnioFch == "Año" || this.AnioFch == null || this.AnioFch == undefined
      )
      {
        M.toast({ html: 'Fecha invalida' });
        this.ok = false;
      }
    }
    if (this.nombreBotonGuardar === "Actualizar") {
      console.log(this.diaSeleccionado);
      console.log(this.mesSeleccionado);
      console.log(this.anioSelected);
      if (this.diaSeleccionado == "Dia" || this.diaSeleccionado == null || this.diaSeleccionado == undefined ||
        this.mesSeleccionado == "Mes" || this.mesSeleccionado == null || this.mesSeleccionado == undefined ||
        this.anioSelected == "Año" || this.anioSelected == null || this.anioSelected == undefined
      )
      {
        M.toast({ html: 'Fecha invalida' });
        this.ok = false;
      }
    }
    if (this.ok === false) {
      return this.ok = false;
    } 
    else {
      return this.ok = true;
    }
  }

  registrarActualizar(){
    if (this.frmPersona.perId) {

      this.ModeloPerRep._id = this.frmPersona.perId;
      this.ModeloPerRep.perRepNom = this.frmPersona.perNom.trim().toUpperCase();
      this.ModeloPerRep.perRepApe = this.frmPersona.perApe.trim().toUpperCase();
      this.ModeloPerRep.perRepDni = this.frmPersona.perDni.trim();
      this.ModeloPerRep.perRepSex = this.frmPersona.perSex.trim();
      this.ModeloPerRep.perRepFchNac = this.AnioFch + "-" + this.mesFch + "-" + this.diaFch;
      console.log(this.ModeloPerRep);
      return this.personaRepositorioService.putPersona(this.ModeloPerRep)
        .subscribe(res => {

          var status=res["status"];

          if(status===200){
            this.CargarTabla();
            M.toast({ html: 'Persona actualizada !' });
            this.nombreBotonGuardar = "Registrar";
            this.LimpiarForm();
            this.dniReadOn=false;
          }else{
            M.toast({ html: 'No se completo la operacion !' });
          }   
        });
    }
    else {
      this.ModeloPerRep.perRepDni = this.frmPersona.perDni.trim();
      this.ModeloPerRep.perRepNom = this.frmPersona.perNom.trim().toUpperCase();
      this.ModeloPerRep.perRepApe = this.frmPersona.perApe.trim().toUpperCase();
      this.ModeloPerRep.perRepSex = this.frmPersona.perSex.trim();
      this.ModeloPerRep.perRepFchNac = this.AnioFch + "-" + this.mesFch + "-" + this.diaFch;



      return this.personaRepositorioService.postPersona(this.ModeloPerRep)
        .subscribe(res => {    
          var status=res["status"];

          if(status===510){
            M.toast({ html: 'Dni ya se encuentra registrado !' });
            this.listFilter=this.ModeloPerRep.perRepDni;
          }
          else if(status===200){
            this.CargarTabla();
            M.toast({ html: 'Persona registrada !' });
            this.nombreBotonGuardar = "Registrar";
            this.LimpiarForm();
          }
        });
    }
  }

  CrearPersona() {
    if (this.validarCampos() === true) {
      console.log(this.ok);
     this.registrarActualizar();
    }
    else {
      
    }  
  }

  LimpiarForm() {
    this.dniReadOn=false;
    this.ok=true;
    this.frmPersona = new FrmPersona();
    this.anioSelected = "Año";
    this.mesSeleccionado = "Mes";
    this.diaSeleccionado = "Dia";
    this.diaFch="Dia";
    this.mesFch="Mes";
    this.AnioFch="Año";
    this.nombreBotonGuardar = "Registrar";
    this.listFilter = "";
  }

  CargarTabla() {
    this.personaRepositorioService.getPersonas()
      .subscribe(res => {
        this.personaRepositorioService.personas = res as PersonaRepositorio[];
        this.filteredPersona = res as PersonaRepositorio[];
        this.perArray = this.filteredPersona;
        console.log(this.perArray);
      },
        error => this.errorMessage = <any>error);
  }

  editarPersona(persona: PersonaRepositorio) {
    this.nombreBotonGuardar = "Actualizar";
    this.dniReadOn=true;
    this.año = persona.perRepFchNac.substr(0, 4);
    this.mes = persona.perRepFchNac.substr(-19, 2);
    this.dia = persona.perRepFchNac.substr(-16, 2);

    if (this.mes == "01") { this.mesSeleccionado = "Ene"; }
    if (this.mes == "02") { this.mesSeleccionado = "Feb"; }
    if (this.mes == "03") { this.mesSeleccionado = "Mar"; }
    if (this.mes == "04") { this.mesSeleccionado = "Abr"; }
    if (this.mes == "05") { this.mesSeleccionado = "May"; }
    if (this.mes == "06") { this.mesSeleccionado = "Jun"; }
    if (this.mes == "07") { this.mesSeleccionado = "Jul"; }
    if (this.mes == "08") { this.mesSeleccionado = "Ago"; }
    if (this.mes == "09") { this.mesSeleccionado = "Set"; }
    if (this.mes == "10") { this.mesSeleccionado = "Oct"; }
    if (this.mes == "11") { this.mesSeleccionado = "Nov"; }
    if (this.mes == "12") { this.mesSeleccionado = "Dic"; }

    this.frmPersona.perId = persona._id;
    this.frmPersona.perNom = persona.perRepNom;
    this.frmPersona.perApe = persona.perRepApe;
    this.frmPersona.perDni = persona.perRepDni;
    this.frmPersona.perSex = persona.perRepSex;
    this.diaSeleccionado = this.dia;
    this.mesSeleccionado = this.mesSeleccionado;
    this.anioSelected = this.año;

    this.diaFch=this.dia;
    this.mesFch=this.mes;
    this.AnioFch=this.año;
  }

  capturarDia(val: any) {
    this.diaFch = val;

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
  }

  capturarAnioPersona(val: any) {
    this.AnioFch = val;
  }


  /********************************************* */

  

  ngOnInit() {

    /** referente a registrar personas */
    this.CargarTabla();

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
      { idAnio: 0, nomAnio: "Año" }, { idAnio: 2019, nomAnio: "2020" }, { idAnio: 2019, nomAnio: "2019" }, { idAnio: 2018, nomAnio: "2018" }, { idAnio: 2017, nomAnio: "2017" },
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
    this.anioSelected = "Año";
    this.mesSeleccionado = "Mes";
    this.diaSeleccionado = "Dia";

    /** */

    this.showListarImagenes();
    this.getAreas();

    this.obtenerAñoActual();

    this.anio=[
      {idAnio:0,nomAnio:"Seleccione un año"}, {idAnio:2020,nomAnio:"2020"},{idAnio:2019,nomAnio:"2019"},
    ];
    this.anioSeleccionado=this.anioActual;

  }

}
