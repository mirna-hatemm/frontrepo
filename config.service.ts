import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig() {
    return this.http.get('/config/config.json')
      .toPromise()
      .then(data => {
        this.config = data;
      });
  }

  get backendUrl() {
    return this.config.backendUrl;
  }
}
