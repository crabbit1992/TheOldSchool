import { Component, OnInit } from '@angular/core';
import { PersonaRepositorio, FrmPersona, Dia, Mes, Anio } from '../../modelos/persona-repositorio';
import { PersonaRepositorioService } from '../../servicios/persona-repositorio.service';


declare var M: any;

@Component({
  selector: 'app-persona-repositorio',
  templateUrl: './persona-repositorio.component.html',
  styleUrls: ['./persona-repositorio.component.css'],
})
export class PersonaRepositorioComponent implements OnInit {

  readonly URL_API = 'http://localhost:3000/Inicio/RepositorioPersonas';

  constructor(private personaRepositorioService: PersonaRepositorioService) {

   }

  frmPersona: FrmPersona = new FrmPersona();
  ModeloPerRep: PersonaRepositorio = new PersonaRepositorio();
  arrayDia: Dia[];
  arrayMes: Mes[];
  arrayAnio: Anio[];
  filteredPersona: PersonaRepositorio[];
  perArray: PersonaRepositorio[] = [];
  array: PersonaRepositorio[] = [];
  filteredDni: PersonaRepositorio;
  diaSeleccionado: string;
  mesSeleccionado: string;
  anioSeleccionado: string;
  diaFch: string;
  mesFch: string;
  AnioFch: string;
  año: string;
  mes: string;
  dia: string
  nombreBotonGuardar = "Registrar";
  errorMessage: string;

  camErrNom: boolean = false;
  camErrApe: boolean = false;
  camErrDni: boolean = false;
  camErrSex: boolean = false;
  camErrFch: boolean = false;
  dniExist:  boolean = false;
  dniReadOn: boolean = false;
  estado:string="";

  msgNom: string;
  msgApe: string;
  msgDni: string;
  msgSex: string;
  msgFch: string;
  ok: boolean = true;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredPersona = this.listFilter ? this.performFilter(this.listFilter) : this.perArray;
  }

  performFilter(filterBy: string): PersonaRepositorio[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.perArray.filter((persona: PersonaRepositorio) =>
      persona.perRepDni.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

   validarCampos=function():boolean {
    this.ok=true; 
    var expresionNum = /^[0-9]+$/;

    if (this.frmPersona.perDni === null || this.frmPersona.perDni === undefined || this.frmPersona.perDni === "") {
      M.toast({ html: 'DNI requerido' });
      this.ok = false;
    } else if (this.frmPersona.perDni.substr(0, 1) == " ") {
      M.toast({ html: 'Evita espacios al inicio (DNI)' });
      this.ok = false;
    } else if (!expresionNum.test(this.frmPersona.perDni)) {  
      M.toast({ html: 'DNI no valido' });;
      this.ok = false;
    } else if (this.frmPersona.perDni.length < 8) {
      M.toast({ html: 'DNI debe ser 8 digitos' });
      this.ok = false;
    }
    
    if (this.frmPersona.perNom == "" || this.frmPersona.perNom == null || this.frmPersona.perNom == undefined) {
      M.toast({ html: 'Nombre requerido' });
      this.ok = false;
    }
    else if (this.frmPersona.perNom.substr(0, 1) == " ") {
      M.toast({ html: 'Evite espacios al inicio (Nombre)' });
      this.ok = false;
    }

    if (this.frmPersona.perApe === null || this.frmPersona.perApe === undefined || this.frmPersona.perApe === "") {
      M.toast({ html: 'Apellidos requeridos' });
      this.ok = false;
    } else if (this.frmPersona.perApe.substr(0, 1) == " ") {
      M.toast({ html: 'Evite espacios al inicio (Apellidos)' });
      this.ok = false;
    }
  
    if (this.frmPersona.perSex === null || this.frmPersona.perSex === undefined || this.frmPersona.perSex === "") {
      M.toast({ html: 'Elija un sexo' });
      this.ok = false;
    }

    if (this.nombreBotonGuardar === "Registrar") {
      if (this.diaFch == "Dia" || this.diaFch == null || this.diaFch == undefined ||
        this.mesFch == "Mes" || this.mesFch == null || this.mesFch == undefined ||
        this.AnioFch == "Año" || this.AnioFch == null || this.AnioFch == undefined
      )
      {
        M.toast({ html: 'Fecha invalida' });
        this.ok = false;
      }
    }
    if (this.nombreBotonGuardar === "Actualizar") {
      console.log(this.diaSeleccionado);
      console.log(this.mesSeleccionado);
      console.log(this.anioSeleccionado);
      if (this.diaSeleccionado == "Dia" || this.diaSeleccionado == null || this.diaSeleccionado == undefined ||
        this.mesSeleccionado == "Mes" || this.mesSeleccionado == null || this.mesSeleccionado == undefined ||
        this.anioSeleccionado == "Año" || this.anioSeleccionado == null || this.anioSeleccionado == undefined
      )
      {
        M.toast({ html: 'Fecha invalida' });
        this.ok = false;
      }
    }
    if (this.ok === false) {
      return this.ok = false;
    } 
    else {
      return this.ok = true;
    }
  }

  registrarActualizar(){
    if (this.frmPersona.perId) {

      this.ModeloPerRep._id = this.frmPersona.perId;
      this.ModeloPerRep.perRepNom = this.frmPersona.perNom.trim().toUpperCase();
      this.ModeloPerRep.perRepApe = this.frmPersona.perApe.trim().toUpperCase();
      this.ModeloPerRep.perRepDni = this.frmPersona.perDni.trim();
      this.ModeloPerRep.perRepSex = this.frmPersona.perSex.trim();
      this.ModeloPerRep.perRepFchNac = this.AnioFch + "-" + this.mesFch + "-" + this.diaFch;
      console.log(this.ModeloPerRep);
      return this.personaRepositorioService.putPersona(this.ModeloPerRep)
        .subscribe(res => {

          var status=res["status"];

          if(status===200){
            this.CargarTabla();
            M.toast({ html: 'Persona actualizada !' });
            this.nombreBotonGuardar = "Registrar";
            this.LimpiarForm();
            this.dniReadOn=false;
          }else{
            M.toast({ html: 'No se completo la operacion !' });
          }   
        });
    }
    else {
      this.ModeloPerRep.perRepDni = this.frmPersona.perDni.trim();
      this.ModeloPerRep.perRepNom = this.frmPersona.perNom.trim().toUpperCase();
      this.ModeloPerRep.perRepApe = this.frmPersona.perApe.trim().toUpperCase();
      this.ModeloPerRep.perRepSex = this.frmPersona.perSex.trim();
      this.ModeloPerRep.perRepFchNac = this.AnioFch + "-" + this.mesFch + "-" + this.diaFch;



      return this.personaRepositorioService.postPersona(this.ModeloPerRep)
        .subscribe(res => {    
          var status=res["status"];

          if(status===510){
            M.toast({ html: 'Dni ya se encuentra registrado !' });
            this.listFilter=this.ModeloPerRep.perRepDni;
          }
          else if(status===200){
            this.CargarTabla();
            M.toast({ html: 'Persona registrada !' });
            this.nombreBotonGuardar = "Registrar";
            this.LimpiarForm();
          }
        });
    }
  }

  CrearPersona() {
    if (this.validarCampos() === true) {
      console.log(this.ok);
     this.registrarActualizar();
    }
    else {
      
    }  
  }

  LimpiarForm() {
    this.dniReadOn=false;
    this.ok=true;
    this.frmPersona = new FrmPersona();
    this.anioSeleccionado = "Año";
    this.mesSeleccionado = "Mes";
    this.diaSeleccionado = "Dia";
    this.diaFch="Dia";
    this.mesFch="Mes";
    this.AnioFch="Año";
    this.nombreBotonGuardar = "Registrar";
    this.listFilter = "";
  }

  CargarTabla() {
    this.personaRepositorioService.getPersonas()
      .subscribe(res => {
        this.personaRepositorioService.personas = res as PersonaRepositorio[];
        this.filteredPersona = res as PersonaRepositorio[];
        this.perArray = this.filteredPersona;
        console.log(this.perArray);
      },
        error => this.errorMessage = <any>error);
  }

  editarPersona(persona: PersonaRepositorio) {
    this.nombreBotonGuardar = "Actualizar";
    this.dniReadOn=true;
    this.año = persona.perRepFchNac.substr(0, 4);
    this.mes = persona.perRepFchNac.substr(-19, 2);
    this.dia = persona.perRepFchNac.substr(-16, 2);

    if (this.mes == "01") { this.mesSeleccionado = "Ene"; }
    if (this.mes == "02") { this.mesSeleccionado = "Feb"; }
    if (this.mes == "03") { this.mesSeleccionado = "Mar"; }
    if (this.mes == "04") { this.mesSeleccionado = "Abr"; }
    if (this.mes == "05") { this.mesSeleccionado = "May"; }
    if (this.mes == "06") { this.mesSeleccionado = "Jun"; }
    if (this.mes == "07") { this.mesSeleccionado = "Jul"; }
    if (this.mes == "08") { this.mesSeleccionado = "Ago"; }
    if (this.mes == "09") { this.mesSeleccionado = "Set"; }
    if (this.mes == "10") { this.mesSeleccionado = "Oct"; }
    if (this.mes == "11") { this.mesSeleccionado = "Nov"; }
    if (this.mes == "12") { this.mesSeleccionado = "Dic"; }

    this.frmPersona.perId = persona._id;
    this.frmPersona.perNom = persona.perRepNom;
    this.frmPersona.perApe = persona.perRepApe;
    this.frmPersona.perDni = persona.perRepDni;
    this.frmPersona.perSex = persona.perRepSex;
    this.diaSeleccionado = this.dia;
    this.mesSeleccionado = this.mesSeleccionado;
    this.anioSeleccionado = this.año;

    this.diaFch=this.dia;
    this.mesFch=this.mes;
    this.AnioFch=this.año;
  }

  ngOnInit() {
    this.CargarTabla();

    this.arrayDia = [
      { idDia: 0, nomDia: "Dia" },
      { idDia: 1, nomDia: "01" }, { idDia: 2, nomDia: "02" }, { idDia: 3, nomDia: "03" }, { idDia: 4, nomDia: "04" }, { idDia: 5, nomDia: "05" },
      { idDia: 6, nomDia: "06" }, { idDia: 7, nomDia: "07" }, { idDia: 8, nomDia: "08" }, { idDia: 9, nomDia: "09" }, { idDia: 10, nomDia: "10" }, { idDia: 11, nomDia: "11" },
      { idDia: 12, nomDia: "12" }, { idDia: 13, nomDia: "13" }, { idDia: 14, nomDia: "14" }, { idDia: 15, nomDia: "15" }, { idDia: 16, nomDia: "16" },
      { idDia: 17, nomDia: "17" }, { idDia: 18, nomDia: "18" }, { idDia: 19, nomDia: "19" }, { idDia: 20, nomDia: "20" }, { idDia: 21, nomDia: "21" },
      { idDia: 22, nomDia: "22" }, { idDia: 23, nomDia: "23" }, { idDia: 24, nomDia: "24" }, { idDia: 25, nomDia: "25" }, { idDia: 26, nomDia: "26" },
      { idDia: 27, nomDia: "27" }, { idDia: 28, nomDia: "28" }, { idDia: 29, nomDia: "29" }, { idDia: 30, nomDia: "30" }, { idDia: 31, nomDia: "31" },
    ];

    this.arrayMes = [
      { idMes: 0, nomMes: "Mes" },
      { idMes: 1, nomMes: "Ene" },
      { idMes: 2, nomMes: "Feb" },
      { idMes: 3, nomMes: "Mar" },
      { idMes: 4, nomMes: "Abr" },
      { idMes: 5, nomMes: "May" },
      { idMes: 6, nomMes: "Jun" },
      { idMes: 7, nomMes: "Jul" },
      { idMes: 8, nomMes: "Ago" },
      { idMes: 9, nomMes: "Set" },
      { idMes: 10, nomMes: "Oct" },
      { idMes: 11, nomMes: "Nov" },
      { idMes: 12, nomMes: "Dic" },
    ];

    this.arrayAnio = [
      { idAnio: 0, nomAnio: "Año" }, { idAnio: 2019, nomAnio: "2020" }, { idAnio: 2019, nomAnio: "2019" }, { idAnio: 2018, nomAnio: "2018" }, { idAnio: 2017, nomAnio: "2017" },
      { idAnio: 2016, nomAnio: "2016" }, { idAnio: 2015, nomAnio: "2015" }, { idAnio: 2014, nomAnio: "2014" }, { idAnio: 2013, nomAnio: "2013" },
      { idAnio: 2012, nomAnio: "2012" }, { idAnio: 2011, nomAnio: "2011" }, { idAnio: 2010, nomAnio: "2010" }, { idAnio: 2009, nomAnio: "2009" },
      { idAnio: 2008, nomAnio: "2008" }, { idAnio: 2007, nomAnio: "2007" }, { idAnio: 2006, nomAnio: "2006" }, { idAnio: 2005, nomAnio: "2005" },
      { idAnio: 2004, nomAnio: "2004" }, { idAnio: 2003, nomAnio: "2003" }, { idAnio: 2002, nomAnio: "2002" }, { idAnio: 2001, nomAnio: "2001" },
      { idAnio: 2000, nomAnio: "2000" }, { idAnio: 1999, nomAnio: "1999" }, { idAnio: 1998, nomAnio: "1998" }, { idAnio: 1997, nomAnio: "1997" },
      { idAnio: 1996, nomAnio: "1996" }, { idAnio: 1995, nomAnio: "1995" }, { idAnio: 1994, nomAnio: "1994" }, { idAnio: 1993, nomAnio: "1993" },
      { idAnio: 1992, nomAnio: "1992" }, { idAnio: 1991, nomAnio: "1991" }, { idAnio: 1990, nomAnio: "1990" }, { idAnio: 1989, nomAnio: "1989" },
      { idAnio: 1988, nomAnio: "1988" }, { idAnio: 1987, nomAnio: "1987" }, { idAnio: 1986, nomAnio: "1986" }, { idAnio: 1985, nomAnio: "1985" },
      { idAnio: 1984, nomAnio: "1984" }, { idAnio: 1983, nomAnio: "1983" }, { idAnio: 1982, nomAnio: "1982" }, { idAnio: 1981, nomAnio: "1981" },
      { idAnio: 1980, nomAnio: "1980" }, { idAnio: 1979, nomAnio: "1979" }, { idAnio: 1978, nomAnio: "1978" }, { idAnio: 1976, nomAnio: "1976" },
    ];
    this.anioSeleccionado = "Año";
    this.mesSeleccionado = "Mes";
    this.diaSeleccionado = "Dia";
  }

  capturarDia(val: any) {
    this.diaFch = val;

  }

  capturarMes(val: any) {
    this.mesFch = val;
    if (this.mesFch == "Ene") { this.mesFch = "1"; }
    if (this.mesFch == "Feb") { this.mesFch = "2"; }
    if (this.mesFch == "Mar") { this.mesFch = "3"; }
    if (this.mesFch == "Abr") { this.mesFch = "4"; }
    if (this.mesFch == "May") { this.mesFch = "5"; }
    if (this.mesFch == "Jun") { this.mesFch = "6"; }
    if (this.mesFch == "Jul") { this.mesFch = "7"; }
    if (this.mesFch == "Ago") { this.mesFch = "8"; }
    if (this.mesFch == "Set") { this.mesFch = "9"; }
    if (this.mesFch == "Oct") { this.mesFch = "10"; }
    if (this.mesFch == "Nov") { this.mesFch = "11"; }
    if (this.mesFch == "Dic") { this.mesFch = "12"; }
  }

  capturarAnio(val: any) {
    this.AnioFch = val;
  }
}
