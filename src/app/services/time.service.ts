import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackingTimeService {
  private loginTime: number = 0;

  startTracking() {
    this.loginTime = Date.now();
  }

  getLoginDuration(): number {
    return Date.now() - this.loginTime; // Durée en millisecondes
  }
}
