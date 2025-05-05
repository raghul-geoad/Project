import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ExpansionpanelsComponent } from './expansionpanels/expansionpanels.component';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { ServerInventoryComponent } from './server-inventory/server-inventory.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[LoginAuthGuard],children:[
    {path:'',component:ExpansionpanelsComponent,pathMatch:'full'},
    {path:'serverInventory',component:ServerInventoryComponent},
    {path:'networkInventory',component:ServerInventoryComponent},
    {path:'databaseInventory',component:ServerInventoryComponent},
    {path:'storageInventory',component:ServerInventoryComponent}
  ]
  },
  {path:'accessDenied',component:AccessDeniedComponent},
  {path:"**",component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingModule = [LoginComponent,SignupComponent,DashboardComponent,HeaderComponent,FooterComponent,ServerInventoryComponent,AccessDeniedComponent]
