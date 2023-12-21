import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = environment.backendUrl;
  private fetchedSlots = new BehaviorSubject<any[]>([]);  // Using any[] for simplicity

  constructor(private http: HttpClient) { }

  setFetchedSlots(slots: any[]): void {
    this.fetchedSlots.next(slots);
  }
  
  getAvailableSlots(doctorUsername: string): Observable<any[]> {  // Using any[] for simplicity
    const url = `${this.apiUrl}/viewAvailableSlots?doctor_username=${doctorUsername}`;
    return this.http.get<any[]>(url);
  }
  
  getFetchedSlots(): Observable<any[]> {
    return this.fetchedSlots.asObservable();
  }
  
  setSchedule(doctorUsername: string, reservationDate: string, reservationTime: string, reservationEndTime: string): Observable<any> {
    const url = `${this.apiUrl}/setSchedule`;
    // Modify the body to match the backend's expected property names
    const body = {
      doctor_username: doctorUsername,
      reservation_date: reservationDate,
      reservation_time: reservationTime,
      reservation_endtime: reservationEndTime
    };
    return this.http.post(url, body);
  }
  
  
}
