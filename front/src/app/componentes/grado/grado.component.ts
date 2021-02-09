import { Component, OnInit,Input } from '@angular/core';
import { Grado, ListaGrados,GetGrado }  from '../../modelos/grado'; //Importar el modelo
import { GradoService } from '../../servicios/grado.service'; //Importar el servicio


@Component({
  selector: 'app-grado',
  templateUrl: './grado.component.html',
  styleUrls: ['./grado.component.css']
})
export class GradoComponent implements OnInit {

  @Input() inputColCod:string="5d8d1b245393e91480b3447b";

  readonly URL_API='http://localhost:3000/Inicio/Grado'; //Ruta de backend Grado

  ModeloGrado: Grado=new Grado();
  GetGradoArray:GetGrado[];

  divListar:boolean=true;
  divCrear:boolean=false;

  arrayGrado:ListaGrados[];
  gradoSeleccionado:string;
 
  _id:string;
  graDes:string;
  grado:string;

  constructor(private gradoService:GradoService) { }



  ShowDivListar(){
    this.divListar=true;
    this.divCrear=false;
  }

  ShowDivCrear(){
    this.divListar=false;
    this.divCrear=true;
  }


  CrearGrado(){
    console.log(this.grado);
    console.log(this.ModeloGrado.graDes);
    console.log(this.inputColCod);
    this.ModeloGrado.graNum=this.grado;
    this.ModeloGrado.colCod=this.inputColCod;

    console.log(this.ModeloGrado);

    return this.gradoService.postGrado(this.ModeloGrado)
    .subscribe(res => {    
      console.log(res);
      this.CargarTablaGrados();
    });
  }

  CargarTablaGrados(){
    return this.gradoService.getGrados()
    .subscribe(res => {  
      this.GetGradoArray = res as GetGrado[];
      console.log(this.GetGradoArray);
    });
  }

  EditarGrado(ArrayGrado: GetGrado){
    console.log(ArrayGrado);
    this._id=ArrayGrado._id;
    this.graDes=ArrayGrado.graDes;
    this.grado=ArrayGrado.graNum;

    this.ModeloGrado._id=this._id;
    this.ModeloGrado.graDes=this.graDes;
    this.gradoSeleccionado=this.grado;
  }

  LimpiarForm(){

    this.grado="";
    this.gradoSeleccionado="Grados";
    this.ModeloGrado=new Grado();
    this._id="";
  }

  CapturarGrado(val: any) {
    this.grado = val;
    console.log(this.grado);
  }









  ngOnInit() {
    this.CargarTablaGrados();

    this.arrayGrado=[
      {ListGradoId:0,ListGradoNom:"Seleccione Grado"},
      {ListGradoId:1,ListGradoNom:"1"},
      {ListGradoId:2,ListGradoNom:"2"},
      {ListGradoId:3,ListGradoNom:"3"},
      {ListGradoId:4,ListGradoNom:"4"},
      {ListGradoId:5,ListGradoNom:"5"},
      {ListGradoId:6,ListGradoNom:"6"},
    ]

    this.gradoSeleccionado="Seleccione Grado";
  }

  

}
