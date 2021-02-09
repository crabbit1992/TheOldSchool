import { Component, OnInit,Input } from '@angular/core';
import { Turno, ListaTurno,GetTurno }  from '../../modelos/turno'; //Importar el modelo
import { TurnoService } from '../../servicios/turno.service'; //Importar el servicio

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {

  @Input() inputColCod:string="5d8d1b245393e91480b3447b";

  readonly URL_API='http://localhost:3000/Inicio/Turno'; //Ruta de backend Grado

  ModeloTurno: Turno=new Turno();
  GetTurnoArray:GetTurno[];

  divListar:boolean=true;
  divCrear:boolean=false;

  arrayTurno:ListaTurno[];
  turnoSeleccionado:string;
 
  _id:string;
  turDes:string;
  turno:string;
  constructor(private turnoService:TurnoService) { }

  ShowDivListar(){
    this.divListar=true;
    this.divCrear=false;
  }

  ShowDivCrear(){
    this.divListar=false;
    this.divCrear=true;
  }


  CrearTurno(){
    console.log(this.turno);
    console.log(this.ModeloTurno.turDes);
    console.log(this.inputColCod);
    this.ModeloTurno.turNom=this.turno;
    this.ModeloTurno.colCod=this.inputColCod;

    console.log(this.ModeloTurno);

    return this.turnoService.postTurno(this.ModeloTurno)
    .subscribe(res => {    
      console.log(res);
      this.CargarTablaTurno();
    });
  }

  CargarTablaTurno(){
    return this.turnoService.getTurno()
    .subscribe(res => {  
      this.GetTurnoArray = res as GetTurno[];
      console.log(this.GetTurnoArray);
    });
  }

  EditarTurno(ArrayTurno: GetTurno){
    console.log(ArrayTurno);
    this._id=ArrayTurno._id;
    this.turDes=ArrayTurno.turDes;
    this.turno=ArrayTurno.turNom;

    this.ModeloTurno._id=this._id;
    this.ModeloTurno.turDes=this.turDes;
    this.turnoSeleccionado=this.turno;
  }

  LimpiarForm(){

    this.turno="";
    this.turnoSeleccionado="Turno";
    this.ModeloTurno=new Turno();
    this._id="";
  }

  CapturarTurno(val: any) {
    this.turno = val;
    console.log(this.turno);
  }
  ngOnInit() {
    this.CargarTablaTurno();

    this.arrayTurno=[
      {ListTurnoId:0,ListTurnoNom:"Turno"},
      {ListTurnoId:1,ListTurnoNom:"Mañana"},
      {ListTurnoId:2,ListTurnoNom:"Tarde"},
      {ListTurnoId:3,ListTurnoNom:"Noche"},
    ]

    this.turnoSeleccionado="Turno";
    
  }

}
