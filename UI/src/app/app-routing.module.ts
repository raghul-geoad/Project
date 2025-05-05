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
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[LoginAuthGuard],children:[
    {path:'',component:ExpansionpanelsComponent,pathMatch:'full'},
    {path:'serverInventory',component:ServerInventoryComponent,canActivate:[RoleGuard],data:{componentName:'Server'}},
    {path:'networkInventory',component:ServerInventoryComponent,canActivate:[RoleGuard],data:{componentName:'Network'}},
    {path:'databaseInventory',component:ServerInventoryComponent,canActivate:[RoleGuard],data:{componentName:'Database'}},
    {path:'storageInventory',component:ServerInventoryComponent,canActivate:[RoleGuard],data:{componentName:'Storage'}}
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
