import { Component, OnInit,Input,AfterViewInit, OnDestroy} from '@angular/core';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable,Subscription } from 'rxjs';
import { delay, filter } from 'rxjs/operators';
import { map, share } from 'rxjs/operators';

import { MatDialog } from '@angular/material';
import { ModalOptBarraComponent } from '../modal-opt-barra/modal-opt-barra.component';


// Importacion de servicios
import { GaleriaColService }  from '../../servicios/galeria-col.service';
import { PerfilService } from '../../servicios/perfil.service';
import { PersonaRepositorioService } from '../../servicios/persona-repositorio.service';
import { BiografiaService } from '../../servicios/biografia.service';
import { ColegioService } from '../../servicios/colegio.service';
import { MntAdminCrabbService }  from '../../servicios/mnt-admin-crabb.service';

import {Router} from '@angular/router';

import {Perfil}  from '../../modelos/perfil';
import {NavBarComponent}  from '../../componentes/nav-bar/nav-bar.component';
import {PerfilUsuColComponent}  from '../../componentes/perfil-usu-col/perfil-usu-col.component';
import {PerfilInicioComponent}  from '../../componentes/perfil-inicio/perfil-inicio.component';



// Importacion de modelos
import { Colegio,GetColegio }  from '../../modelos/colegio';
import { GaleriaCol }  from '../../modelos/galeria-col';
import { GetBioPortada } from '../../modelos/biografia';
import { GetNucleoPortada }  from '../../modelos/mnt-admin-crabb';
import { PersonaRepositorio }  from '../../modelos/persona-repositorio';


declare const M

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit,AfterViewInit,OnDestroy {

  autoplay:any;
  elems: any;
  instances:any;

  colegioActual:string;
  persona: PersonaRepositorio=new PersonaRepositorio();
  lblNomUser:string="";

  perfil: Perfil=new Perfil();
  perfilArray:Perfil[];
  errorMessage: string;

  colegios:Perfil[];
  arrayColegio: Perfil[];
  arrayPortadas: GetNucleoPortada[];

  imagen: GaleriaCol=new GaleriaCol();

  /**Referente al carousel */
  options = { fullWidth: false,pressed:true, duration:300, indicators: false };

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
  );

  constructor(
      private mntAdminCrabbService:MntAdminCrabbService,
      private breakpointObserver: BreakpointObserver,
      private personaRepositorioService:PersonaRepositorioService,
      private perfilService:PerfilService,
      private rutas:Router,
      private galeriaColService:GaleriaColService,
      private biografiaService:BiografiaService,
      private colegioService:ColegioService,
      public  dialog            : MatDialog,
  ) { }




  CargarColegios() {

    console.log("Cargar colegioss");
    var perRepCod= JSON.parse(localStorage.getItem('idPerRep'));

    perRepCod=this.mntAdminCrabbService.decript(perRepCod);


    console.log(perRepCod);
    this.perfilService.getPerfilColegio(perRepCod)
      .subscribe(res => {

        
        this.perfilArray=res as Perfil[];
        
        var persona = {};
        this.arrayColegio = this.perfilArray.filter(function (e) { 
            return persona[e.colCod.colNom] ? false : (persona[e.colCod.colNom] = true);
        });


        console.log(this.arrayColegio);
      },
        error => this.errorMessage = <any>error);
  }

 
  SeleccionarColegio(perfil: Perfil){
    var col=perfil.colCod._id;
    console.log(col);
    col=this.mntAdminCrabbService.encript(col);
    localStorage.setItem('col',JSON.stringify(col));
    
    this.rutas.navigateByUrl('perfil/colegio');
  }


  getPortadas(){ // *Mofificar para mostrar las prtadas de la empresa

    this.mntAdminCrabbService.getPortadas()
    .pipe(delay(700)).subscribe(res=>{
      this.arrayPortadas=res as GetNucleoPortada[];
      console.log("Estas son las portadas de la empresa");
      console.log(this.arrayPortadas);

      setTimeout(() => {
        this.elems = document.querySelectorAll('.carousel');
        this.instances = M.Carousel.init(this.elems, this.options);
  
        this.autoplay= setInterval(function() {
          $('.carousel').carousel('next');
        }, 5000); // every 2 seconds
  
      }, 1000);
      
    });
     
  }

  CallModalOptBarra(){


    const mensaje="1";

    const dialogRef =this.dialog.open(ModalOptBarraComponent,{
      width: '250px',
      data: mensaje,
      
      
    });
    dialogRef.afterClosed().subscribe(res=>{

      const opc=this.perfilService.opcBarraModalSelected;
      if(opc=="1"){
        localStorage.removeItem('token');
          localStorage.removeItem('idPerRep');
          localStorage.removeItem('col');
          localStorage.removeItem('dni');
          localStorage.removeItem('prfactcod');
      
          this.rutas.navigateByUrl("inicio");
          this.perfilService.opcBarraModalSelected="";
      }
  

    }); 
  }

  GetNomUser(){
    let persona_id=JSON.parse(localStorage.getItem('idPerRep'));

    persona_id=this.mntAdminCrabbService.decript(persona_id);
    console.log("id per :" + persona_id);
    this.personaRepositorioService.getPersonaById(persona_id)
    .subscribe(res=>{
      this.persona=res as PersonaRepositorio;
      this.lblNomUser=this.persona.perRepNom + ", " + this.persona.perRepApe;
      console.log(this.lblNomUser);
    })
  }


  ngOnInit() {
    this.getPortadas();
    this.CargarColegios();
    this.GetNomUser();
  }

  ngAfterViewInit() {
    
    

  }

  ngOnDestroy(){
    console.log("destruir");
    clearInterval(this.autoplay);
    this.elems;
    this.instances;
    M.Carousel
  }

}
