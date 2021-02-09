import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router} from '@angular/router';


import { PerfilService } from '../../servicios/perfil.service';



@Component({
  selector: 'app-modal-opt-barra',
  templateUrl: './modal-opt-barra.component.html',
  styleUrls: ['./modal-opt-barra.component.css']
})
export class ModalOptBarraComponent implements OnInit {

  divCerrarSesion:boolean=false;
  divColegios:boolean=false;
  divMisPerfiles:boolean=false;

  constructor(
    public dialogRef: MatDialogRef<ModalOptBarraComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private rutas:Router,
    private perfilService:PerfilService,
  ) { }

  HideDivs(){
    this.divCerrarSesion=false;
    this.divColegios=false;
    this.divMisPerfiles=false;
  }


  onClickNo():void{
    
  }

  CerrarSesion(){
    this.perfilService.opcBarraModalSelected="1";
    this.dialogRef.close();
  }

  VerColegios(){
    this.perfilService.opcBarraModalSelected="2";
    this.dialogRef.close();
  }

  MisPerfiles(){
    this.perfilService.opcBarraModalSelected="3";
    this.dialogRef.close();
  }
 

  ngOnInit() {
    this.perfilService.opcBarraModalSelected="";
    console.log(this.message)
    this.HideDivs();
    if(this.message=="1"){
      
      this.divCerrarSesion=true;
    }
    else if(this.message=="2"){
      this.divColegios=true;
      this.divCerrarSesion=true;
    }
    else if(this.message=="3"){
      this.divColegios=false;
      this.divMisPerfiles=true;
      this.divCerrarSesion=true;
    }
  }

}
