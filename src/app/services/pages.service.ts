import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TrackingPages {
  private pageCount = 0;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.pageCount++;
        console.log("Pages visitées :", this.pageCount);
      }
    });
  }

  getPageCount(): number {
    return this.pageCount;
  }
}
