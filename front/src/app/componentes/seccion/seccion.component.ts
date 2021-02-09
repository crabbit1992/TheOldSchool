import { Component, OnInit, Input } from '@angular/core';
import { Seccion, ListaSeccion,GetSeccion }  from '../../modelos/seccion'; //Importar el modelo
import { SeccionService } from '../../servicios/seccion.service'; //Importar el servicio


@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})
export class SeccionComponent implements OnInit {

  @Input() inputColCod:string="5d8d1b245393e91480b3447b";

  readonly URL_API='http://localhost:3000/Inicio/Seccion'; //Ruta de backend Grado

  ModeloSeccion: Seccion=new Seccion();
  GetSeccionArray: GetSeccion[];

  divListar:boolean=true;
  divCrear:boolean=false;

  arraySeccion:ListaSeccion[];
  seccionSeleccionado:string;
 
  _id:string;
  secDes:string;
  seccion:string;

  constructor(private seccionService:SeccionService) { }

  ShowDivListar(){
    this.divListar=true;
    this.divCrear=false;
  }

  ShowDivCrear(){
    this.divListar=false;
    this.divCrear=true;
  }

  CrearSeccion(){
    console.log(this.seccion);
    console.log(this.ModeloSeccion.secDes);
    console.log(this.inputColCod);
    this.ModeloSeccion.secNom=this.seccion;
    this.ModeloSeccion.colCod=this.inputColCod;

    console.log(this.ModeloSeccion);

    return this.seccionService.postSeccion(this.ModeloSeccion)
    .subscribe(res => {    
      console.log(res);
      this.CargarTablaSeccion();
    });
  }

  CargarTablaSeccion(){
    return this.seccionService.getSeccion()
    .subscribe(res => {  
      this.GetSeccionArray = res as GetSeccion[];
      console.log(this.GetSeccionArray);
    });
  }

  CapturarSeccion(val: any) {
    this.seccion = val;
    console.log(this.seccion);
  }

  EditarSeccion(ArraySeccion: GetSeccion){
    console.log(ArraySeccion);
    this._id=ArraySeccion._id;
    this.secDes=ArraySeccion.secDes;
    this.seccion=ArraySeccion.secNom;

    this.ModeloSeccion._id=this._id;
    this.ModeloSeccion.secDes=this.secDes;
    this.seccionSeleccionado=this.seccion;
  }

  LimpiarForm(){

    this.seccion="";
    this.seccionSeleccionado="Grados";
    this.ModeloSeccion=new Seccion();
    this._id="";
  }

  ngOnInit() {

    this.CargarTablaSeccion();

    this.arraySeccion=[
      {ListSeccionId:0,ListSeccionNom:"Seccion"},
      {ListSeccionId:1,ListSeccionNom:"A"},{ListSeccionId:2,ListSeccionNom:"B"},{ListSeccionId:3,ListSeccionNom:"C"},
      {ListSeccionId:4,ListSeccionNom:"D"},{ListSeccionId:5,ListSeccionNom:"E"},{ListSeccionId:6,ListSeccionNom:"F"},
      {ListSeccionId:1,ListSeccionNom:"G"},{ListSeccionId:2,ListSeccionNom:"H"},{ListSeccionId:3,ListSeccionNom:"I"},
      {ListSeccionId:4,ListSeccionNom:"J"},{ListSeccionId:5,ListSeccionNom:"K"},{ListSeccionId:6,ListSeccionNom:"L"},
      {ListSeccionId:1,ListSeccionNom:"M"},{ListSeccionId:2,ListSeccionNom:"N"},{ListSeccionId:3,ListSeccionNom:"Ñ"},
      {ListSeccionId:4,ListSeccionNom:"O"},{ListSeccionId:5,ListSeccionNom:"P"},{ListSeccionId:6,ListSeccionNom:"Q"},
      {ListSeccionId:1,ListSeccionNom:"R"},{ListSeccionId:2,ListSeccionNom:"S"},{ListSeccionId:3,ListSeccionNom:"T"},
      {ListSeccionId:4,ListSeccionNom:"U"},{ListSeccionId:5,ListSeccionNom:"V"},{ListSeccionId:6,ListSeccionNom:"W"},
      {ListSeccionId:1,ListSeccionNom:"X"},{ListSeccionId:2,ListSeccionNom:"Y"},{ListSeccionId:3,ListSeccionNom:"Z"},
    ]

    this.seccionSeleccionado="Seccion";
  }



}
