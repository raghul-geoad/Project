import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://127.0.0.1:5000/login';
  constructor(private http: HttpClient) { }

  login(username: any, password: any): Observable<any> {
    return this.http.post(this.loginUrl, {"username":username,"password": password});
  }
}
