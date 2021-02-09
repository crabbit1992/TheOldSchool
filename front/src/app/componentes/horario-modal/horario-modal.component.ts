import { Component, OnInit,Inject,Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

//Importar Modelos
import { GetHorario,HorarioModal, Horario }  from '../../modelos/horario';
import { AulaCurso, GetAulaCurso,DocenteCurso }  from '../../modelos/aula-curso';
import { GetCursoGrado }  from '../../modelos/curso-grado';

//ImportarServicios
import { AulaCursoService } from '../../servicios/aula-curso.service'; 
import { HorarioService } from '../../servicios/horario.service'; 
import { CursoGradoService } from 'src/app/servicios/curso-grado.service';
import { Grado } from 'src/app/modelos/grado';


declare var M: any;

@Component({
  selector: 'app-horario-modal',
  templateUrl: './horario-modal.component.html',
  styleUrls: ['./horario-modal.component.css']
})
export class HorarioModalComponent implements OnInit {

  modeloHorarioModal: HorarioModal= new HorarioModal();

  ModeloHorario     :Horario= new Horario();

  cursoHorario      : string;
  arrayAulaCurso    : GetAulaCurso[];
  ModeloArrayAulaCurso    : GetAulaCurso=new GetAulaCurso();

  arrayCursoGrado   : GetCursoGrado[];

  objCurso:{
    _id: "string",
    curNom: "Definir usuario"
  };

  constructor(
          public dialogRef: MatDialogRef<HorarioModalComponent>,
          @Inject(MAT_DIALOG_DATA) public message: string,
          private aulaCursoService:AulaCursoService,
          private horarioService:HorarioService,
          private cursoGradoService : CursoGradoService,
        ) { }

    

    CargarDataFrm(){


      this.modeloHorarioModal.alvCod=this.message["alvCod"];
      this.modeloHorarioModal.itvHroCod=this.message["itvHroCod"];
      this.modeloHorarioModal.intHraIni=this.message["intHraIni"];
      this.modeloHorarioModal.intHraFin=this.message["intHraFin"];
      this.modeloHorarioModal.dia=this.message["dia"];
      this.modeloHorarioModal.prdCod=this.message["prdCod"];
      this.modeloHorarioModal.colCod=this.message["colCod"];

      //console.log(this.modeloHorarioModal);
      this.objCurso={
        _id: "string",
        curNom: "Definir usuario"
      }

      this.objCurso=this.message["curCod"];

      this.CargarSltCursos(this.modeloHorarioModal.alvCod,this.objCurso._id);
      console.log(this.objCurso._id);
      
  
    }

    CargarSltCursos(alvCod: string,_id:string){

      const grado=this.message["grado"];
      const nivel=this.message["nivel"];
      const colegio=this.modeloHorarioModal.colCod;

      return this.cursoGradoService.getCursosGrado(colegio,grado,nivel)
      .subscribe(res=>{
        this.arrayCursoGrado=res as GetCursoGrado[];
       
        this.arrayCursoGrado.unshift({
          estCod: "string",
          _id: "string",
          graCod: {
            estCod: "string",
            _id:"string",
            graNum: 0,
            graDes:"string",
            timestamp: "string",
            __v: 0,
        },
        nivCod: {
            estCod:"string",
            _id: "string",
            nivNum: 0,
            nivDes: "string",
            timestamp: "string",
            __v: 0,
        },
        curCod: {
            estCod: "string",
            _id: "5f192fd806a7a50a38561d97",
            areCod: "5f192f8506a7a50a38561d96",
            ncoCurNom: "RECREO",
            timestamp: "string",
            __v:0,
        },
        areCod: {
            estCod: "string",
            _id: "string",
            ncoAreNom: "string",
            timestamp: "string",
            __v: 0,
        },
        colCod: "string",
        timestamp: "string",
        __v: 0,
        });

        this.arrayCursoGrado.unshift({
          estCod: "string",
          _id: "string",
          graCod: {
            estCod: "string",
            _id:"string",
            graNum: 0,
            graDes:"string",
            timestamp: "string",
            __v: 0,
        },
        nivCod: {
            estCod:"string",
            _id: "string",
            nivNum: 0,
            nivDes: "string",
            timestamp: "string",
            __v: 0,
        },
        curCod: {
            estCod: "string",
            _id: "string",
            areCod: "string",
            ncoCurNom: "Seleccione un curso",
            timestamp: "string",
            __v:0,
        },
        areCod: {
            estCod: "string",
            _id: "string",
            ncoAreNom: "string",
            timestamp: "string",
            __v: 0,
        },
        colCod: "string",
        timestamp: "string",
        __v: 0,
        });
        this.cursoHorario=="string";
      })
      
    }

    Validar():boolean{
      if(this.cursoHorario=="string"){
        M.toast({ html: 'Seleccione un curso' });
        return true;
      }

      return false;
    }


    CrearHorario(){

      if(this.Validar()==true){

      }
      else{

        this.ModeloHorario._id=this.objCurso._id
        this.ModeloHorario.curCod=this.cursoHorario;
        this.ModeloHorario.hroDia=this.modeloHorarioModal.dia;
        this.ModeloHorario.itvHroCod=this.modeloHorarioModal.itvHroCod;
        this.ModeloHorario.alvCod=this.modeloHorarioModal.alvCod;
        this.ModeloHorario.colCod=this.modeloHorarioModal.colCod;
     
        if(this.ModeloHorario._id=="string"){
          //Crear horario

          return this.horarioService.createHorario(this.ModeloHorario)
          .subscribe(res=>{

            var status=res["status"];
            if(status==200){
              M.toast({ html: 'Nuevo horario registrado' });
              this.dialogRef.close();
            }
          }); 
        }
        else{
          //Editar horario
          console.log(this.ModeloHorario);
          return this.horarioService.putHorario(this.ModeloHorario)
          .subscribe(res=>{

            var status=res["status"];
            if(status==200){
              M.toast({ html: 'Se edito el horario' });
              this.dialogRef.close();
            }
          }); 
         
        }
      }
    }

    EliminarHorario(){
      this.ModeloHorario.hroDia=this.modeloHorarioModal.dia;
      this.ModeloHorario.itvHroCod=this.modeloHorarioModal.itvHroCod;
      this.ModeloHorario.alvCod=this.modeloHorarioModal.alvCod;

      return this.horarioService.removeHorario(this.ModeloHorario)
      .subscribe(res=>{
        var status=res["status"];
            if(status==200){
              M.toast({ html: 'Se elimino el horario' });
              this.dialogRef.close();
            }
      })
    }
 

    onClickNo(){
      this.dialogRef.close();
    };

  ngOnInit() {

    this.CargarDataFrm();

    this.cursoHorario="string";
  }

}
