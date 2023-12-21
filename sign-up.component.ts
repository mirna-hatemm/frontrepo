import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { 'passwordMismatch': true };
  }

  return null;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) 
    { 
      this.signUpForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        userType: ['', Validators.required]
      });
    }

  ngOnInit(){  
    this.signUpForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', Validators.required],
    userType: ['', Validators.required]
    }, { validator: passwordMatchValidator });
}

signUp() {
  if (this.signUpForm.valid) {
    const username = this.signUpForm.get('username')?.value;
    const password = this.signUpForm.get('password')?.value;
    const email = this.signUpForm.get('email')?.value;
    const userType = this.signUpForm.get('userType')?.value;
    
    this.authService.signUp(username, email, password, userType).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/sign-in']);
      },
      error => {
        console.error('Error during sign up:', error);
      }
    );
  } else {
    console.error('Form is not valid:', this.signUpForm.errors);
  }}}