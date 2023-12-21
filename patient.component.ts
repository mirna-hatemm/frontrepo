import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { AuthenticationService } from '../authentication.service';
import { Appointment } from '../patient.service';

interface Reservation {
  reservationID: number;
  doctorUsername: string;
  reservationDate: string;
  reservationTime: string;
  reservationEndtime: string;
}
interface Doctor {
  username: string;
  
  
}

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  appointments: Reservation[] = [];
  availableAppointments: Appointment[] = [];
  selectedDoctorUsername: string = "";
  patientUsername: string ='';
  doctorsList: Doctor[] = []; // Added this line to declare patientUsername
  typedDoctorUsername: string = '';
  constructor(
    private patientService: PatientService,
    public authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.fetchReservations();
    this.fetchDoctorsList(); // Corrected the method call here
  }
  
  fetchSlotsForTypedDoctor(): void {
    if (this.typedDoctorUsername) {
      this.fetchAvailableAppointments(this.typedDoctorUsername);
    }
  }

  selectDoctor(doctorUsername: string): void {
    this.selectedDoctorUsername = doctorUsername;
    this.fetchSlotsForTypedDoctor();
  }
  cancelAppointment(reservationId: number): void {
    // Get the logged-in patient's username
    const patientUsername = this.authService.getLoggedInUsername() || '';
    if (!patientUsername) {
      console.error('Patient must be logged in to cancel an appointment');
      return;
    }
  
    this.patientService.cancelAppointment(patientUsername, reservationId).subscribe(
      response => {
        console.log('Appointment canceled successfully', response);
  
        // Update the appointments list
        this.fetchReservations();
        
        // UI feedback for cancellation
      },
      error => {
        console.error('Failed to cancel the appointment:', error);
      }
    );
  }
  
  bookAppointment(reservationId: number): void {
    // Ensure the patient is logged in
    this.patientUsername = this.authService.getLoggedInUsername() || '';
    if (!this.patientUsername) {
      console.error('Patient must be logged in to book an appointment');
      return;
    }
  
    // Call the bookAppointment method from the service
    this.patientService.bookAppointment(this.patientUsername, reservationId).subscribe(
      response => {
        console.log('Appointment booked successfully', response);

        // Remove the booked appointment from the list of available appointments
        this.availableAppointments = this.availableAppointments.filter(appointment => appointment.reservationID !== reservationId);

        // Refresh the list of current appointments
        this.fetchReservations();

        // Optionally, you may want to add some UI acknowledgement here, such as a notification or alert.
      },
      error => {
        console.error('Failed to book the appointment:', error);
      }
    );
  }

  updateAppointment(appointment: Reservation): void {
    console.log('Attempting to update appointment', appointment);

    const updateData = {
      patient_username: this.authService.getLoggedInUsername(),
      chosen_id: appointment.reservationID,
      choice: 'D', // This should be dynamic based on user choice
      new_doctor: 'newDoctorUsername', // This should be dynamic based on user input
      new_slot_id: 123 // This should be dynamic based on user input
    };
  
    this.patientService.updateAppointment(updateData).subscribe(
      response => {
        console.log('Appointment updated successfully', response);
        this.fetchReservations(); // Refresh the appointments list
      },
      error => {
        console.error('Error updating appointment:', error);
        // Display an error message to the user
      }
    );
    }    
  
  
  fetchAvailableAppointments(doctorUsername: string): void {
    this.patientService.getAvailableAppointments(doctorUsername).subscribe(
      (appointments: Appointment[]) => {
        this.availableAppointments = appointments;
      },
      (error) => {
        console.error('Failed to fetch available appointments:', error);
      }
    );
  }

  fetchDoctorsList(): void {
    this.patientService.getDoctorsList().subscribe(
      (doctors: Doctor[]) => {
        this.doctorsList = doctors;
      },
      error => {
        console.error('Failed to fetch doctors list:', error);
      }
    );
  }
  fetchReservations(): void {
    const patientUsername = this.authService.getLoggedInUsername();
    if (patientUsername) {
      this.patientService.getPatientReservations(patientUsername).subscribe(
        (reservations: Reservation[]) => {
          this.appointments = reservations;
        },
        (error: unknown) => {
          console.error('Failed to fetch reservations:', error);
        }
      );
    } else {
      console.error('No patient is currently logged in.');
    }
  }
}