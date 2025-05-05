import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {

  public user=sessionStorage.getItem('username')
  public componentName:any;
  constructor(private http:HttpClient) { 
    
  }

  ngOnInit(): void {
  }
  
  requestAccess(){
    // this.http.post("http://127.0.0.1:5000/componentAccessRequest",{name:this.user,component:})
  }

}
