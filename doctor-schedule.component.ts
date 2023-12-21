import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/doctor.service';

// Ensure this interface is in a separate file and imported, or at the top of your component file
export interface DoctorSchedule {
  reservationID: number;
  doctorUsername: string;
  reservationDate: string;
  reservationTime: string;
  reservationEndtime: string;
}

@Component({
  selector: 'app-doctor-schedule',
  templateUrl: './doctor-schedule.component.html',
  styleUrls: ['./doctor-schedule.component.css']
})
export class DoctorScheduleComponent implements OnInit {
  doctorScheduleForm: FormGroup;
  slots: DoctorSchedule[] = []; // This is the initialization of the array

  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService
  ) {
    this.doctorScheduleForm = this.formBuilder.group({
      date: ['', Validators.required],
      hour: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Here you would call the service to fill the slots with actual data from the backend
    this.doctorService.getFetchedSlots().subscribe(
      (slots: DoctorSchedule[]) => { // Make sure the data you receive is of the type DoctorSchedule[]
        this.slots = slots;
      },
      error => {
        console.error('Error fetching slots:', error);
      }
    );
  }

  onSubmit(): void {
    // Your form submission logic here
  }
}
