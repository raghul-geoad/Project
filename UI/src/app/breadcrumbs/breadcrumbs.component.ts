import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: string[] = [];
 
  labelMap: { [key: string]: string } = {
    dashboard: 'Home',
    serverInventory: 'Server Inventory',
    networkInventory : 'Network Inventory',
    databaseInventory : 'Database Inventory',
    storageInventory : 'Storage Inventory',
    accessRequest : 'Access Request Management'
  };
  constructor(private router:Router) {

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const urlSegments = this.router.url.split('/').filter(seg => seg);
        this.breadcrumbs = urlSegments;
      }
    });
   }

  ngOnInit(): void {
  }


getLabel(crumb: string): string {
  return this.labelMap[crumb] || crumb;
}

goTo(index: number) {
  const path = this.breadcrumbs.slice(0, index + 1).join('/');
  this.router.navigate(['/' + path]);
}
  
}
