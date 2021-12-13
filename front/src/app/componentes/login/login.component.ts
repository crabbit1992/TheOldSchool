import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';

import {Login}  from '../../modelos/login';
import {Perfil}  from '../../modelos/perfil';
import {ResToken}  from '../../modelos/res-token';
import { LoginService } from '../../servicios/login.service';
import { MntAdminCrabbService } from '../../servicios/mnt-admin-crabb.service';

import { PerfilService } from '../../servicios/perfil.service';
import {Router} from '@angular/router';

import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

declare const M;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  perfiles:Perfil[];

  ModeloLogin: Login=new Login();
  ModeloResToken: ResToken=new ResToken();

  errorMessage: string;
  admCeo:boolean=false;

  divLogin:boolean=true;
  divRecoveryPass:boolean=false;
  divGetCodigo:boolean=false;
  divNewPass:boolean=false;

  correo: string;
  codigo: string;

  newPass:string;
  confirNewPass:string;



  readonly URL_API='http://209.145.52.133:3000/Inicio/Login';
  constructor(
              private loginService: LoginService,
              private mntAdminCrabbService: MntAdminCrabbService,
              private perfilService: PerfilService,
              private rutas:Router,
              public dialog       : MatDialog
            ){ }

  openDialog():void {
    const dialogRef =this.dialog.open(ConfirmDialogComponent,{width: '250px',});
    dialogRef.afterClosed().subscribe(res=>{
    });
  }


  HideDivs(){
    this.divLogin=false;
    this.divRecoveryPass=false;
    this.divGetCodigo=false;
    this.divNewPass=false;
  }

  Login(){
    var loginUser={
      perCorreo:this.ModeloLogin.perCorreo,
      perPas:this.ModeloLogin.perPas
    }

    this.loginService.postLogin(loginUser)
    .subscribe(res=>{

      var status= res["status"];

      if(status==419){
        M.toast({ html: 'Email incorrecto' });
      }
      else if(status==420){
        M.toast({ html: 'Contraseña incorrecta incorrecta' });
      }
      else{
        this.ModeloResToken=res["dataUser"];
        localStorage.setItem('token',JSON.stringify(this.ModeloResToken.accessToken));
        const idPerRep= this.mntAdminCrabbService.encript(this.ModeloResToken.idPerRep);

        localStorage.setItem('idPerRep',JSON.stringify(idPerRep));
        this.rutas.navigateByUrl("perfil");
      
      }
    });
  }

  ShowRecoveryPass(){
    this.HideDivs();
    this.divRecoveryPass=true;
  }

  ShowGetCodigo(){
    this.HideDivs();
    this.divGetCodigo=true;
  }

  ShowNewPass(){
    this.HideDivs();
    this.divNewPass=true;
  }

  EnviarCorreo(){
    this.HideDivs()
    this.divLogin=true;

    console.log(this.correo);

    const objCorreo={
      correo :this.correo
    }

    return this.loginService.recoveryPass(objCorreo)
    .subscribe(res=>{
      console.log(res)
    })



  }





  Cancelar(){
    this.HideDivs();
    this.divLogin=true;
  }


  ngOnInit() {

  }
}
