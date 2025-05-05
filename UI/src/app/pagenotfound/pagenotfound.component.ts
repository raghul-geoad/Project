import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  redirect(){
    const url=this.router.url;
    console.log(url);
    if(url.startsWith("/dashboard")){
      this.router.navigate(['/dashboard']);
    }
    else if(url.startsWith('/login')){
      this.router.navigate(['/login']);
    }
    else{
      this.router.navigate(['/']);
    }
  }

}
