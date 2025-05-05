import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = "http://127.0.0.1:5000/login";
  constructor(private http: HttpClient) { }

  login(username: any, password: any): Observable<any> {
    return this.http.post(this.loginUrl, {"username":username,"password": password}).pipe(tap((response:any) =>{
      if(response.message === "success"){
        // sessionStorage.setItem("username",this.username.toString())
        sessionStorage.setItem("role",response.role);
        sessionStorage.setItem("access",response.access);
      }
    })
  );
  }
  getRole(){
    return sessionStorage.getItem('role');
  }
  logout(){
    sessionStorage.clear();
    // sessionStorage.removeItem('role');
  }
}
