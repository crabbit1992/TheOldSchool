import { Component, OnInit,Input } from '@angular/core';
import { Nivel, ListaNivel,GetNivel }  from '../../modelos/nivel'; //Importar el modelo
import { NivelService } from '../../servicios/nivel.service'; //Importar el servicio

@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.css']
})
export class NivelComponent implements OnInit {
  @Input() inputColCod:string="5d8d1b245393e91480b3447b";

  readonly URL_API='http://localhost:3000/Inicio/Nivel'; //Ruta de backend Grado

  ModeloNivel: Nivel=new Nivel();
  GetNivelArray:GetNivel[];

  divListar:boolean=true;
  divCrear:boolean=false;

  arrayNivel:ListaNivel[];
  nivelSeleccionado:string;
 
  _id:string;
  nivDes:string;
  nivel:string;

  constructor(private nivelService:NivelService) { }

  ShowDivListar(){
    this.divListar=true;
    this.divCrear=false;
  }

  ShowDivCrear(){
    this.divListar=false;
    this.divCrear=true;
  }


  CrearNivel(){
    console.log(this.nivel);
    console.log(this.ModeloNivel.nivDes);
    console.log(this.inputColCod);
    this.ModeloNivel.nivNum=this.nivel;
    this.ModeloNivel.colCod=this.inputColCod;

    console.log(this.ModeloNivel);

    return this.nivelService.postNivel(this.ModeloNivel)
    .subscribe(res => {    
      console.log(res);
      this.CargarTablaNivel();
    });
  }

  CargarTablaNivel(){
    return this.nivelService.getNivel()
    .subscribe(res => {  
      this.GetNivelArray = res as GetNivel[];
      console.log(this.GetNivelArray);
    });
  }

  EditarNivel(ArrayNivel: GetNivel){
    console.log(ArrayNivel);
    this._id=ArrayNivel._id;
    this.nivDes=ArrayNivel.nivDes;
    this.nivel=ArrayNivel.nivNum;

    this.ModeloNivel._id=this._id;
    this.ModeloNivel.nivDes=this.nivDes;
    this.nivelSeleccionado=this.nivel;
  }

  LimpiarForm(){

    this.nivel="";
    this.nivelSeleccionado="Nivel";
    this.ModeloNivel=new Nivel();
    this._id="";
  }

  CapturarNivel(val: any) {
    this.nivel = val;
    console.log(this.nivel);
  }
  ngOnInit() {

    this.CargarTablaNivel();

    
    this.arrayNivel=[
      {ListNivelId:0,ListNivelNom:"Nivel"},
      {ListNivelId:1,ListNivelNom:"Inicial"},
      {ListNivelId:2,ListNivelNom:"Primaria"},
      {ListNivelId:3,ListNivelNom:"Secundaria"},
    ]

    this.nivelSeleccionado="Nivel";
  }

}
