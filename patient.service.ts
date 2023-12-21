// In patient.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface Reservation {
  reservationID: number;
  doctorUsername: string;
  reservationDate: string;
  reservationTime: string;
  reservationEndtime: string;
}
export interface Appointment {
  reservationID: number;
  doctorUsername: string;
  reservationDate: string;
  reservationTime: string;  // Consider using Date object or a specific string format
  reservationEndtime: string;  // Consider using Date object or a specific string format
}
export interface Doctor {
  username: string;
   // Assuming that each doctor has a username and a name
  // Add other necessary doctor properties
}
@Injectable({
  providedIn: 'root'
})

export class PatientService {
  private backendApiUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  getAvailableAppointments(doctorUsername: string): Observable<Appointment[]> {
    const url = `${this.backendApiUrl}/viewAvailableSlots?doctor_username=${doctorUsername}`;
    return this.http.get<Appointment[]>(url);
  }
  
// In patient.service.ts

// ...

bookAppointment(patientUsername: string, reservationId: number): Observable<any> {
  const url = `${this.backendApiUrl}/book_slot`;
  // Ensure the body matches what your backend expects
  const body = {
    patient_username: patientUsername,
    reservation_id: reservationId.toString(), // Convert number to string if required
  };
  return this.http.post(url, body);
}


// ...
getDoctorsList(): Observable<Doctor[]> {
  const url = `${this.backendApiUrl}/doctors`; // Make sure this endpoint is correct
  return this.http.get<Doctor[]>(url);
}
cancelAppointment(patientUsername: string, reservationId: number): Observable<any> {
  const url = `${this.backendApiUrl}/cancel_slot`;
  const body = {
    patient_username: patientUsername,
    reservation_id: reservationId.toString(),
  };
  return this.http.post(url, body);
}

updateAppointment(data: any): Observable<any> {
  const headers = { 'Content-Type': 'application/json' };
  return this.http.post(`${this.backendApiUrl}/update_appointment`, JSON.stringify(data), { headers });
}


  getPatientReservations(patientUsername: string): Observable<Reservation[]> {
    const url = `${this.backendApiUrl}/view_reservations?patient_username=${patientUsername}`;
    return this.http.get<{reservations: string[]}>(url).pipe(
      map(response => {
        if (!response || !response.reservations || response.reservations.length === 0) {
          // Handle no reservations case here
          return [];
        }
        return response.reservations.map(reservationString => {
          const match = /ID: (\d+), Doctor: ([^,]+), Date: ([^,]+), Time: ([^-]+) - ([^"]+)/.exec(reservationString);
          if (!match) {
            throw new Error('Failed to parse reservation string');
          }
          const [, id, doctorUsername, reservationDate, reservationTime, reservationEndtime] = match;
          return {
            reservationID: parseInt(id, 10),
            doctorUsername,
            reservationDate,
            reservationTime,
            reservationEndtime
          };
          
        });
      })
    );
    
    
  }
}