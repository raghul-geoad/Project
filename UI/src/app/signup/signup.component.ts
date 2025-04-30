import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username = new FormControl('',[Validators.required, Validators.minLength(8)])
  password = new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]+$')])
  user:string='';
  pass:string='';
  public hide=true;
  public errorMessage:string='';
  constructor() { }

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

    loginRoute():void{
      // if(this.loginService.login(this.user,this.pass)){
      //   this.router.navigate(['/dashboard']);
      // }
      // else{
      //   this.errorMessage = 'Invalid Credentials';
      //   this.username.reset();
      //   this.password.reset();
      // }
    }

}
