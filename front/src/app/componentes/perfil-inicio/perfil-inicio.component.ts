import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Component({
  selector: 'app-perfil-inicio',
  templateUrl: './perfil-inicio.component.html',
  styleUrls: ['./perfil-inicio.component.css']
})
export class PerfilInicioComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
    );

    get(e){
      console.log(e);
    }

  constructor(private breakpointObserver: BreakpointObserver) {}

}
