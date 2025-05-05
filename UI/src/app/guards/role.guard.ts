import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
    if (sessionStorage.getItem("role")==='admin'){
      return true;
    }
    else{
      const componentName =route.data['componentName'];
      console.log(componentName);
      this.router.navigate(['accessDenied'])
      return false;
    }
  }
  
}