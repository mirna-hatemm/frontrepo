import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

interface Appointment {
  id: number;
  doctor: string;
  slot: string;
}

@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.css']
})
export class UpdateAppointmentComponent implements OnInit {

  appointments: Appointment[] = [];
  selectedAppointment: Appointment | null = null;
  updateForm!: FormGroup;
  updateResponse: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.updateResponse = '';
  }

  ngOnInit(): void {
    this.getPatientAppointments();
    this.updateForm = new FormGroup({
      doctor: new FormControl('', Validators.required),
      slot: new FormControl('', Validators.required)
    });
  }

  getPatientAppointments() {
    // Make an HTTP GET request to fetch the patient's appointments
    this.http.get<any>('/http://127.0.0.1.5000/updateAppointment').subscribe(
      response => {
        // Assign the retrieved appointments to the 'appointments' array
        this.appointments = response.appointments;
      },
      error => {
        // Handle error response
        this.updateResponse = 'Error fetching appointments: ' + error.message;
      }
    );
  }

  onSelectAppointment(appointment: Appointment) {
    // Store the selected appointment
    this.selectedAppointment = appointment;
  }

  onUpdate() {
    if (this.updateForm.invalid || !this.selectedAppointment) {
      return;
    }

    const doctor = this.updateForm.value.doctor;
    const slot = this.updateForm.value.slot;
    const appointmentId = this.selectedAppointment.id;

    // Make an HTTP POST request to update the appointment
    this.http.post<any>('/http://127.0.0.1.5000/updateAppointment', { doctor, slot, appointmentId }).subscribe(
      response => {
        // Handle successful response
        this.updateResponse = 'Appointment updated successfully: ' + response.message;
      },
      error => {
        // Handle error response
        this.updateResponse = 'Error updating appointment: ' + error.message;
      }
    );
  }
}
