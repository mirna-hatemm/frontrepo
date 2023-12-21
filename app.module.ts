import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DoctorComponent } from './doctor/doctor.component';
import { DoctorService } from './doctor.service';
import { AuthenticationService } from './authentication.service';
import { PatientComponent } from './patient/patient.component';
import { BookingSlotComponent } from './booking-slot/booking-slot.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';
import { CancelSlotComponent } from './cancel-slot/cancel-slot.component';

import { PatientService } from './patient.service';
import { ConfigService } from './config.service';
import { TestComponentComponent } from './test-component/test-component.component';

export function initializeApp(configService: ConfigService) {
  return (): Promise<any> => { 
    return configService.loadConfig();
  }
}


@NgModule({
  
  declarations: [
  AppComponent,
  SignInComponent,
  SignUpComponent,
  DoctorComponent,
  PatientComponent,
  BookingSlotComponent,
  UpdateAppointmentComponent,
  CancelSlotComponent,
 
  TestComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule ,
    AppRoutingModule ,

     
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true
    },
    DoctorService,
    AuthenticationService,
    PatientService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }