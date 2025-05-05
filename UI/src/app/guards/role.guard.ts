import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(route:ActivatedRouteSnapshot):boolean{
    if (sessionStorage.getItem("role")==='admin'){
      return true;
    }
    else{
      this.router.navigate(['accessDenied'],{state :{ componentName : route.data['componentName']}})
      return false;
    }
  }
  
}