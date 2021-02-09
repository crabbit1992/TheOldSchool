import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


/**Servicios */
import { PeriodoService } from '../../servicios/periodo.service';

@Component({
  selector: 'app-modal-opt-periodo',
  templateUrl: './modal-opt-periodo.component.html',
  styleUrls: ['./modal-opt-periodo.component.css']
})
export class ModalOptPeriodoComponent implements OnInit {

  optionsDetalle:boolean=false;
  optionsPeriodo:boolean=true;

  constructor(    
    private periodoService         : PeriodoService,
    public dialogRef: MatDialogRef<ModalOptPeriodoComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    ) { }

    

  ShowDivListar(){
    this.periodoService.optSelectedModal="ShowDivListar";
    this.dialogRef.close();
  }

  ShowDivCrear(){
    this.periodoService.optSelectedModal="ShowDivCrear";
    this.dialogRef.close();
  }

  ShowDivConfDet(){
    this.periodoService.optSelectedModal="ShowDivConfDet";
    this.dialogRef.close();
  }
  
  ShowDivListarDet(){
    this.periodoService.optSelectedModal="ShowDivListarDet";
    this.dialogRef.close();
  }

  OnOffOptions(){
    var getOption=this.message["opcion"];

    if(getOption==1){
      this.optionsDetalle=true;
      this.optionsPeriodo=true;
    }
    else if(getOption==2){
      this.optionsDetalle=false;
      this.optionsPeriodo=false;  
    }
  }



  ngOnInit() {
    console.log(this.message);

    this.OnOffOptions()

  }


}
