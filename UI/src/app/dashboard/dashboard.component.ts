import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menuOptions: { label: string, route: string }[] = [];
  events: string[] = [];
  public opened: boolean=true;
  @ViewChild('drawer') drawer!: MatDrawer;
  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  toggleSidenav() {
    this.drawer.toggle();
    console.log(sessionStorage.getItem("username"));
  }

}
