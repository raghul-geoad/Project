import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {

  public user=sessionStorage.getItem('username')
  public componentName:any;
  constructor(private http:HttpClient,private router:Router,private snackBar:MatSnackBar) { 
    const nav = this.router.getCurrentNavigation();
    this.componentName = nav?.extras.state?.['componentName'];
  }

  ngOnInit(): void {
  }
  
  requestAccess(){
    this.http.post("http://127.0.0.1:5000/componentAccessRequest",{username:this.user,component:this.componentName}).subscribe({
      next : (data:any)=>{
        const snackBarRef = this.snackBar.open(data.message  ,'Close',{duration:3000});
      },
      error : (err)=>{
        this.snackBar.open('Request Failed','Close',{duration:3000});
        console.error(err);
      }
  });
  }

}
