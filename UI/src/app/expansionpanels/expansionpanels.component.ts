import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expansionpanels',
  templateUrl: './expansionpanels.component.html',
  styleUrls: ['./expansionpanels.component.css']
})
export class ExpansionpanelsComponent implements OnInit {
  public teams= [
    {
      name:'Server',
      children:[
        {name:'Server Inventory',route:'inventory'}
      ]
    },
    {
      name:'Network',
      children:[
        {name:'Inventory',route:'inventory'}
      ]
    },
    {
      name:'Database',
      children:[
        {name:'Inventory',route:'inventory'}
      ]
    },
    {
      name:'Storage',
      children:[
        {name:'Inventory',route:'inventory'}
      ]
    }
  ];
  // public data:any;
  // public Inputheaders:any;
  // public Inputdata:any;
  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  navigateTo(route:any){
    if (route.toString()==='inventory'){
      this.router.navigate(['/dashboard/inventory'])
    } 
    if(route.toString()==='serverprocesscheck'){
      // if(this.role.getRole()==='user'){
      //   this.router.navigate(['/dashboard/accessdenied'])
      // }
      // else if(this.role.getRole()==='admin'){
      //   this.router.navigate(['/dashboard/serverprocesscheck'])
      // }
    }
  }

}
