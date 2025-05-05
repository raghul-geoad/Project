import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router,private loginService:LoginService){}
  canActivate(route:ActivatedRouteSnapshot):boolean{
    if (sessionStorage.getItem("role")==='admin'){
      return true;
    }
    else{
      const component=route.data['componentName']
      if(sessionStorage.getItem('access')?.includes(component)){
        return true;
      }
      else{
        this.router.navigate(['accessDenied'],{state :{ componentName : component}})
        return false;
      }
    }
  }
  
}