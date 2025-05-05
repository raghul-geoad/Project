import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private loginService:LoginService,private router:Router){}
  canActivate(route:ActivatedRouteSnapshot){
    if (this.loginService.getRole()=='admin'){
      return true;
    }
    else{
      console.log(route.data['componentName'])
      this.router.navigate(['accessDenied'])
      return false;
    }
  }
  
}
