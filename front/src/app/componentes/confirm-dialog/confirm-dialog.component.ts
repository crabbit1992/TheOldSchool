import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  opcDeafult: boolean=false;
  opc: boolean=false;
  opcNota: boolean=false;


  onClickNo():void{
    this.dialogRef.close();
  }

  ngOnInit() {

    if(this.message=="1"){
      this.message=" ¿ Desea cambiar el ciclo ?    Al cambiar de ciclo se generara un archivo con la incidencia"
      this.opc= true;
    }
    else if(this.message=="2"){
      this.opcNota=true;
      this.message=" ¿ Desea eliminar esta nota?"
    }
    else{
      this.opcDeafult= true;
    }

   
  }

}
