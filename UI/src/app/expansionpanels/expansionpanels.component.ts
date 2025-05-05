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
        {name:'Server Inventory',route:'serverInventory'}
      ]
    },
    {
      name:'Network',
      children:[
        {name:'Inventory',route:'networkInventory'}
      ]
    },
    {
      name:'Database',
      children:[
        {name:'Inventory',route:'databaseInventory'}
      ]
    },
    {
      name:'Storage',
      children:[
        {name:'Inventory',route:'storageInventory'}
      ]
    }
  ];

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

}
