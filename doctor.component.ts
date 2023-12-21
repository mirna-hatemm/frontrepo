import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DoctorService } from 'src/app/doctor.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  slots: any[] = [];
  
  newScheduleDate: string = ''; // Initialized as empty for user input
  newScheduleStartTime: string = ''; // Initialized as empty for user input
  newScheduleEndTime: string = ''; // Initialized as empty for user input
  slotsFetched = false;
  selectedSlot: any;
  constructor(
    private doctorService: DoctorService,
    public authService: AuthenticationService
  ) {}
  

  ngOnInit(): void {
    if (this.authService.isDoctor()) {
      const doctorUsername = this.getDoctorUsername();
      this.fetchAvailableSlots(doctorUsername);
    } else {
      console.error('Logged in user is not a doctor.');
    }
  }
   getDoctorUsername(): string {
    const loggedInUsername = this.authService.getLoggedInUsername();
    if (!loggedInUsername) {
      throw new Error('No doctor is currently logged in.');
    }
    return loggedInUsername; // loggedInUsername is already a string
  }
  

  onSelectSlot(slot: any): void {
    this.selectedSlot = slot; // Assign the selected slot to the property
  }
  handleBooking(successful: boolean): void {
    if (successful) {
      console.log('Slot was booked successfully');
      // Add any logic you want to perform after a successful booking
    } else {
      console.error('Failed to book the slot');
      // Add any logic for handling the unsuccessful booking attempt
    }
  }
  getPatientUsername(): string {
    const patientUsername = this.authService.getPatientUsername();
    if (!patientUsername) {
      throw new Error('No patient is currently logged in.');
    }
    return patientUsername;
  }


  fetchAvailableSlots(doctorUsername: string): void {
    this.doctorService.getAvailableSlots(doctorUsername).subscribe(
      slots => {
        this.slots = slots;
        this.slotsFetched = true; // Update the flag
        this.doctorService.setFetchedSlots(slots);
      },
      error => {
        console.error('Failed to fetch available slots:', error);
        this.slotsFetched = true; // Update the flag even on error
      }
    );
  }
  testClick() {
    console.log('Button clicked');
  }
  

 
  setSchedule(): void {
    // Get the logged-in doctor's username
    const doctorUsername = this.getDoctorUsername();
  
    // Check if the new schedule details have been entered
    if (this.newScheduleDate && this.newScheduleStartTime && this.newScheduleEndTime) {
      // Call the service to set the schedule with the logged-in doctor's username
      this.doctorService.setSchedule(
        doctorUsername,
        this.newScheduleDate,
        this.newScheduleStartTime,
        this.newScheduleEndTime
      ).subscribe(
        response => {
          console.log('Schedule set successfully:', response);
          // Optionally, refresh the slots to show the updated schedule
          this.fetchAvailableSlots(doctorUsername);
        },
        error => {
          console.error('Failed to set schedule:', error);
          // TODO: Display error details in the UI
          console.error('Error details:', error.error);
        }
      );
    } else {
      console.error('All fields are required to set a schedule.');
      // Inform the user that all fields are required
    }
  }
}  