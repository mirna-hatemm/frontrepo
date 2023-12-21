import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { PatientComponent } from 'src/app/patient/patient.component';
import { DoctorComponent } from'src/app/doctor/doctor.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;
  isPatient: boolean = false;
  isDoctor: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { 
      this.signInForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        userType: ['', Validators.required]
      });
    }

    ngOnInit(){  
      this.signInForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['', Validators.required]
    });}

    signIn() {
      if (this.signInForm.valid) {
        const username = this.signInForm.get('username')?.value;
        const password = this.signInForm.get('password')?.value;
        const userType = this.signInForm.get('userType')?.value;
        this.authService.login(username, password, userType).subscribe(
          response => {
            console.log('Response:', response);
            alert(response.message); // Access the 'message' property of the response
            // Set current user with userType
            this.authService.setCurrentUser(username, userType);
            // Based on the user type, navigate to the correct route
            if (userType === 'doctor') {
              this.router.navigate(['/doctor']); // Navigate to doctor component
            } else {
              this.router.navigate(['/patient']); // Navigate to patient component
            }
          },
          error => {
            console.log('Error:', error);
            alert(error.error.message); // Access the 'message' property of the error response
          }
        );
      }
    }
  }    