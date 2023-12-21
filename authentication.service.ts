import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // Import the environment

interface User {
  username: string;
  user_type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUser: User | null = null;

  // Use the environment variable for the API URLs
  private loginUrl = `${environment.backendUrl}/login`;
  private signupUrl = `${environment.backendUrl}/signup`;

  constructor(private http: HttpClient) { }

  login(username: string, password: string, userType: string): Observable<any> {
    const body = { username, password, user_type: userType };
    return this.http.post<any>(this.loginUrl, body);
  }

  setCurrentUser(username: string, userType?: string): void {
    this.currentUser = { username, user_type: userType };
  }

  getLoggedInUsername(): string | null {
    return this.currentUser ? this.currentUser.username : null;
  }

  isDoctor(): boolean {
    return this.currentUser?.user_type === 'doctor' ?? false;
  }
  
  logout(): void {
    this.currentUser = null;
  }

  signUp(username: string, email: string, password: string, userType: string): Observable<any> {
    const body = { username, email, password, user_type: userType };
    return this.http.post<any>(this.signupUrl, body);
  }

  getPatientUsername(): string | null {
    return this.currentUser ? this.currentUser.username : null;
  }

  // Add any additional methods needed for the service
}
