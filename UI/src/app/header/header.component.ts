import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  public role:any;
  public username:any;
  constructor(private router : Router,private authService : LoginService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
  }
  toggleSidenav() {
    this.sidenavToggle.emit();
  }
  logout():void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
