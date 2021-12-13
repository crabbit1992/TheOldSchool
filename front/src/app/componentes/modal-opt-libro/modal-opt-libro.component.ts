import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-opt-libro',
  templateUrl: './modal-opt-libro.component.html',
  styleUrls: ['./modal-opt-libro.component.css']
})
export class ModalOptLibroComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalOptLibroComponent>,
  ) { }

  ngOnInit() {
  }

}
