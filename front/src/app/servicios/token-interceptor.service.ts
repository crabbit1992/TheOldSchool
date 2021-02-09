import { Injectable } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http' 

import { LoginService } from '../servicios/login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(req, next) {
    let tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.loginService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }



}
