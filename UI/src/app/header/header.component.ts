import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  public role:any;
  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  toggleSidenav() {
    this.sidenavToggle.emit();
  }
  logout():void {
    // this.authService.logout();
    this.router.navigate(['login'])
  }
}
