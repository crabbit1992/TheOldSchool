import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { BiografiaService }  from '../../servicios/biografia.service';

@Component({
  selector: 'app-modal-opt-inicio',
  templateUrl: './modal-opt-inicio.component.html',
  styleUrls: ['./modal-opt-inicio.component.css']
})
export class ModalOptInicioComponent implements OnInit {

  constructor(
    private biografiaService:BiografiaService,
    public dialogRef: MatDialogRef<ModalOptInicioComponent>,
  ) { }

  ngOnInit() {
  }

  sendOption(opt:number){
    this.biografiaService.varRes_modalInicio=opt;
    this.dialogRef.close();
  }


}
