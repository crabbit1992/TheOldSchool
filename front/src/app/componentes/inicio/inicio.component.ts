import { Component, OnInit,Output,EventEmitter,AfterViewInit, OnDestroy  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable,Subscription } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { Router } from '@angular/router';
import { delay, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ModalOptInicioComponent } from '../modal-opt-inicio/modal-opt-inicio.component';

// Importacion de modelos
import { GaleriaCol }  from '../../modelos/galeria-col';
import { Colegio,GetColegio }  from '../../modelos/colegio';
import { GetBioPortada}  from '../../modelos/biografia';
import { GetNucleoPortada }  from '../../modelos/mnt-admin-crabb';

// Importacion de servicios
import { GaleriaColService }  from '../../servicios/galeria-col.service';
import { BiografiaService }  from '../../servicios/biografia.service';
import { ColegioService }  from '../../servicios/colegio.service';
import { MntAdminCrabbService } from 'src/app/servicios/mnt-admin-crabb.service';

declare var M: any;
// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit,AfterViewInit,OnDestroy {

  readonly URL='http://209.145.52.133:3000';

  autoplay:any;
  elems: any;
  instances:any;
  clientesSubscription: Subscription;

  filteredCol: GetColegio[];
  arrayColFil: GetColegio[]=[];


  arrayImgs: GaleriaCol[];
  arrayPortadas: GetNucleoPortada[];

  /**Lista de colegios */
  arrayColegio: GetColegio[];
  perfilCol:boolean=false;
  /** */

  /**Referente al carousel */
  options = { fullWidth: false,pressed:true, duration:300, indicators: false };

  mntRegistro: boolean=false;
  mntLogin: boolean=false;
  listCols:boolean=true;
  divCarousel:boolean=true;

  pruebaBiografia: boolean=true;

  /** */
  DivregLog:boolean=false;

  filter: string;

  @Output() objOutHorario= new EventEmitter();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
  );

  lnSchoolTtl: string="LnSchool";

  constructor(
    private mntAdminCrabbService:MntAdminCrabbService,
    private breakpointObserver: BreakpointObserver,
    private galeriaColService:GaleriaColService,
    private colegioService:ColegioService,
    private biografiaService:BiografiaService,
    public dialog            : MatDialog,
    private rutas:Router
  ){}

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCol = this.listFilter ? this.performFilter(this.listFilter) : this.arrayColFil;
  }

  performFilter(filterBy: string): GetColegio[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.arrayColFil.filter((col: GetColegio) =>
      col.colNom.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


  buscarCol(filter : string){
    console.log("esta es el cole");
    this.listFilter=filter;
      console.log(filter  );



  }

  hideDivs(){
    this.mntRegistro=false;
    this.mntLogin=false;
    this.DivregLog=false;
    this.listCols=false;
    this.divCarousel=false;
  }

  getColegios(){
    this.colegioService.getColegios()
    .subscribe(res=>{
      console.log(res);
      this.arrayColegio=res as GetColegio[];
      this.filteredCol= this.arrayColegio;
      for(let i=0;i<this.arrayColegio.length;i++){
        
        if(this.arrayColegio[i].colImgPfl==null|| this.arrayColegio[i].colImgPfl==undefined){
          console.log("no hay nada");
          this.filteredCol.splice(i,1)
        }
        else{
       
        }
      }

      this.arrayColegio=this.filteredCol;
      this.arrayColFil=this.filteredCol;
      console.log(this.arrayColegio);
      console.log(this.arrayColFil);
    })
  }


  getMsg(alert: string){
    console.log(alert);
    if(alert=="1"){
      this.hideDivs();
      this.DivregLog=true;
      this.mntLogin=true;
    }

  }

  BtnFlotante(){
    console.log("Hola mundo");
    this.openDialogBtnFlotante();
  }

  ShowRegistrarse(){

    this.hideDivs();
    this.DivregLog=true;
    this.mntRegistro=true;

  }

  ShowLogin(){
    this.hideDivs();
    this.DivregLog=true;
    this.mntLogin=true;
  }

  ListaColegios(){
    this.hideDivs();
    this.listCols=true;
  }

 

  verColegio(colegio: GetColegio){
    this.colegioService.UrlOrRedirect=1;
   
      this.rutas.navigate(["/inicio",colegio.colUrl])
   
  }

  getPortadas(){

    this.mntAdminCrabbService.getPortadas()
    .pipe(delay(700)).subscribe(res=>{
      this.arrayPortadas=res as GetNucleoPortada[];

      setTimeout(() => {
        this.elems = document.querySelectorAll('.carousel');
        this.instances = M.Carousel.init(this.elems, this.options);
  
        this.autoplay= setInterval(function() {
          $('.carousel').carousel('next');
        }, 5000); // every 2 seconds
  
      }, 1000);
      
    });
  }

  openDialogBtnFlotante(){
    const dialogRef =this.dialog.open(ModalOptInicioComponent,{
      width: '250px',
      data:' ¿ Seguro de eliminar ? ',
      
    });
    dialogRef.afterClosed().subscribe(res=>{
      let rpta=this.biografiaService.varRes_modalInicio;
      console.log(rpta);

      if(rpta==1){
        this.ListaColegios();
      }
      else if(rpta==2){
        this.ShowRegistrarse();
      }
      else if(rpta==3){
        this.ShowLogin();
      }

    });   
  }

  



  ngOnInit() {

    
    this.getPortadas()
    this.getColegios();
    

    $(function(){
      $('.ui-state-default').click(function () {
        $('html, body').animate({
           scrollTop: $(document).height()
        }, 'slow');
        return false;
      });
    });

  }

  ngAfterViewInit() {

    
    

  }

  ngOnDestroy(){
    console.log("destruir");
    clearInterval(this.autoplay);
    this.elems;
    this.instances;
    M.Carousel
  }
  

}
