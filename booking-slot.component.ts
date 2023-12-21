import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booking-slot',
  templateUrl: './booking-slot.component.html',
  styleUrls: ['./booking-slot.component.css']
})

export class BookingSlotComponent implements OnInit {

  bookingForm: FormGroup;
  bookingResponse: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.bookingResponse = '';
    this.bookingForm = this.formBuilder.group({
      reservationID: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.bookingForm.invalid) {
      return;
    }

    const reservationID = this.bookingForm.value.reservationID;
    const username = this.bookingForm.value.username;

    this.http.post<any>('/http://127.0.0.1.5000/book_slot', { reservationID, username }).subscribe(
      response => {
        // Handle successful response
        this.bookingResponse = 'Slot booked successfully: ' + response.message;
      },
      error => {
        // Handle error response
        this.bookingResponse = 'Error booking slot: ' + error.message;
      }
    );
  }
}


