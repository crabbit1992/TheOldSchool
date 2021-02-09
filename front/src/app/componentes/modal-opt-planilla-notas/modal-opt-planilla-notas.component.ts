import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import { NotaService } from '../../servicios/nota.service';
import { GetCurso } from 'src/app/modelos/aula-curso';

@Component({
  selector: 'app-modal-opt-planilla-notas',
  templateUrl: './modal-opt-planilla-notas.component.html',
  styleUrls: ['./modal-opt-planilla-notas.component.css']
})
export class ModalOptPlanillaNotasComponent implements OnInit {

  arrayCursos: GetCurso[];

  constructor(
    private notaService:NotaService,
    public dialogRef: MatDialogRef<ModalOptPlanillaNotasComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
  ) { }

  Seleccionar(opc:number){
 
    const sendOpc={
      curso:"",
      opc:opc
    }
   
     this.notaService.opcionElegida=sendOpc;
     this.dialogRef.close();
   }

  SeleccionarCurso(curso: GetCurso, opc:number){
 
    const sendOpc={
      curso:curso,
      opc:opc
    }
   
     this.notaService.opcionElegida=sendOpc;
     this.dialogRef.close();

   }
  

  ngOnInit() {

  


    this.arrayCursos=this.message["arrayCursos"];
    console.log(this.arrayCursos[0]);
  }

}
