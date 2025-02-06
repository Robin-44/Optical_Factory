import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpService {
  private ipSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    const storedIp = sessionStorage.getItem('userIp');
    if (storedIp) {
      this.ipSubject.next(storedIp);
    } else {
      this.fetchIp();
    }
  }

  private fetchIp() {
    this.http.get<{ ip: string }>('https://api64.ipify.org?format=json').subscribe(
      data => {
        this.ipSubject.next(data.ip);
        sessionStorage.setItem('userIp', data.ip);
      },
      error => console.error("Erreur lors de la récupération de l'IP :", error)
    );
  }

  getIp(): Observable<string> {
    return this.ipSubject.asObservable();
  }
}
