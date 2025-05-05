import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
  constructor(private loginService : LoginService,private router : Router){}
  canActivate():boolean {
    if(this.loginService.getRole()){
      return true;
    }
    else{
      return false;

    }
  }
  
}
