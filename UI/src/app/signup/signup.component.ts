import { Component, OnInit, OnChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { 'mismatch': true };
  }
  return null;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm : FormGroup;
  user:string='';
  pass:string='';
  public hide=true;
  public hide1=true;
  public errorMessage:string='';
  public successmessage:string='';
  constructor() {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]+$')
      ]),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: passwordMatchValidator });
    
   }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.signupForm.valueChanges.subscribe(() => {
      this.getErrorMessages();
    });
  }
  getErrorMessages() {
    this.getErrorUsername();
    this.getErrorPassword();
    this.getErrorconfirmPassword();
  }


  getErrorUsername(){
    const username = this.signupForm.get('username');
    if (username?.hasError('required')) {
      return 'Username is required.';
    } else if (username?.hasError('minlength')) {
      return 'Enter a username of length 8 or above.';
    }
    return '';
  }
  getErrorPassword(){
    const password = this.signupForm.get('password');
    if (password?.hasError('required')) {
      return 'Password is required.';
    } else if (password?.hasError('minlength')) {
      return 'Password must be at least 8 characters long.';
    } else if (password?.hasError('pattern')) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, and one number, and no special characters.';
    }
    return '';
  }
  getErrorconfirmPassword(){
    const confirmPassword = this.signupForm.get('confirmPassword');
    if (confirmPassword?.hasError('required')) {
      return 'Confirm password is required.';
    } else if (this.signupForm.hasError('mismatch')) {
      return 'Password and confirm password did not match.';
    }
    return '';
  }

    signup():void{
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
