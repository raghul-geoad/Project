import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private signupURL = 'http://127.0.0.1:5000/signUp';
  constructor(private http :HttpClient) { }

  signup(username:any,password:any):Observable<any>{
    return this.http.post(this.signupURL,{"username":username,"password":password});
  }
}
