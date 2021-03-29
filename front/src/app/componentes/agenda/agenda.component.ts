import { I18nPluralPipe } from '@angular/common';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

/******* Importacion de Modelos******** */
import { Agenda, getAgenda }  from '../../modelos/agenda'; 
import { Chat }  from '../../modelos/chat'; 

/******* Importacion de Servicios******** */
import { AgendaService } from '../../servicios/agenda.service';
import { DatasocketService } from '../../servicios/datasocket.service';
import { MntAdminCrabbService } from 'src/app/servicios/mnt-admin-crabb.service';

declare var M: any;

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  @Input() inputColCod:string;
  @Input() codMbr:string;
  @Input() alvCod:string;
  @Input() curCod:string;

  AllUsersOnline = [];
  historyMessages = [];
  chatHistory = [];
  showHistory = false;
  user = '';
  room: string;
  messageText: string;
  messageArray: Array<{user: string, message: string, time: string}> = [];
  historyArray: Chat[] = [];
  typingShow = {};
  Name = '';
  userName = '';
  showJoin = false;
  showTypingPara = false;
  @ViewChild('agendaWindow',{static: true}) agendaWindow: ElementRef;


  /******************************************* */
  perRepCod:string;
  id_agenda:string;
  modeloAgenda: Agenda = new Agenda();
  modeloGetAgenda: getAgenda=new getAgenda();

  divListarAgenda:boolean=true;
  divCrearAgenda:boolean=false;
  divDetalleAgenda: boolean=false;

  arrayAgenda:getAgenda[];


  constructor(
      private agendaService:AgendaService,
      private mntAdminCrabbService:MntAdminCrabbService,
      private datasocketService:DatasocketService,
    ) { }

  
  /************************************************************************************************ */

  hideDivs(){
    this.divListarAgenda=false;
    this.divCrearAgenda=false;
    this.divDetalleAgenda=false;
  }

  showCrearAgenda(){
    this.hideDivs();
    this.divCrearAgenda=true;
  }

  showListarAgenda(){
    this.hideDivs();
    this.getAgendas();
  }

  showDetalleAgenda(agenda:getAgenda){
    this.hideDivs();
    this.id_agenda=agenda._id;
    //this.join();
    this.getAgenda(this.id_agenda);
    this.modeloGetAgenda = agenda;
    this.divDetalleAgenda=true;
  }

  /**   Metodos de agenda */
  validarfrmAgenda():boolean{

    var trueOrfalse=false;

    if(this.modeloAgenda.ageTtl==undefined||this.modeloAgenda.ageTtl==null|| this.modeloAgenda.ageTtl==""){
      M.toast({ html: 'Debe ingresar un titulo' });
      trueOrfalse=true;
    }
    else if(this.modeloAgenda.ageDes==undefined|| this.modeloAgenda.ageDes==null|| this.modeloAgenda.ageDes==""){
      M.toast({ html: 'Debe ingresar una descripcion' });
      trueOrfalse=true;
    }

    return trueOrfalse;
  }

  postAgenda(){

    this.modeloAgenda.alvCod=this.alvCod;
    this.modeloAgenda.colCod=this.inputColCod;
    this.modeloAgenda.ageCur=this.curCod;
    this.modeloAgenda.ageCre=this.perRepCod;
  


    console.log(this.modeloAgenda);

    return this.agendaService.saveAgenda(this.modeloAgenda)
    .subscribe(res=>{
      console.log(res)
    });

  };

  getAgenda(id:string){
    return  this.agendaService.getAgenda(id)
    .subscribe(res=>{
      console.log(res)
    });
  }

  getAgendas(){
    return  this.agendaService.getAgendas(this.alvCod,this.curCod)
    .subscribe(res=>{
      

      this.arrayAgenda = res as getAgenda[];
      console.log(this.arrayAgenda);
      this.divListarAgenda=true;
    });
  }

  formatearFecha(fecha: string):string{
    var fch = new Date(fecha);
    var dia = fch.getDate();
    var mes = fch.getMonth()+1;
    var anio = fch.getFullYear();

    var d="";
    var m="";
    var a="";

    if(dia<10){
        d="0"+dia;
    }
    else{
      d=""+dia;
    }
    if(mes<10){
        m="0"+mes;
    }
    else{
      m=""+mes;
    }

    if (M == "01") { m = "Ene"; }
    else if (m == "02") { m = "Feb"; }
    else if (m == "03") { m = "Mar"; }
    else if (m == "04") { m = "Abr"; }
    else if (m == "05") { m = "May"; }
    else if (m == "06") { m = "Jun"; }
    else if (m == "07") { m = "Jul"; }
    else if (m == "08") { m = "Ago"; }
    else if (m == "09") { m = "Set"; }
    else if (m == "10") { m = "Oct"; }
    else if (m == "11") { m = "Nov"; }
    else if (m == "12") { m = "Dic"; }

    var resFch= d+" - "+m+" - "+anio;
    return resFch;
  }

  ngOnInit() {
    this.showListarAgenda();

    this.perRepCod= JSON.parse(localStorage.getItem('idPerRep'));
    this.perRepCod= this.mntAdminCrabbService.decript(this.perRepCod);
  }

}
