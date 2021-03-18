import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { TipoPago }  from '../../modelos/tipo-pago';

/**Servicios */
import { PagoService } from '../../servicios/pago.service';
import { TipoPagoService } from '../../servicios/tipo-pago.service';

@Component({
  selector: 'app-modal-pago',
  templateUrl: './modal-pago.component.html',
  styleUrls: ['./modal-pago.component.css']
})
export class ModalPagoComponent implements OnInit {

  divFiltros:boolean=false;
  divOpciones: boolean=false;

  colCod:string;
  ModeloTipoPago: TipoPago = new TipoPago();
  ArrayTipoPago: TipoPago[];

  selectTipoPago: TipoPago[];

  constructor(
    private pagoService         : PagoService,
    public dialogRef: MatDialogRef<ModalPagoComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private tipoPagoService:TipoPagoService,
  ) { }

  enviarDatos(opt :string){
    this.pagoService.optPago=opt;
    this.dialogRef.close();
  }

  CargarFiltroTipoPago(){
    return this.tipoPagoService.getTipoPagos(this.colCod)
    .subscribe(res => {  
      this.selectTipoPago = res as TipoPago[];
      
      this.selectTipoPago.unshift({
        colCod: "5e0e813f64fd00126cfff445",
        estCod: "5e0a8a3b9644411040ebf292",
        timestamp: "2021-03-06T08:27:42.338Z",
        tpoPgoNom: "Seleccione un concepto",
        tpoPgoReqMes:"",
        tpoPgoDes: "",
        tpoPgoMon: 0,
        _id: "..."
      });

      this.ModeloTipoPago._id="..."
      this.divFiltros=true;
    });
  }

  capturarTipoPago(e){

    const tpoPgo=e;
    this.pagoService.optPagoSelected= tpoPgo;
    this.dialogRef.close();

  }



  ngOnInit() {
    const opcion=this.message["fltOrOpt"]
    this.colCod=this.message["colCod"];

    if(opcion=="Filtros"){
  
      this.CargarFiltroTipoPago();
    }
    else if(opcion=="Opc"){
      this.divOpciones=true;
    }


  }

}
