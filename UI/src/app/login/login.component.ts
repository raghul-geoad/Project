import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = new FormControl('',[Validators.required, Validators.minLength(8)])
  password = new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]+$')])
  user:string='';
  pass:string='';
  message:string='';
  public hide = true;
  public errorMessage:string='';
  constructor(private router: Router, private location: Location,private loginService : LoginService) { }

  ngOnInit(): void {
  }
  getErrorUsername(){
    if(this.username.hasError('required')){
      return 'Username is required.'
    }
    else if(this.username.invalid){
      return 'Enter username of length of 8 or above.'
    }
    return '';
  }
  getErrorPassword(){
    if (this.password.hasError('required')) {
      return 'Password is required.';
    } else if (this.password.hasError('minlength')) {
      return 'Password must be at least 8 characters long.';
    }
    else if(!this.password.hasError('required') && !this.password.hasError('minlength')){
      if (this.password.hasError('pattern')){
        return "Password must contain at least one uppercase letter, one lowercase letter, and one number, and no special characters."
      }
    }
    return '';
    }

    Signup(){
      this.router.navigate(['/signup'])
    }
    loginRoute():void{

      this.loginService.login(this.username, this.password).subscribe({
        next : (response) => {
            if (response.message === 'success') {
              this.router.navigate(['/dashboard']); 
            } else {
              this.message = response.message;
            }
          },
          error : (error) => {
            this.message = error.error?.message || 'An error occurred';
          }
      });      
    }


}