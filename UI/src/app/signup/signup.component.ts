import { Component, OnInit, OnChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';

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
  constructor(private router : Router,private signUpService : SignupService) {
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
      // console.log(this.signupForm.get('username')?.value)
      this.signUpService.signup(this.signupForm.get('username')?.value,this.signupForm.get('password')?.value).subscribe({
        next: response => {
          if (response.message === 'success') {
            alert("Signup is successful, click 'ok' to navigate to Login Page.");
            this.router.navigate(['/login']);
          }
          else{
            alert(response.message);
          }
        },
        error: error => {
          alert('An error occurred: ' + error.message);
        }
      });
    }

}
