import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService }  from '../app/servicios/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.loginService.loggedIn()) {
      return true;
    }

    this.router.navigateByUrl('inicio');
    return false;
  }


}
