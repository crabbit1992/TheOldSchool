import { Component, OnInit,Output,EventEmitter,AfterViewInit, ChangeDetectorRef, OnDestroy,DoCheck } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { delay, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ModalOptInicioComponent } from '../modal-opt-inicio/modal-opt-inicio.component';

import { ModalPerfilColegioComponent } from '../modal-perfil-colegio/modal-perfil-colegio.component';

// Importacion de modelos
import { GaleriaCol }  from '../../modelos/galeria-col';
import { 
  QuienesSomos,GetQuienesSomos,arrayTpoQs,
  Actividades,GetActividades,
  BioNiveles,GetBioNivel,arrayNivelTpo,
  BioTaller,GetBioTaller,
  BioInfraestructura,GetBioInfraestructura,
  BioAnuncio, GetBioAnuncio,
  BioPortada,GetBioPortada,
  objEmblema,getObjEmblema,
  objImgPfl,getObjImgPfl
  }  from '../../modelos/biografia';

// Importacion de servicios
import { GaleriaColService }  from '../../servicios/galeria-col.service';

// Importacion de modelos
import { Colegio,GetColegio }  from '../../modelos/colegio';

// Importacion de servicios
import { ColegioService }  from '../../servicios/colegio.service';
import { BiografiaService }  from '../../servicios/biografia.service';
import { GetNivel } from 'src/app/modelos/nivel';




declare var M: any;
// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-inicio-pagina-col',
  templateUrl: './inicio-pagina-col.component.html',
  styleUrls: ['./inicio-pagina-col.component.css']
})
export class InicioPaginaColComponent implements OnInit,AfterViewInit,OnDestroy {

  autoplay:any;
  elems: any;
  instances:any;
  instance:any;
  varCambio:number=0;

  show = false; // add one more property
  divInicio=false;
  colActual: string="";
  colUrl:string;
  emblemaRta:string;
  emblemaInit:boolean=false;
  colegio: Colegio=new Colegio();
  arrayImgs: GaleriaCol[];
  arrayPortadas: GetBioPortada[];


  /** Referente a menu acordeon */
  var_Menu:number=0;
  var_niv:number=0;

  /** Referente a Quienes somos */
  arrayAnuncios:GetBioAnuncio[]

  /********************************* */
  

  /** Referente a Quienes somos */
  arrayQuienesSomos: GetQuienesSomos[];
  objMision:GetQuienesSomos=new GetQuienesSomos();
  objVision:GetQuienesSomos=new GetQuienesSomos();
  objValores:GetQuienesSomos=new GetQuienesSomos();
  divMision:boolean=false;
  divVision:boolean=false;
  divValores:boolean=false;
  divQs:boolean=false;
  /*************************************************************************** */

  /** Referente a Actividades */
  divActividades:boolean=false;
  arrayActividades: GetActividades[];
  arrayAct:GetActividades[];
  objEbzActividad: GetActividades= new GetActividades();
  /*************************************************************************** */

  /** Referente a Niveles */
  divNiveles:boolean=false;
  arrayNiveles: GetBioNivel[];
  arrayNiv:GetBioNivel[];
  objEbzNivel: GetBioNivel=new GetBioNivel();
  boolInicial:boolean=false;
  boolPrimaria:boolean=false;
  boolSecundaria:boolean=false;
  /*************************************************************************** */

  /** Referente a Talleres */
  divTalleres:boolean=false;
  arrayTalleres: GetBioTaller[];
  arrayTall:GetBioTaller[];
  objEbzTaller: GetBioTaller=new GetBioTaller();
  /*************************************************************************** */

  /** Referente a Infraestructura */
  divInfraestructura:boolean=false;
  arrayInfraestructura: GetBioInfraestructura[];
  arrayInf:GetBioInfraestructura[];
  objEbzInfraestructura: GetBioInfraestructura=new GetBioInfraestructura();
  /*************************************************************************** */

  /**Lista de colegios */
  arrayColegio: GetColegio[];
  perfilCol:boolean=false;
  /** */

  /**Referente al carousel */
  options = { fullWidth: false,pressed:true, duration:300, indicators: true };

  mntRegistro: boolean=false;
  mntLogin: boolean=false;
  listCols:boolean=true;

  pruebaBiografia: boolean=true;

  /** */
  DivregLog:boolean=false;

  @Output() objOutHorario= new EventEmitter();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private colegioService:ColegioService,
    private biografiaService:BiografiaService,
    public  dialog            : MatDialog,
    private breakpointObserver: BreakpointObserver,
    private rutas:Router,
    private cdRef : ChangeDetectorRef
  ) { }

  hideDivs(){

    this.divQs=false;
    this.divActividades=false;
    this.divInicio=false;
    this.divNiveles=false;
    this.divTalleres=false;
    this.divInfraestructura=false;
    this.mntLogin=false;
    this.mntRegistro=false;
  }

  BtnFlotante(){
    this.openDialogBtnFlotante();
  }

  clickShowMenu(){
    this.var_Menu=this.var_Menu+1;
    console.log(this.var_Menu);
    if(this.var_Menu==2){
      this.var_Menu=0;
    }
  }

  clickUl_Niv(){
    this.var_niv=this.var_niv+1;
    console.log(this.var_niv);
    if(this.var_niv==2){
      this.var_niv=0;
      this.clickClose();
    }
  }

  clickClose(){
    this.var_Menu=0;
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
        this.Inicio();
      }
      else if(rpta==2){
        this.ShowRegistrarse();
      }
      else if(rpta==3){
        this.ShowLogin();
      }

    });   
  }

  openModalImg(option:string,imagen: object){
    
    console.log("entro aca");
    const obj={
      option: option,
      imagen: imagen
    }

    console.log(obj);

    const dialogRef =this.dialog.open(ModalPerfilColegioComponent,{
      width: '500px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe(res=>{
      
    });
  }

  /** Inicio */
  showInicio(){
    this.getAnuncios();
  }

  getColegio(colUrl: string){
    this.colegioService.getColegio(colUrl)
    .pipe(delay(700)).subscribe(res=>{
      
      if(res==undefined){
        console.log("No existe la ruta");
      }
      else{
       
        this.colActual=res["_id"];
        this.getPortadas();
        this.getAnuncios();
        
        this.colegio=res as Colegio;
        let emblema=this.colegio.colImgPfl.colImgRta;
        this.emblemaRta= 'http://localhost:3000'+emblema.toString() +'';
        this.getNivelesSlt();
        this.varCambio=1;
        

      }
    });
    
  }
  

  getAnuncios(){
    
    this.biografiaService.getAnuncios(this.colActual)
    .subscribe(res=>{
      this.hideDivs();
      this.arrayAnuncios=res as GetBioAnuncio[];
      this.divInicio=true;
      setTimeout(() => {
        this.elems = document.querySelectorAll('.carousel');
        this.instances = M.Carousel.init(this.elems, this.options);

      }, 10);
      
    })
  }

  /** Quienes Somos */
  showQuienesSomos(){
    this.getQuienesSomos();
  }

  getQuienesSomos(){
    this.biografiaService.getQuienesSomos(this.colActual)
    .subscribe(res=>{
      this.hideDivs();
      this.arrayQuienesSomos= res as GetQuienesSomos[];
      console.log(this.arrayQuienesSomos);
      if(this.arrayQuienesSomos.length==0){
        this.divQs=false;
        console.log("No hay datos");
        console.log(this.arrayQuienesSomos.length);
      }
      else{

        console.log("Si hay datos");
        console.log(this.arrayQuienesSomos.length);
        this.divQs=true;

        for(let i=0;i<this.arrayQuienesSomos.length;i++){


          if(this.arrayQuienesSomos[i].qsTtl==undefined){

          }
          else if(this.arrayQuienesSomos[i].qsTtl=="Misión"){
            console.log("Entro aca");
            this.objMision=this.arrayQuienesSomos[i]
            
            this.divMision=true;
            console.log(this.objMision);
          }


          if(this.arrayQuienesSomos[i].qsTtl==undefined){

          }
          else if(this.arrayQuienesSomos[i].qsTtl=="Visión"){
            this.objVision=this.arrayQuienesSomos[i]
            this.divVision=true;
            console.log(this.objVision);
          }

          if(this.arrayQuienesSomos[i].qsTtl==undefined){

          }
          else if(this.arrayQuienesSomos[i].qsTtl=="Valores"){
            this.objValores=this.arrayQuienesSomos[i]
            this.divValores=true;
            console.log(this.objValores);
          }
        }
      }
      
      

      
    });
    return true;
  }

  /** Actividades */
  showActividades(){
    this.getActividades();
  }

  getActividades(){
    this.biografiaService.getActividadesFind(this.colActual)
    .subscribe(res=>{
      this.hideDivs();
      
      this.arrayActividades=res as GetActividades[];

      if(this.arrayActividades.length==0){

      }
      else{
        for(let i=0;i<this.arrayActividades.length;i++){

          if(this.arrayActividades[i].actTpo=="1"){
            this.objEbzActividad=this.arrayActividades[i];
  
        
            this.arrayActividades.splice(i, 1);
          }
        }
        this.divActividades=true;
      }
    })
  }

  /** Niveles */
  showNiveles(){
    this.hideDivs();
    this.divNiveles=true;
  }

  getNivelesSlt(){
    this.biografiaService.getNivelAll(this.colActual)
    .subscribe(res=>{
      this.arrayNiveles=res as GetBioNivel[];
      console.log(this.arrayNiveles);

      for(let i=0;i<this.arrayNiveles.length;i++){

        if(this.arrayNiveles[i].nivTtl=="Inicial" && this.arrayNiveles[i].nivTpo=="1"){
          this.boolInicial=true;
        }
        if(this.arrayNiveles[i].nivTtl=="Primaria" && this.arrayNiveles[i].nivTpo=="1"){
          this.boolPrimaria=true;
        }
        if(this.arrayNiveles[i].nivTtl=="Secundaria" && this.arrayNiveles[i].nivTpo=="1"){
          this.boolSecundaria=true;
        }
      }
      
      
    })
  }

  getNivel(nivel:string){
    this.biografiaService.getNivelSgnNiv(this.colActual,"1",nivel)
    .subscribe(res=>{
      this.objEbzNivel=res[0];
      this.hideDivs();
      this.divNiveles=true;
      console.log(this.objEbzNivel);
    });

    this.biografiaService.getNivelSgnNiv(this.colActual,"0",nivel)
    .subscribe(res=>{
      this.arrayNiv=res as GetBioNivel[]
      this.hideDivs();
      this.divNiveles=true;
      console.log(this.arrayNiv);
    });
  };

  /** Talleres */
  showTalleres(){
    this.getTalleres();
  }

  getTalleres(){
    this.biografiaService.getTalleres(this.colActual)
    .subscribe(res=>{
      this.hideDivs();
      this.arrayTalleres=res as GetBioTaller[];

      if(this.arrayTalleres.length==0){

      }
      else{
        for(let i=0;i<this.arrayTalleres.length;i++){

          if(this.arrayTalleres[i].talTpo=="1"){
            this.objEbzTaller=this.arrayTalleres[i];
  
        
            this.arrayTalleres.splice(i, 1);
          }
        }

        this.divTalleres=true;
      }
    })
  }

  /** Infraestructura */
  showInfraestructura(){
    this.getInfraestructura();
  }

  getInfraestructura(){
    this.biografiaService.getInfraestructuras(this.colActual)
    .subscribe(res=>{
      this.hideDivs();
      this.arrayInfraestructura=res as GetBioInfraestructura[];

      if(this.arrayInfraestructura.length==0){

      }
      else{
        for(let i=0;i<this.arrayInfraestructura.length;i++){
          if(this.arrayInfraestructura[i].infTpo=="1"){
            this.objEbzInfraestructura=this.arrayInfraestructura[i];
  
            this.arrayInfraestructura.splice(i, 1);
          }
        }
        this.divInfraestructura=true;
      }
    })
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

  Inicio(){
    this.colegioService.UrlOrRedirect=0;
  
    this.hideDivs();
    this.rutas.navigate(["/inicio"])
  }




  getPortadas(){
    this.biografiaService.getPortadasUrl(this.colUrl)
    .pipe(delay(700)).subscribe(res=>{
    this.arrayPortadas=res as GetBioPortada[];
    console.log(this.arrayPortadas);
    this.divInicio=true;
      
    });
  }



  ngOnInit(){

    this.route.paramMap.subscribe(params=>{
      this.colUrl=params.get("colUrl")
      this.getColegio(this.colUrl);
    });
    


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

    setTimeout(() => {
      this.elems = document.querySelectorAll('.carousel');
      this.instances = M.Carousel.init(this.elems, this.options);
      
    }, 10);

  }



  ngOnDestroy(){
    console.log("destruir");
    clearInterval(this.autoplay);
    this.elems;
    this.instances;
    M.Carousel
  }








}

 


