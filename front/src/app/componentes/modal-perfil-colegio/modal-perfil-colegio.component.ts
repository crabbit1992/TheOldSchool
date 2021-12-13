import { Component, OnInit,Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

// Importacion de modelos
import { GaleriaCol }  from '../../modelos/galeria-col';
import { NucleoImg,GetNucleoPortada }  from '../../modelos/mnt-admin-crabb';


import { GaleriaColService } from 'src/app/servicios/galeria-col.service';
import { MntAdminCrabbService } from 'src/app/servicios/mnt-admin-crabb.service';

declare var M: any;
@Component({
  selector: 'app-modal-perfil-colegio',
  templateUrl: './modal-perfil-colegio.component.html',
  styleUrls: ['./modal-perfil-colegio.component.css']
})
export class ModalPerfilColegioComponent implements OnInit {

  readonly URL='http://localhost:3000';

  photoSelected: string | ArrayBuffer;
  tituloImg:string;
  arrayImgs: GaleriaCol[];
  arrayNcoImgs: NucleoImg[];


  colCod:string;

  divMostrarImgs:boolean=false;
  divMostrarImg:boolean=false;
  divMostrarNcoImgs:boolean=false;
  divOptions:   boolean=false;

  divReadOnlyImg: boolean=false;
  option:string;

  constructor(
    public dialogRef: MatDialogRef<ModalPerfilColegioComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private galeriaColService:GaleriaColService,
    private mntAdminCrabbService:MntAdminCrabbService,
    public dialog            : MatDialog,) { }

    
    verImagen(){

     // console.log(this.message["imagen"])
      console.log("esto es la rutaa")
      console.log(this.message["colImgRta"]);

      if(this.message["colImgRta"]==undefined){
        console.log("No existe");
        var ruta=this.message["colImgRta"];
        this.tituloImg=this.message["ncoImgTtl"];
  
        this.photoSelected=this.URL+ruta;
        console.log(this.photoSelected);

      }
      else{
        var ruta=this.message["colImgRta"];
        this.tituloImg=this.message["ncoImgTtl"];
  
        this.photoSelected=this.URL+ruta;
        console.log(this.photoSelected);
      }
    }

    ReadoOnlyImg(opt:string,image: object){

      if(opt=='ms'){
        var ruta= image["imgCod"].colImgRta;
        console.log(image)
        console.log(ruta)
        this.tituloImg= image["qsDes"];
        this.photoSelected=this.URL+ruta.toString();
      }
      else if(opt=='vs'){
        var ruta= image["imgCod"].colImgRta;
        this.tituloImg= image["qsDes"];
        this.photoSelected=this.URL+ruta.toString();
      }
      else if(opt=='va'){
        var ruta= image["imgCod"].colImgRta;
        this.tituloImg= image["qsDes"];
        this.photoSelected=this.URL+ruta.toString();
      }
      else if(opt=='ac'){
        var ruta= image["imgCod"].colImgRta;
        this.tituloImg= image["actDes"];
        this.photoSelected=this.URL+ruta.toString();
      }
      else if(opt=='ni'){
        var ruta= image["imgCod"].colImgRta;
        this.tituloImg= image["nivDes"];
        this.photoSelected=this.URL+ruta.toString();
      }
      else if(opt=='ta'){
        var ruta= image["imgCod"].colImgRta;
        this.tituloImg= image["talDes"];
        this.photoSelected=this.URL+ruta.toString();
      }
      else if(opt=='in'){
        var ruta= image["imgCod"].colImgRta;
        this.tituloImg= image["infDes"];
        this.photoSelected=this.URL+ruta.toString();
      }

   
    }


    openDialogEliminarImg(){
      const dialogRef =this.dialog.open(ConfirmDialogComponent,{
        width: '250px',
        data:' ¿ Seguro de eliminar ? ',
        
      });
      dialogRef.afterClosed().subscribe(res=>{
        if(res===true){       
  
          this.sendOption("eliminar");
        // this.DeshabilitarPerfil();//----------> En caso el cuadro de dialogo devuelva true llamara al metodo DeshabilitarPerfil()   
        }
        else{  
        }
      });   
    }
    
    sendOption(opt :string){

      console.log(opt);

      this.galeriaColService.optionModal=opt;
      console.log(this.galeriaColService.optionModal);
      this.dialogRef.close();

    }

    MostrarImagenes(){
      this.colCod=this.message["colCod"];

      this.galeriaColService.getImagenes(this.colCod)
      .subscribe(res=>{
        console.log(res);
        this.arrayImgs=res as GaleriaCol[];
      })
    }

    MostrarNcoImagenes(){
      this.mntAdminCrabbService.getNucleoImagenes()
      .subscribe(res=>{
        console.log(res);
        this.arrayNcoImgs=res as NucleoImg[];
      })
    }

    EnviarImgs(img: GaleriaCol){
      this.galeriaColService.imgSelected=img;
      this.dialogRef.close();
    }

    EnviarNclImgs(img: NucleoImg){
      this.galeriaColService.imgSelected=img;
      this.dialogRef.close();
    }

   

    

  ngOnInit() {

    this.option=this.message["option"];
    //console.log(this.message);


    if(this.option=="3"){
      this.divOptions=true;
    }
    else if(this.option=="1"){
      this.divMostrarImgs=true;
      this.MostrarImagenes();
    }
    else if(this.option=="5"){
      this.divMostrarNcoImgs=true;
      this.MostrarNcoImagenes();
    }
    else if(this.option=="ms"){
      let image= this.message["imagen"];
      
      this.ReadoOnlyImg(this.option,image);
      this.divReadOnlyImg=true;
    }
    else if(this.option=="vs"){
      let image= this.message["imagen"];
      this.ReadoOnlyImg(this.option,image);
      this.divReadOnlyImg=true;
    }
    else if(this.option=="va"){
      let image= this.message["imagen"];
      this.ReadoOnlyImg(this.option,image);
      this.divReadOnlyImg=true;
    }
    else if(this.option=="ac"){
      let image= this.message["imagen"];
      this.ReadoOnlyImg(this.option,image);
      this.divReadOnlyImg=true;
    }
    else if(this.option=="ni"){
      let image= this.message["imagen"];
      this.ReadoOnlyImg(this.option,image);
      this.divReadOnlyImg=true;
    }
    else if(this.option=="ta"){
      let image= this.message["imagen"];
      this.ReadoOnlyImg(this.option,image);
      this.divReadOnlyImg=true;
    }
    else if(this.option=="in"){
      let image= this.message["imagen"];
      this.ReadoOnlyImg(this.option,image);
      this.divReadOnlyImg=true;
    }
    else if(this.option=="if"){
      let image= this.message["imagen"];
      this.ReadoOnlyImg(this.option,image);
      this.divReadOnlyImg=true;
    }
    else{
      this.verImagen();
      this.divMostrarImg=true;
      this.galeriaColService.optionModal=null;
    }
  }

}
