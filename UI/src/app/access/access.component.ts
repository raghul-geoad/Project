import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  public dataSource = new MatTableDataSource();
  public displayColumns=["username","component","action"];
  constructor(private http:HttpClient,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.http.get("http://127.0.0.1:5000/getUserRequest").subscribe((data:any)=>this.dataSource=data,(err)=>console.error(err));
  }
  
  processRequest(row:any,action:boolean){
    const message=action?"Request accepted successfully":"Request rejected successfully";
    this.http.post("http://127.0.0.1:5000/processAccessRequest",{
      username:row.user,
      component:row.component,
      action:action
    }).subscribe((res)=>{
      this.snackBar.open(message,'Close',{duration:3000})
    },(err)=>{
      console.error(err);
      this.snackBar.open('Request Failed','Close',{duration:3000})
    })
    setTimeout(() => {
      window.location.reload();  
    }, 3000);
  }

}
