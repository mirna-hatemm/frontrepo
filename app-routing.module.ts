// app-routing.module.ts or app.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientComponent } from './patient/patient.component';


const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'test', component: TestComponentComponent },
 { path: 'book_slot', component: DoctorComponent },

 { path: 'patient', component: PatientComponent },
 { path: 'doctor', component: DoctorComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' } // Redirect to sign-in by default
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
