import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';

import {Login}  from '../../modelos/login';
import {ResToken}  from '../../modelos/res-token';
import { LoginService } from '../../servicios/login.service';
import { MntAdminCrabbService } from '../../servicios/mnt-admin-crabb.service';
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

  
  readonly URL_API='http://localhost:3000/Inicio/Login';
  constructor(
              private loginService: LoginService,
              private mntAdminCrabbService: MntAdminCrabbService,
              private rutas:Router,
              public dialog       : MatDialog
            ){ }

    openDialog():void {
      const dialogRef =this.dialog.open(ConfirmDialogComponent,{width: '250px',});
      dialogRef.afterClosed().subscribe(res=>{
        console.log(res);
      });
    }

  ModeloLogin: Login=new Login();
  ModeloResToken: ResToken=new ResToken();

  errorMessage: string;


  Login(){
    var loginUser={
      perCorreo:this.ModeloLogin.perCorreo,
      perPas:this.ModeloLogin.perPas
    }

    this.loginService.postLogin(loginUser)
    .subscribe(res=>{

      console.log(res);
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
        
        const idPerRep= this.mntAdminCrabbService.encript(this.ModeloResToken.idPerRep)
        localStorage.setItem('idPerRep',JSON.stringify(idPerRep));
        console.log(localStorage.getItem('token'));
        this.rutas.navigateByUrl("perfil");
      }
    });
  }

  ngOnInit() {

  }
}
