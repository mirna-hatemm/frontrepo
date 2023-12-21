import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Slot {
  reservationId: number;
  // Add other relevant properties of a slot
}

@Component({
  selector: 'app-cancel-slot',
  templateUrl: './cancel-slot.component.html',
  styleUrls: ['./cancel-slot.component.css']
})
export class CancelSlotComponent implements OnInit {
  bookedSlots: Slot[] = [];
  selectedSlot: Slot | null = null;
  cancelResponse: string;

  constructor(private http: HttpClient) {
    this.cancelResponse = '';
  }

  ngOnInit() {
    this.getBookedSlots();
  }

  getBookedSlots() {
    // Make an HTTP GET request to fetch the patient's booked slots
    this.http.get<any>('/http://127.0.0.1.5000/getBookedSlots').subscribe(
      response => {
        // Assign the retrieved slots to the 'bookedSlots' array
        this.bookedSlots = response.bookedSlots;
      },
      error => {
        // Handle error response
        this.cancelResponse = 'Error fetching booked slots: ' + error.message;
      }
    );
  }

  cancelSlot(reservationId: number) {
    // Make an HTTP DELETE request to cancel the selected slot
    this.http.delete(`/http://127.0.0.1.5000/cancelSlot/${reservationId}`).subscribe(
      response => {
        // Update the booked slots array after cancellation
        this.bookedSlots = this.bookedSlots.filter(slot => slot.reservationId !== reservationId);
        this.cancelResponse = 'Slot cancellation successful!';
      },
      error => {
        // Handle error response
        this.cancelResponse = 'Error canceling slot: ' + error.message;
      }
    );
  }
}