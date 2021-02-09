import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar-principal',
  templateUrl: './nav-bar-principal.component.html',
  styleUrls: ['./nav-bar-principal.component.css']
})
export class NavBarPrincipalComponent implements OnInit {

  constructor(private rutas:Router) { }

  CerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('idPerRep');
    localStorage.removeItem('col');
    localStorage.removeItem('dni');
    localStorage.removeItem('prfactcod');

    this.rutas.navigateByUrl("login");
  }

  ngOnInit() {
  }



}
