import { Component, OnInit,Input,AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ModalOptionsComponent } from '../modal-options/modal-options.component';

import { Perfil } from '../../modelos/perfil';
import { PersonaRepositorio } from '../../modelos/persona-repositorio';
import { 
  frmEspejo,
  frmCargo,
  Administrador,
  Director,
  SubDirector,
  Coordinador,
  Profesor,
  Auxiliar,
  Alumno,
  Secretaria,
  Apoderado, 
  GetAlumno,
  AlumnoApoderado
  } from '../../modelos/cargos';
import { SelectCargos } from '../../modelos/cargos';

//Importar servicios
import { MantenimientoCargoService } from '../../servicios/mantenimiento-cargo.service';
import { PerfilService } from '../../servicios/perfil.service';
import { HistorialRegistroService } from '../../servicios/historial-registro.service';
import { PersonaRepositorioService } from '../../servicios/persona-repositorio.service';
import { async } from 'q';


declare var M: any;



@Component({
  selector: 'app-mantenimiento-cargo',
  templateUrl: './mantenimiento-cargo.component.html',
  styleUrls: ['./mantenimiento-cargo.component.css']
})
export class MantenimientoCargoComponent implements OnInit {

  @Input() inputPflActual:string;
  @Input() inputColCod:string;




  perfil: Perfil=new Perfil();
  perfilArray: Perfil[];
  pflArray:Perfil[]=[];
  aluArray:GetAlumno[];

  pflArrayFilter:Perfil[]=[];
  pflArrayFilterApe:Perfil[]=[];

  filteredPersona: PersonaRepositorio[];
  perArray: PersonaRepositorio[] = [];
  array: PersonaRepositorio[] = [];
  arrayAlumnos: GetAlumno[];
  arrayAlumApo: AlumnoApoderado[];

  filteredDni: PersonaRepositorio;
  errorMessage: string;

  frmCargo: frmCargo=new frmCargo();
  frmEspejo: frmEspejo=new frmEspejo();

  btnAsigAlum:boolean=false;
  btnVerAlumApo:boolean=false;

  administrador:Administrador=new Administrador();
  director:Director=new Director();
  subdirector:SubDirector=new SubDirector();
  coordinador:Coordinador=new Coordinador();
  profesor:Profesor=new Profesor();
  auxiliar:Auxiliar=new Auxiliar();
  alumno:Alumno=new Alumno();
  secretaria:Secretaria=new Secretaria();
  apoderado:Apoderado=new Apoderado();
  
  idPerRep:string="";
  perRepCodApod:string;
  perfilActual:string="";

  tipoPerfil:string="";
  opcApo:boolean=false;
  codApoSlt:string;

  li_Director:boolean=false;
  li_SubDirector:boolean=false;
  li_Coordinador:boolean=false;
  li_Profesor:boolean=false;
  li_Auxiliar:boolean=false;
  li_Alumno:boolean=false;
  li_Secretaria:boolean=false;
  li_Apoderado:boolean=false;

  btnCrearActBool=true;

  divListado: boolean=true ;
  divCrear: boolean=false ;

  divAsignarAlu: boolean=false;
  divFrmListAlum:boolean=false;
  divFrmListAlumApo:boolean=false;


  codPflSelected  :string;
  codMiemSelected :string;
  carCodSelected  :string;

  varModal :boolean=false;
  nomEstBtnTbl: "";

  arraySelectCargos:SelectCargos[];
  cargoSeleccionado: string;

  /** */

  varStyleListado: number=1;
  varStyleCrearCargo: number=0;

  /** */

  constructor(
    private personaRepositorioService : PersonaRepositorioService,
    private mantenimientoCargoService : MantenimientoCargoService,
    private perfilService             : PerfilService,
    private historialRegistroService  : HistorialRegistroService,
    public dialog                     : MatDialog,
  ) {}


  

 /** Bloque de codigo para realizar el filtrado de  personas en el registro de perfiles */
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


  /** Bloque de codigo para realizar el filtrado or apellidos en la lista de perfiles */

  _listFilterPerfApe: string;
  get listFilterPerfApe(): string {
    return this._listFilterPerfApe;
  }
  set listFilterPerfApe(value: string) {
    this._listFilterPerfApe = value;
    this.pflArray = this.listFilterPerfApe ? this.performFilterApe(this.listFilterPerfApe) : this.pflArrayFilterApe;
  }

  performFilterApe(filterBy: string): Perfil[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.pflArrayFilterApe.filter((perfil: Perfil) =>
      perfil.perRepCod.perRepApe.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

   /** Bloque de codigo para realizar el filtrado de alumnos en la lista de alumnos */

   _listFilterAluApe: string;
   get listFilterAluApe(): string {
     return this._listFilterPerfApe;
   }
   set listFilterAluApe(value: string) {
     this._listFilterPerfApe = value;
     this.aluArray = this.listFilterPerfApe ? this.performAluApe(this.listFilterAluApe) : this.arrayAlumnos;
   }
 
   performAluApe(filterBy: string): GetAlumno[] {
     filterBy = filterBy.toLocaleLowerCase();
     return this.arrayAlumnos.filter((alu: GetAlumno) =>
     alu.perRepCod.perRepApe.toLocaleLowerCase().indexOf(filterBy) !== -1);
   }
 



  HideDivs(){
    this.divAsignarAlu=false;
    this.divCrear=false;
    this.divListado=false;
    this.divFrmListAlum=false;
    this.divFrmListAlumApo=false;
    this.btnVerAlumApo=false;
    this.btnAsigAlum=false;
  }


  CrearPerfil(){
    console.log(this.tipoPerfil);
    this.CrearCargo();
  }

  SeleccionarPersona(persona:PersonaRepositorio){
    this.idPerRep=persona._id;

    this.frmEspejo.perdni=persona.perRepDni;
    this.frmEspejo.perNom=persona.perRepNom;
    this.frmEspejo.perApe=persona.perRepApe;
    this.frmEspejo.cargo=this.tipoPerfil;
    this.btnCrearActBool=false;
    console.log(this.idPerRep);
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

  CrearCargo(){
    if(this.tipoPerfil=="Administrador"){
      this.administrador.perRepCod= this.idPerRep;
      this.administrador.colCod= this.inputColCod;

       return this.mantenimientoCargoService.createAdministrador(this.administrador)
      .subscribe(res => {  

        var status=res["status"];

        if(status===200){
          M.toast({ html: 'Perfil Registrado !' });   
          console.log(res);
          this.CargarTablaPerfiles();
          this.btnCrearActBool=true;
          this.Limpiar();
        }
        else if(status===510){
          M.toast({ html: 'Ya existe un Administrador en el colegio' });   
          this.btnCrearActBool=true;
          this.Limpiar();
        }
      });
    }

    if(this.tipoPerfil=="Director"){
      this.director.perRepCod= this.idPerRep;
      this.director.colCod= this.inputColCod;

      return this.mantenimientoCargoService.createDirector(this.director)
      .subscribe(res => {  
        var status=res["status"];
        console.log(status);

        if(status===200){
          M.toast({ html: 'Perfil Registrado !' });   
          console.log(res);
          this.CargarTablaPerfiles();
          this.btnCrearActBool=true;
          this.Limpiar();
        }
        else if(status===510){
          M.toast({ html: 'Ya cuenta con el perfil de Director' });   
          this.btnCrearActBool=true;
          this.Limpiar();
        }
        else if(status===523){
          M.toast({ html: 'Ya existe un perfil habilitado con este cargo' });   
          this.btnCrearActBool=true;
          this.Limpiar();
        }
      });
    }

    if(this.tipoPerfil=="SubDirector"){
      this.subdirector.perRepCod= this.idPerRep;
      this.subdirector.colCod= this.inputColCod;

      return this.mantenimientoCargoService.createSubDirector(this.subdirector)
      .subscribe(res => {  
        var status=res["status"];

        if(status===200){
          M.toast({ html: 'Perfil Registrado !' });   
          console.log(res);
          this.CargarTablaPerfiles();
          this.btnCrearActBool=true;
          this.Limpiar();
        }
        else if(status===510){
          M.toast({ html: 'Ya cuenta con el perfil de SubDirector' });   
          this.btnCrearActBool=true;
          this.Limpiar();
        }
        else if(status===523){
          M.toast({ html: 'Ya existe un perfil habilitado con este cargo' });   
          this.btnCrearActBool=true;
          this.Limpiar();
        }
      });
    }

    if(this.tipoPerfil=="Coordinador"){
      this.coordinador.perRepCod= this.idPerRep;
      this.coordinador.colCod= this.inputColCod;

      return this.mantenimientoCargoService.createCoordinador(this.coordinador)
      .subscribe(res => {  
        var status=res["status"];

        if(status===200){
          M.toast({ html: 'Perfil Registrado !' });   
          console.log(res);
          this.CargarTablaPerfiles();
          this.btnCrearActBool=true;
          this.Limpiar();
        }
        else if(status===510){
          M.toast({ html: 'Ya cuenta con el perfil de Coordinador' });   
          this.btnCrearActBool=true;
          this.Limpiar();
        }
        else if(status===523){
          M.toast({ html: 'Ya existe un perfil habilitado con este cargo' });   
          this.btnCrearActBool=true;
          this.Limpiar();
        }
      });
    }

    if(this.tipoPerfil=="Apoderado"){
      this.apoderado.perRepCod= this.idPerRep;
      this.apoderado.colCod= this.inputColCod;

      return this.mantenimientoCargoService.createApoderado(this.apoderado)
      .subscribe(res => {  
        var status=res["status"];

        if(status===200){
          M.toast({ html: 'Perfil Registrado !' });   
          console.log(res);
          this.CargarTablaPerfiles();
          this.btnCrearActBool=true;
          this.Limpiar();
        }
        else{
          M.toast({ html: 'Error al registrar !' });   
          this.btnCrearActBool=true;
          this.Limpiar();
        }
      });
    }

    if(this.tipoPerfil=="Profesor"){
      this.profesor.perRepCod= this.idPerRep;
      this.profesor.colCod= this.inputColCod;

      return this.mantenimientoCargoService.createProfesor(this.profesor)
      .subscribe(res => {  
        var status=res["status"];

        if(status===200){
          M.toast({ html: 'Perfil Registrado !' });   
          console.log(res);
          this.CargarTablaPerfiles();
          this.btnCrearActBool=true;
          this.Limpiar();
        }
        else{
          M.toast({ html: 'Error al registrar !' });   
          this.btnCrearActBool=true;
          this.Limpiar();
        }
      });
    }

    if(this.tipoPerfil=="Auxiliar"){
      this.auxiliar.perRepCod= this.idPerRep;
      this.auxiliar.colCod= this.inputColCod;

      return this.mantenimientoCargoService.createAuxiliar(this.auxiliar)
      .subscribe(res => {  
        var status=res["status"];

        if(status===200){
          M.toast({ html: 'Perfil Registrado !' });   
          console.log(res);
          this.CargarTablaPerfiles();
          this.btnCrearActBool=true;
          this.Limpiar();
        }
        else{
          M.toast({ html: 'Error al registrar !' });   
          this.btnCrearActBool=true;
          this.Limpiar();
        }
      });
    }

    if(this.tipoPerfil=="Alumno"){
      this.alumno.perRepCod= this.idPerRep;
      this.alumno.colCod= this.inputColCod;

      return this.mantenimientoCargoService.createAlumno(this.alumno)
      .subscribe(res => {  
        var status=res["status"];

        if(status===200){
          M.toast({ html: 'Perfil Registrado !' });   
          console.log(res);
          this.CargarTablaPerfiles();
          this.btnCrearActBool=true;
          this.Limpiar();
        }
        else if(status===510){
          M.toast({ html: 'Ya es alumno en el colegio' });   
          this.btnCrearActBool=true;
          this.Limpiar();
        }
        else if(status===509){
          M.toast({ html: 'Alumno esta registrado en otro colegio' });   
          this.btnCrearActBool=true;
          this.Limpiar();
        }
      });
    }

    if(this.tipoPerfil=="Secretaria"){
      this.secretaria.perRepCod= this.idPerRep;
      this.secretaria.colCod= this.inputColCod;

      return this.mantenimientoCargoService.createSecretaria(this.secretaria)
      .subscribe(res => {  
        var status=res["status"];

        if(status===200){
          M.toast({ html: 'Perfil Registrado !' });   
          console.log(res);
          this.CargarTablaPerfiles();
          this.btnCrearActBool=true;
          this.Limpiar();
        }
        else{
          M.toast({ html: 'Error al registrar !' });   
          this.btnCrearActBool=true;
          this.Limpiar();
        }
      });
    }
  }

  Pre_DeshabilitarPerfil(perfil: Perfil){ //----> Metodo que se ejecuta al dar click en un registro
    console.log(perfil);
    this.codPflSelected =perfil._id;
    this.codMiemSelected=perfil.codMiem;
    this.carCodSelected =perfil.carCod._id;
  
    var estCodPerfil    =perfil.estCod._id;
    this.openDialog(estCodPerfil);//---------> Llama al cuadro de confirmacion 
  }

  openDialog(estado:string){
    if(estado==="5e0a8a3b9644411040ebf292"){ //Perfil Habilitado

      const dialogRef =this.dialog.open(ConfirmDialogComponent,{
        width: '250px',
        data:' ¿ Desea deshabilitar el Perfil ? ',
        
      });
      dialogRef.afterClosed().subscribe(res=>{
        if(res===true){       
 
          this.DeshabilitarPerfil();//----------> En caso el cuadro de dialogo devuelva true llamara al metodo DeshabilitarPerfil()
          console.log("Deshabilitar Perfil");
        }
        else{
          console.log("Operacion Cancelada");
        }
      });   
    }
    else if(estado==="5e0a8a479644411040ebf293"){ //Perfil Deshabilitado

      const dialogRef =this.dialog.open(ConfirmDialogComponent,{
        width: '250px',
        data:' ¿ Desea habilitar el Perfil ? '
      });
      dialogRef.afterClosed().subscribe(async res=>{
        if(res===true){
          this.HabilitarPerfil(); //----------> En caso el cuadro de dialogo devuelva false llamara al metodo DeshabilitarPerfil()
          console.log("Habilitar Perfil");
        }
        else{
          console.log("Operacion Cancelada");
        }
      });   
    }
  }

  openDlgApoAlu(alumno:GetAlumno){
    const dialogRef =this.dialog.open(ConfirmDialogComponent,{
      width: '250px',
      data:' ¿ Asignar el alumno al apoderado ? ',
      
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res===true){       

        this.AsignarAlumno(alumno);//----------> En caso el cuadro de dialogo devuelva true llamara al metodo DeshabilitarPerfil()
       
      }
      else{
        console.log("Operacion Cancelada");
      }
    });   
  }

  ModalOptions(){
  

    var objOptMntCargo={
      perfilActual:this.inputPflActual,
    }

    const dialogRef =this.dialog.open(ModalOptionsComponent,{
        width: '250px',
        data: objOptMntCargo,
        
      });

    dialogRef.afterClosed().subscribe(async res=>{
      var seSelecciono=this.mantenimientoCargoService.opcionSelected
      console.log("SE SELECCIONO : "+ seSelecciono);

      


      if(seSelecciono=="director"){
        this.ShowCrearPflDir();
   
      }
      else if(seSelecciono=="subdirector"){
        this.ShowCrearPflSubDir();
      }
      else if(seSelecciono=="coordinador"){
        this.ShowCrearPflCdr();
      }
      else if(seSelecciono=="profesor"){
        this.ShowCrearPflPfr();
      }
      else if(seSelecciono=="auxiliar"){
        this.ShowCrearPflAux();
      }
      else if(seSelecciono=="alumno"){
        this.ShowCrearPflAlu();
      }
      else if(seSelecciono=="listado"){
        this.ShowListado();
      }



    });   

  }

  HabilitarPerfil(){

    const objetoHabilitar={
      colCod:  this.inputColCod,
      codPfl:  this.codPflSelected,
      codMiem: this.codMiemSelected,
      carCod:  this.carCodSelected,
    }


    return this.perfilService.HabilitarPerfil(objetoHabilitar)
      .subscribe(res => {  

        var status=res["status"];
        console.log(status);
        if(status===200){

          this.cargoSeleccionado="1";
          this.CargarTablaPerfiles();
          M.toast({ html: ' El perfil fue Habilidato !' });   

          }else if(status===523){
            M.toast({ html: ' Ya existe un perfil habilitado con este cargo ' }); 
          }
          else if(status===509){
            M.toast({ html: ' El alumno esta registrado en otro colegio actualmente ' }); 
          }
          else{
            M.toast({ html: ' Hubo un error !' });
          }
      });     
  }

  DeshabilitarPerfil(){  //----> Metodo que Deshabilita el perfil seleccionado

    const objetoDeshabilitar={
      colCod:  this.inputColCod,
      codPfl:  this.codPflSelected,
      codMiem: this.codMiemSelected,
      carCod:  this.carCodSelected,
    }

    return this.perfilService.DeshabilitarPerfil(objetoDeshabilitar)
      .subscribe(async res => {  
        var status=res["status"];
        console.log(status);
        if(status===200){

        this.cargoSeleccionado="1";
        this.CargarTablaPerfiles();//----> Si el proceso se completo, llamara al metodo que recarga la tabla
        M.toast({ html: ' El perfil fue deshabilidato !' });   

        }else{
          M.toast({ html: ' Hubo un error !' });
        }
      });
  }

  CargarTablaPerfiles(){
    const colCod= this.inputColCod;
    this.perfilService.getPerfilesColegio(colCod)
      .subscribe(res => {
        console.log(res);
        this.perfilArray = res as Perfil[];
        this.arraySelectCargos=[];
        this.pflArrayFilter=[];

        if(this.inputPflActual==="5e0a9164c2a58d0b8872b2b8"){ // Perfil de administrador
          this.pflArray= [];
          for(var i=0;i<this.perfilArray.length;i++){
            if(
              this.perfilArray[i].carCod._id=="5e0a916dc2a58d0b8872b2b9" || 
              this.perfilArray[i].carCod._id=="5e0a9176c2a58d0b8872b2ba" ||
              this.perfilArray[i].carCod._id=="5e0a917ec2a58d0b8872b2bb" ||
              this.perfilArray[i].carCod._id=="5e0a9197c2a58d0b8872b2be" ||
              this.perfilArray[i].carCod._id=="5e0a9191c2a58d0b8872b2bd" ||
              this.perfilArray[i].carCod._id=="5e0a91bbc2a58d0b8872b2bf" ||
              this.perfilArray[i].carCod._id=="5e0a918cc2a58d0b8872b2bc" ||
              this.perfilArray[i].carCod._id=="5e0a91c3c2a58d0b8872b2c0"
              ){ 
              this.pflArray.push(this.perfilArray[i]);
            }
          } 
          this.arraySelectCargos=[
            {idCargo:"1",nombreCargo:"Ordenar por"},
            {idCargo:"5e0a916dc2a58d0b8872b2b9",nombreCargo:"Director"},
            {idCargo:"5e0a9176c2a58d0b8872b2ba",nombreCargo:"Subdirector"},
            {idCargo:"5e0a917ec2a58d0b8872b2bb",nombreCargo:"Coordinador"},
            {idCargo:"5e0a918cc2a58d0b8872b2bc",nombreCargo:"Secretaria"},
            {idCargo:"5e0a9197c2a58d0b8872b2be",nombreCargo:"Profesor"},
            {idCargo:"5e0a9191c2a58d0b8872b2bd",nombreCargo:"Auxiliar"},
            {idCargo:"5e0a91c3c2a58d0b8872b2c0",nombreCargo:"Apoderado"},
            {idCargo:"5e0a91bbc2a58d0b8872b2bf",nombreCargo:"Alumno"},
          ];
        }

        if(this.inputPflActual==="5e0a916dc2a58d0b8872b2b9"){ // Perfil de Director
          this.pflArray= [];
          for(var i=0;i<this.perfilArray.length;i++){
            if(
              this.perfilArray[i].carCod._id=="5e0a9176c2a58d0b8872b2ba" ||
              this.perfilArray[i].carCod._id=="5e0a917ec2a58d0b8872b2bb" ||
              this.perfilArray[i].carCod._id=="5e0a9197c2a58d0b8872b2be" ||
              this.perfilArray[i].carCod._id=="5e0a9191c2a58d0b8872b2bd" ||
              this.perfilArray[i].carCod._id=="5e0a91bbc2a58d0b8872b2bf" ||
              this.perfilArray[i].carCod._id=="5e0a918cc2a58d0b8872b2bc" ||
              this.perfilArray[i].carCod._id=="5e0a91c3c2a58d0b8872b2c0"
              ){ 
              this.pflArray.push(this.perfilArray[i]);
            }
          } 
          this.arraySelectCargos=[
            {idCargo:"1",nombreCargo:"Ordenar por"},
            {idCargo:"5e0a9176c2a58d0b8872b2ba",nombreCargo:"Subdirector"},
            {idCargo:"5e0a917ec2a58d0b8872b2bb",nombreCargo:"Coordinador"},
            {idCargo:"5e0a918cc2a58d0b8872b2bc",nombreCargo:"Secretaria"},
            {idCargo:"5e0a9197c2a58d0b8872b2be",nombreCargo:"Profesor"},
            {idCargo:"5e0a9191c2a58d0b8872b2bd",nombreCargo:"Auxiliar"},
            {idCargo:"5e0a91bbc2a58d0b8872b2bf",nombreCargo:"Alumno"},
          ];
        }
        
        if(this.inputPflActual==="5e0a9176c2a58d0b8872b2ba"){ // //Perfil de Subdirector
          this.pflArray= [];
          for(var i=0;i<this.perfilArray.length;i++){
            if(
              this.perfilArray[i].carCod._id=="5e0a917ec2a58d0b8872b2bb" ||
              this.perfilArray[i].carCod._id=="5e0a9197c2a58d0b8872b2be" ||
              this.perfilArray[i].carCod._id=="5e0a9191c2a58d0b8872b2bd" ||
              this.perfilArray[i].carCod._id=="5e0a91bbc2a58d0b8872b2bf"
              ){ 
              this.pflArray.push(this.perfilArray[i]);
            }
          } 
          this.arraySelectCargos=[
            {idCargo:"1",nombreCargo:"Ordenar por"},
            {idCargo:"5e0a917ec2a58d0b8872b2bb",nombreCargo:"Coordinador"},
            {idCargo:"5e0a9197c2a58d0b8872b2be",nombreCargo:"Profesor"},
            {idCargo:"5e0a9191c2a58d0b8872b2bd",nombreCargo:"Auxiliar"},
            {idCargo:"5e0a91bbc2a58d0b8872b2bf",nombreCargo:"Alumno"},
          ];
        }

        if(this.inputPflActual==="5e0a917ec2a58d0b8872b2bb"){ // //Perfil de Coordinador
          this.pflArray= [];
          for(var i=0;i<this.perfilArray.length;i++){
            if(
              this.perfilArray[i].carCod._id=="5e0a9197c2a58d0b8872b2be" ||
              this.perfilArray[i].carCod._id=="5e0a9191c2a58d0b8872b2bd" ||
              this.perfilArray[i].carCod._id=="5e0a91bbc2a58d0b8872b2bf"
              ){ 
              this.pflArray.push(this.perfilArray[i]);
            }
          } 
          this.arraySelectCargos=[
            {idCargo:"1",nombreCargo:"Ordenar por"},
            {idCargo:"5e0a9197c2a58d0b8872b2be",nombreCargo:"Profesor"},
            {idCargo:"5e0a9191c2a58d0b8872b2bd",nombreCargo:"Auxiliar"},
            {idCargo:"5e0a91bbc2a58d0b8872b2bf",nombreCargo:"Alumno"},
          ];
        }

        if(this.inputPflActual==="5e0a918cc2a58d0b8872b2bc"){ // //Perfil de Secretaria
          this.pflArray= [];
          for(var i=0;i<this.perfilArray.length;i++){
            if(
              this.perfilArray[i].carCod._id=="5e0a91c3c2a58d0b8872b2c0" ||
              this.perfilArray[i].carCod._id=="5e0a91bbc2a58d0b8872b2bf"
              ){ 
              this.pflArray.push(this.perfilArray[i]);
            }
          } 
          this.arraySelectCargos=[
            {idCargo:"1",nombreCargo:"Ordenar por"},
            {idCargo:"5e0a91c3c2a58d0b8872b2c0",nombreCargo:"Apoderado"},
            {idCargo:"5e0a91bbc2a58d0b8872b2bf",nombreCargo:"Alumno"},
          ];
        }


        if(this.inputPflActual==="5e0a9197c2a58d0b8872b2be"){ // //Perfil de Profesor
          this.pflArray= [];
          for(var i=0;i<this.perfilArray.length;i++){
            if(
              this.perfilArray[i].carCod._id=="5e0a91bbc2a58d0b8872b2bf"
              ){ 
              this.pflArray.push(this.perfilArray[i]); 
            }
          }
          this.arraySelectCargos=[
            {idCargo:"1",nombreCargo:"Ordenar por"},
            {idCargo:"5e0a91bbc2a58d0b8872b2bf",nombreCargo:"Alumno"},
          ];
        }

        if(this.inputPflActual==="5e0a9191c2a58d0b8872b2bd"){ // //Perfil de Auxiliar
          this.pflArray= [];
          for(var i=0;i<this.perfilArray.length;i++){
            if(
              this.perfilArray[i].carCod._id=="5e0a91bbc2a58d0b8872b2bf"
              ){ 
              this.pflArray.push(this.perfilArray[i]); 
            }
          }
          this.arraySelectCargos=[
            {idCargo:"1",nombreCargo:"Ordenar por"},
            {idCargo:"5e0a91bbc2a58d0b8872b2bf",nombreCargo:"Alumno"},
          ];
        }
        
        this.pflArrayFilter=this.pflArray;
        this.pflArrayFilterApe=this.pflArray;
        console.log("esto es pflarrayFilter");
        console.log(this.pflArrayFilter);
      },
        error => this.errorMessage = <any>error);
  }


  Limpiar(){

    this.frmEspejo= new frmEspejo();
    this.idPerRep="";
    this.btnCrearActBool=true;
  }

  ShowListado(){
    this.HideDivs();
    this.divListado=true;
    
    this.tipoPerfil="";
    this.varStyleListado=1;
    this.varStyleCrearCargo=0;

    console.log("varStyleListado = " +this.varStyleListado);
  }

  ShowCrearPflAdm(){
    this.HideDivs()
    this.divCrear=true;

    this.Limpiar();

    this.tipoPerfil="Administrador";
  }

  ShowCrearPflDir(){
    this.HideDivs()
    this.divCrear=true;

    this.Limpiar();
    this.tipoPerfil="Director";
    this.varStyleCrearCargo=1;
    this.varStyleListado=0;
  }

  ShowCrearPflSubDir(){
    this.HideDivs()
    this.divCrear=true;

    this.Limpiar();
    this.tipoPerfil="SubDirector";
    this.varStyleCrearCargo=1;
    this.varStyleListado=0;
  }

  ShowCrearPflCdr(){
    this.HideDivs()
    this.divCrear=true;
    this.Limpiar();

    this.tipoPerfil="Coordinador";
    this.varStyleCrearCargo=1;
    this.varStyleListado=0;
  }

  ShowCrearPflPfr(){
    this.HideDivs()
    this.divCrear=true;
    this.Limpiar();

    this.tipoPerfil="Profesor";
    this.varStyleCrearCargo=1;
    this.varStyleListado=0;
  }

  ShowCrearPflAux(){
    this.HideDivs()
    this.divCrear=true;
    this.Limpiar();

    this.tipoPerfil="Auxiliar"
    this.varStyleCrearCargo=1;
    this.varStyleListado=0;
  }

  ShowCrearPflAlu(){
    this.HideDivs()
    this.divCrear=true;
    this.Limpiar();

    this.tipoPerfil="Alumno";
    this.varStyleCrearCargo=1;
    this.varStyleListado=0;
  }

  ShowCrearPflSec(){
    this.HideDivs()
    this.divCrear=true;
    this.Limpiar();

    this.tipoPerfil="Secretaria";
    this.varStyleCrearCargo=1;
    this.varStyleListado=0;
  }

  ShowCrearPflApo(){
    this.HideDivs()
    this.divCrear=true;
    this.Limpiar();

    this.tipoPerfil="Apoderado";
    this.varStyleCrearCargo=1;
    this.varStyleListado=0;
  }

  ShowMiListaAlumnos( perfil: Perfil){
    console.log(perfil);
    this.codApoSlt=perfil.codMiem;
    this.perRepCodApod=perfil.perRepCod._id;

    this.HideDivs();
    this.divAsignarAlu=true;
    this.divFrmListAlumApo=true;
    this.btnAsigAlum=true;
  
    this.mantenimientoCargoService.getAlumnosApoderado(this.inputColCod,this.perRepCodApod)
    .subscribe(res=>{
      console.log(res);
      
      this.arrayAlumApo=res as AlumnoApoderado[];
    })
  }

  ShowVerAluApo(){
    this.btnAsigAlum=true;
    this.btnVerAlumApo=false;
    this.divFrmListAlum=false;
    this.divFrmListAlumApo=true;
  }

  AsignarAlumno(alumno:GetAlumno){

    console.log(this.codApoSlt);

    this.mantenimientoCargoService.asignarApoderado(alumno._id, this.codApoSlt)
    .subscribe(res=>{

      this.mantenimientoCargoService.getAlumnosApoderado(this.inputColCod,this.perRepCodApod)
      .subscribe(res=>{
      console.log(res);
      
      this.arrayAlumApo=res as AlumnoApoderado[];
      })
      console.log(res);
      this.btnAsigAlum=true;
      this.btnVerAlumApo=false;
      this.divFrmListAlum=false;
      this.divFrmListAlumApo=true;
    });
  }

  DesvincularAlu(aluCod:string){

    console.log(aluCod);
    this.mantenimientoCargoService.deleteApoderado(aluCod)
    .subscribe(res=>{

      var status=res["status"];

      if(status===200){
        this.mantenimientoCargoService.getAlumnosApoderado(this.inputColCod,this.perRepCodApod)
        .subscribe(res=>{
          console.log(res);
          
          this.arrayAlumApo=res as AlumnoApoderado[];
          this.divFrmListAlumApo=true;
        })

        
        M.toast({ html: 'Se desvinculo del alumno !' });        
      }else{
       
        M.toast({ html: 'No se completo la operacion !' });
      }  
    })
  }

  ShowAsignarAlu(){
    this.HideDivs();
    this.cargarAlumnos();
    this.divAsignarAlu=true;
    this.divFrmListAlum=true;
    this.btnVerAlumApo=true;
    
  }

  cargarAlumnos(){

    return this.mantenimientoCargoService.getAlumnosColegio(this.inputColCod)
    .subscribe(res=>{
      this.arrayAlumnos= res as GetAlumno[];
      this.aluArray=res as GetAlumno[];
      console.log(this.arrayAlumnos);
    });
  }

  Privilegios(){

    this.perfilActual= this.inputPflActual;
    //console.log("este es el perfil actual"+this.inputPflActual);

    if(this.perfilActual==="5e0a9164c2a58d0b8872b2b8"){ //Admnistrador    
      this.li_Director=true;
      this.li_SubDirector=true;
      this.li_Coordinador=true;
      this.li_Profesor=true;
      this.li_Auxiliar=true;
      this.li_Alumno=true;
      this.li_Secretaria=true;
      this.li_Apoderado=true;
      console.log("li administrador")
    }

    if(this.perfilActual==="5e0a916dc2a58d0b8872b2b9"){ //Director
      this.li_Director=false;
      this.li_SubDirector=false;
      this.li_Coordinador=false;
      this.li_Profesor=true;
      this.li_Auxiliar=false;
      this.li_Alumno=true;
      this.li_Secretaria=true;
      this.li_Apoderado=true;
    }

    if(this.perfilActual==="5e0a9176c2a58d0b8872b2ba"){ //Subdirector
      this.li_Director=false;
      this.li_SubDirector=false;
      this.li_Coordinador=false;
      this.li_Profesor=true;
      this.li_Auxiliar=false;
      this.li_Alumno=true;
      this.li_Apoderado=true;
    }

    if(this.perfilActual==="5e0a917ec2a58d0b8872b2bb"){ //Coordinador
      this.li_Director=false;
      this.li_SubDirector=false;
      this.li_Coordinador=false;
      this.li_Profesor=true;
      this.li_Auxiliar=false;
      this.li_Alumno=true;
      this.li_Apoderado=true;
    }

    if(this.perfilActual==="5e0a918cc2a58d0b8872b2bc"){ //Secretaria  
      this.li_Alumno=true;
      this.li_Apoderado=true;
    }

    if(this.perfilActual==="5e0a9197c2a58d0b8872b2be"){ //Profesor
      
    }

    if(this.perfilActual==="5e0a9191c2a58d0b8872b2bd"){ //Auxiliar

    }

    if(this.perfilActual==="5e0a91bbc2a58d0b8872b2bf"){ //Alumno

    }

  }

  capturarCargo(val: any) {
    this.cargoSeleccionado = val;
    
    const objetoCargo={
      colCod: this.inputColCod,
      carCod: this.cargoSeleccionado,
    }

    this.opcApo=false;
    if(objetoCargo.carCod=="1"){
      this.CargarTablaPerfiles();
    }
    else{

      if(objetoCargo.carCod=="5e0a91c3c2a58d0b8872b2c0"){
        this.opcApo=true;
      }

      return this.perfilService.getPlfSegunCargo(objetoCargo)
      .subscribe(res=>{
        this.pflArray= res as Perfil[];
        this.pflArrayFilterApe=this.pflArray;
        console.log(this.pflArray);
      });
    }
  }


  ngOnInit() {
    
    this.CargarTablaPerfiles();
    this.CargarTabla();
    this.Privilegios();
    console.log("perfil actual "+this.inputPflActual);
    console.log("este es el codigo de coleegio : "+this.inputColCod);
    this.cargoSeleccionado="1";
  }

  ngAfterViewInit() {
    // no errors
    var elems = document.querySelectorAll('.modal,.dropdown-trigger');
    var instances = M.Modal.init(elems);
  }
}
