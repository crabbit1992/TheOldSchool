import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { PersonaService } from '../../servicios/persona.service';
import { PersonaRepositorioService } from '../../servicios/persona-repositorio.service';
import {Persona,FrmPersona,Dia,Mes,Anio}  from '../../modelos/persona';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { LoginComponent } from '../login/login.component';


declare var M: any;
@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  readonly URL_API='http://localhost:3000/Inicio/Persona';

  @Input() hijo: string;
  @Output()
  send: EventEmitter<string>=new EventEmitter<string>();
  alert: string;



  frmPersona: FrmPersona=new FrmPersona();
  ModeloPersona: Persona=new Persona();
  dia:Dia[];
  mes:Mes[];
  anio:Anio[];
  diaSeleccionado:string;
  mesSeleccionado:string;
  anioSeleccionado:string;
  diaFch:string;
  mesFch:string;
  AnioFch:string;
  ok: boolean = true;
  DniExist:boolean=true;

  DniInputEnable:boolean=false;
  nomBotonValidar:string="Validar";
  corRedOn:boolean=true;
  pasRedOn:boolean=true;

  registro:boolean=false;
  login: boolean=false;

  rb:boolean=true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
  );

  get(e){
    console.log(e);
  }



  constructor(
    private personaService:PersonaService,
    private personaRepService: PersonaRepositorioService,
    private breakpointObserver: BreakpointObserver
    ) { 

  }



  ValidarCampoDni():boolean{
    this.ok=true; 
    var expresionDni = /^[0-9]+$/;

    if (this.frmPersona.perDni === null || this.frmPersona.perDni === undefined || this.frmPersona.perDni === "") {
      M.toast({ html: 'Ingrese su DNI' });
      this.ok = false;
    } else if (this.frmPersona.perDni.substr(0, 1) == " ") {
      M.toast({ html: 'Evita espacios al inicio (DNI)' });
      this.ok = false;
    } else if (!expresionDni.test(this.frmPersona.perDni)) {  
      M.toast({ html: 'DNI no valido' });;
      this.ok = false;
    } else if (this.frmPersona.perDni.length < 8) {
      M.toast({ html: 'DNI debe ser 8 digitos' });
      this.ok = false;
    }
    return this.ok;
  }

  ValidarDni():boolean{

    if(this.nomBotonValidar==="Nuevo"){
      this.DniInputEnable=false;
      this.DniExist=true;
      this.nomBotonValidar="Validar";
      this.frmPersona.perDni="";
      this.frmPersona.perNom="";
      this.frmPersona.perApe="";
      this.frmPersona.perSex="";
      this.diaSeleccionado="Dia";
      this.mesSeleccionado="Mes";
      this.anioSeleccionado="Año";
      this.frmPersona.perCorreo="";
      this.frmPersona.perPas="";
      this.frmPersona.perPasConfirm="";
      this.corRedOn=true;
      this.pasRedOn=true
    }
    else if(this.nomBotonValidar==="Validar"){
      var objDni={
        perRep_id: "",
        perRepApe: "",
        perRepCod: "",
        perRepDir: "",
        perRepDni: "",
        perRepFchNac: "",
        perRepNom: "",
        perRepSex: ""
      }  
    }

    if(this.ValidarCampoDni()===true){
      this.personaRepService.getPersonaDni(this.frmPersona.perDni)
      .subscribe(res=>{
    
        if(res===null){   
            M.toast({ html: 'DNI no se encuentra registrado' });
        }
        else{
          this.nomBotonValidar="Nuevo";
          this.DniInputEnable=true;
          this.DniExist=false;
          this.corRedOn=false;
          this.pasRedOn=false;
          objDni.perRep_id=res["_id"];
          objDni.perRepNom=res["perRepNom"];
          objDni.perRepApe=res["perRepApe"];
          objDni.perRepSex=res["perRepSex"];
          objDni.perRepFchNac=res["perRepFchNac"];
  
          this.AnioFch= objDni.perRepFchNac.substr(0, 4);
          this.mesFch= objDni.perRepFchNac.substr(-19, 2);
          this.diaFch= objDni.perRepFchNac.substr(-16, 2);
          
          objDni.perRepFchNac=this.AnioFch+"-"+this.mesFch+"-"+this.diaFch;
  
          if (this.mesFch == "01") { this.mesSeleccionado = "Ene"; }
          if (this.mesFch == "02") { this.mesSeleccionado = "Feb"; }
          if (this.mesFch == "03") { this.mesSeleccionado = "Mar"; }
          if (this.mesFch == "04") { this.mesSeleccionado = "Abr"; }
          if (this.mesFch == "05") { this.mesSeleccionado = "May"; }
          if (this.mesFch == "06") { this.mesSeleccionado = "Jun"; }
          if (this.mesFch == "07") { this.mesSeleccionado = "Jul"; }
          if (this.mesFch == "08") { this.mesSeleccionado = "Ago"; }
          if (this.mesFch == "09") { this.mesSeleccionado = "Set"; }
          if (this.mesFch == "10") { this.mesSeleccionado = "Oct"; }
          if (this.mesFch == "11") { this.mesSeleccionado = "Nov"; }
          if (this.mesFch == "12") { this.mesSeleccionado = "Dic"; }
  
          this.frmPersona.perRep_id=objDni.perRep_id;
          this.frmPersona.perNom=objDni.perRepNom;
          this.frmPersona.perApe=objDni.perRepApe;
          this.frmPersona.perSex=objDni.perRepSex;
          this.diaSeleccionado=this.diaFch;
          this.mesSeleccionado=this.mesSeleccionado;
          this.anioSeleccionado=this.AnioFch;
          console.log(this.frmPersona); 
 
        }    
      });
    }
    return this.DniExist;
  }

  validarCampos():boolean{
    var expresionCorreo=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    this.ok=true; 

    if (this.frmPersona.perCorreo === null || this.frmPersona.perCorreo === undefined || this.frmPersona.perCorreo === "") {
      M.toast({ html: 'El correo es requerido' });
      this.ok = false;
    } else if (this.frmPersona.perCorreo.substr(0, 1) == " ") {
      M.toast({ html: 'Evita espacios al inicio (Correo)' });
      this.ok = false;
    } else if (!expresionCorreo.test(this.frmPersona.perCorreo)) {  
      M.toast({ html: 'Correo no valido' });;
      this.ok = false;
    }

    if (this.frmPersona.perPas === null || this.frmPersona.perPas === undefined || this.frmPersona.perPas === "") {
      M.toast({ html: 'Debe ingresar una contraseña' });
      this.ok = false;
    } else if (this.frmPersona.perPas.substr(0, 1) == " ") {
      M.toast({ html: 'Evita espacios al inicio (Contraseña)' });
      this.ok = false;
    }

    if(this.frmPersona.perPasConfirm === null||this.frmPersona.perPasConfirm === ""||this.frmPersona.perPasConfirm === undefined ){
      M.toast({ html: 'Debe confirmar la contraseña' });
      this.ok = false;
    }
    else if(this.frmPersona.perPas!=this.frmPersona.perPasConfirm){
      M.toast({ html: 'Las contraseñas no coinciden' });
      this.ok = false ;
    }

    return this.ok; 
  }
  
  CrearPersona(){

    if(this.validarCampos()===true){
      this.ModeloPersona.perRep_Id=this.frmPersona.perRep_id;
      this.ModeloPersona.perNom=this.frmPersona.perNom;
      this.ModeloPersona.perApe=this.frmPersona.perApe;
      this.ModeloPersona.perCorreo=this.frmPersona.perCorreo;
      this.ModeloPersona.perDni=this.frmPersona.perDni;
      this.ModeloPersona.perPas=this.frmPersona.perPas;
      this.ModeloPersona.perSex=this.frmPersona.perSex;
      this.ModeloPersona.perFchNac=this.AnioFch+"-"+this.mesFch+"-"+this.diaFch;
      
      console.log(this.ModeloPersona.perRep_Id);  
  
      return this.personaService.postPersona(this.ModeloPersona)
      .subscribe(res=>{
       

        var status=res["status"];
        console.log(status)

        if(status==200){
          M.toast({ html: 'Bienvenido!.  Ahora ingresa a tu cuenta' });  
          this.alert="1";
          
          this.send.emit(this.alert);
        
          this.frmPersona.perDni="";
          this.frmPersona.perNom="";
          this.frmPersona.perApe="";
          this.frmPersona.perSex="";
          this.frmPersona.perCorreo="";
          this.frmPersona.perPas="";
          this.diaSeleccionado="Dia";
          this.mesSeleccionado="Mes";
          this.anioSeleccionado="Año";
        }
        else if(status==521){
          M.toast({ html: 'Este correo ya se encuentra registrado !' });  
        }
        else if(status==522){
          M.toast({ html: 'Este DNI ya se encuentra registrado !' }); 
        }
      });
    }
  }  

  funGet(e){
    console.log(e);
    this.registro=true;
  }

  ngOnInit() {

   
    

      this.dia=[
        {idDia:0,nomDia:"Dia"},
        {idDia:1,nomDia:"01"},{idDia:2,nomDia:"02"},{idDia:3,nomDia:"03"},{idDia:4,nomDia:"04"},{idDia:5,nomDia:"05"},
        {idDia:6,nomDia:"06"},{idDia:7,nomDia:"07"},{idDia:8,nomDia:"08"},{idDia:9,nomDia:"09"},{idDia:10,nomDia:"10"},{idDia:11,nomDia:"11"},
        {idDia:12,nomDia:"12"},{idDia:13,nomDia:"13"},{idDia:14,nomDia:"14"},{idDia:15,nomDia:"15"},{idDia:16,nomDia:"16"},
        {idDia:17,nomDia:"17"},{idDia:18,nomDia:"18"},{idDia:19,nomDia:"19"},{idDia:20,nomDia:"20"},{idDia:21,nomDia:"21"},
        {idDia:22,nomDia:"22"},{idDia:23,nomDia:"23"},{idDia:24,nomDia:"24"},{idDia:25,nomDia:"25"},{idDia:26,nomDia:"26"},
        {idDia:27,nomDia:"27"},{idDia:28,nomDia:"28"},{idDia:29,nomDia:"29"},{idDia:30,nomDia:"30"},{idDia:31,nomDia:"31"},
      ];

      this.mes=[
        {idMes:0,nomMes:"Mes"},
        {idMes:1,nomMes:"Ene"},
        {idMes:2,nomMes:"Feb"},
        {idMes:3,nomMes:"Mar"},
        {idMes:4,nomMes:"Abr"},
        {idMes:5,nomMes:"May"},
        {idMes:6,nomMes:"Jun"},
        {idMes:7,nomMes:"Jul"},
        {idMes:8,nomMes:"Ago"},
        {idMes:9,nomMes:"Set"},
        {idMes:10,nomMes:"Oct"},
        {idMes:11,nomMes:"Nov"},
        {idMes:12,nomMes:"Dic"},
      ];

      this.anio=[
        {idAnio:0,nomAnio:"Año"},{idAnio:2019,nomAnio:"2019"}, {idAnio:2018,nomAnio:"2018"},{idAnio:2017,nomAnio:"2017"},
        {idAnio:2016,nomAnio:"2016"},{idAnio:2015,nomAnio:"2015"},{idAnio:2014,nomAnio:"2014"},{idAnio:2013,nomAnio:"2013"},
        {idAnio:2012,nomAnio:"2012"},{idAnio:2011,nomAnio:"2011"},{idAnio:2010,nomAnio:"2010"},{idAnio:2009,nomAnio:"2009"},
        {idAnio:2008,nomAnio:"2008"},{idAnio:2007,nomAnio:"2007"},{idAnio:2006,nomAnio:"2006"},{idAnio:2005,nomAnio:"2005"},
        {idAnio:2004,nomAnio:"2004"},{idAnio:2003,nomAnio:"2003"}, {idAnio:2002,nomAnio:"2002"},{idAnio:2001,nomAnio:"2001"},
        {idAnio:2000,nomAnio:"2000"},{idAnio:1999,nomAnio:"1999"},{idAnio:1998,nomAnio:"1998"},{idAnio:1997,nomAnio:"1997"},
        {idAnio:1996,nomAnio:"1996"},{idAnio:1995,nomAnio:"1995"},{idAnio:1994,nomAnio:"1994"},{idAnio:1993,nomAnio:"1993"},
        {idAnio:1992,nomAnio:"1992"},{idAnio:1991,nomAnio:"1991"},{idAnio:1990,nomAnio:"1990"},{idAnio:1989,nomAnio:"1989"},
        {idAnio:1988,nomAnio:"1988"},{idAnio:1987,nomAnio:"1987"},{idAnio:1986,nomAnio:"1986"},{idAnio:1985,nomAnio:"1985"},
        {idAnio:1984,nomAnio:"1984"},{idAnio:1983,nomAnio:"1983"}, {idAnio:1982,nomAnio:"1982"},{idAnio:1981,nomAnio:"1981"},
        {idAnio:1980,nomAnio:"1980"},{idAnio:1979,nomAnio:"1979"},{idAnio:1978,nomAnio:"1978"},{idAnio:1976,nomAnio:"1976"},
      ];
      this.anioSeleccionado="Año";
      this.mesSeleccionado="Mes";
      this.diaSeleccionado="Dia";
  }
}
