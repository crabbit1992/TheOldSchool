import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../servicios/persona.service';
import { Persona } from 'src/app/modelos/persona';

@Component({
  selector: 'app-adm-persona',
  templateUrl: './adm-persona.component.html',
  styleUrls: ['./adm-persona.component.css']
})
export class AdmPersonaComponent implements OnInit {

  ModeloPer: Persona = new Persona();
  filteredPersona: Persona[];
  perArray: Persona[] = [];
  array: Persona[] = [];
  filteredDni: Persona;
  errorMessage: string;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredPersona = this.listFilter ? this.performFilter(this.listFilter) : this.perArray;
  }

  performFilter(filterBy: string): Persona[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.perArray.filter((persona: Persona) =>
      persona.perDni.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  constructor(private personaService: PersonaService) {

  }

  
  CargarTabla() {
    this.personaService.getPersonas(localStorage.getItem('token').slice(1,-1))
      .subscribe(res => {
        this.personaService.personas = res as Persona[];
        this.filteredPersona = res as Persona[];
        this.perArray = this.filteredPersona;
        console.log(res);
      },
        error => this.errorMessage = <any>error);
  }




  
  EliminarCuenta(_id:string) {
    this.personaService.removePersona(_id)
      .subscribe(res => {
        console.log(res);
      });
      this.CargarTabla();
  }


  ngOnInit() {
    this.CargarTabla();
  }

}
