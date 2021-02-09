import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

/**Servicios */
import { MantenimientoCargoService } from '../../servicios/mantenimiento-cargo.service';



@Component({
  selector: 'app-modal-options',
  templateUrl: './modal-options.component.html',
  styleUrls: ['./modal-options.component.css']
})
export class ModalOptionsComponent implements OnInit {

  li_Director:boolean=false;
  li_SubDirector:boolean=false;
  li_Coordinador:boolean=false;
  li_Profesor:boolean=false;
  li_Auxiliar:boolean=false;
  li_Alumno:boolean=false;
  perfilActual:string="";
  constructor(
    public dialogRef: MatDialogRef<ModalOptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private mantenimientoCargoService : MantenimientoCargoService,
    ) { }

    Privilegios(){

      this.perfilActual= this.message["perfilActual"];
      //console.log("este es el perfil actual"+this.inputPflActual);
  
      if(this.perfilActual==="5e0a9164c2a58d0b8872b2b8"){ //Admnistrador    
        this.li_Director=true;
        this.li_SubDirector=true;
        this.li_Coordinador=true;
        this.li_Profesor=true;
        this.li_Auxiliar=true;
        this.li_Alumno=true;
        console.log("li administrador")
      }
  
      if(this.perfilActual==="5e0a916dc2a58d0b8872b2b9"){ //Director
        this.li_Director=false;
        this.li_SubDirector=false;
        this.li_Coordinador=false;
        this.li_Profesor=true;
        this.li_Auxiliar=false;
        this.li_Alumno=true;
      }
  
      if(this.perfilActual==="5e0a9176c2a58d0b8872b2ba"){ //Subdirector
        this.li_Director=false;
        this.li_SubDirector=false;
        this.li_Coordinador=false;
        this.li_Profesor=true;
        this.li_Auxiliar=false;
        this.li_Alumno=true;
      }
  
      if(this.perfilActual==="5e0a917ec2a58d0b8872b2bb"){ //Coordinador
        this.li_Director=false;
        this.li_SubDirector=false;
        this.li_Coordinador=false;
        this.li_Profesor=true;
        this.li_Auxiliar=false;
        this.li_Alumno=true;
      }
  
      if(this.perfilActual==="5e0a9197c2a58d0b8872b2be"){ //Profesor
        this.li_Alumno=true;
      }
  
      if(this.perfilActual==="5e0a9191c2a58d0b8872b2bd"){ //Auxiliar
  
      }
  
      if(this.perfilActual==="5e0a91bbc2a58d0b8872b2bf"){ //Alumno
  
      }
    }

    ShowListado(){
      this.mantenimientoCargoService.opcionElegida("listado");
        this.dialogRef.close();

    }

    Seleccionar(opcion:string){
     console.log(opcion);
      if(opcion=="director"){
        this.mantenimientoCargoService.opcionElegida(opcion);
        this.dialogRef.close();

      }
      else if(opcion=="subdirector"){
        this.mantenimientoCargoService.opcionElegida(opcion);
        this.dialogRef.close();
      }
      else if(opcion=="coordinador"){
        this.mantenimientoCargoService.opcionElegida(opcion);
        this.dialogRef.close();
      }
      else if(opcion=="profesor"){
        this.mantenimientoCargoService.opcionElegida(opcion);
        this.dialogRef.close();
      }
      else if(opcion=="auxiliar"){
        this.mantenimientoCargoService.opcionElegida(opcion);
        this.dialogRef.close();
      }
      else if(opcion=="alumno"){
        this.mantenimientoCargoService.opcionElegida(opcion);
        this.dialogRef.close();
      }



    }

  ngOnInit() {
    console.log(this.message);
    this.Privilegios();
  }

}
