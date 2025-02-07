// // // // // // // // // // // // // // // import { Injectable } from '@angular/core';
// // // // // // // // // // // // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // // // // // // // // // // // import { BehaviorSubject } from 'rxjs';

// // // // // // // // // // // // // // // @Injectable({
// // // // // // // // // // // // // // //   providedIn: 'root'
// // // // // // // // // // // // // // // })
// // // // // // // // // // // // // // // export class TrackingService {
// // // // // // // // // // // // // // //   private loginTime: number = 0;
// // // // // // // // // // // // // // //   private pageCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

// // // // // // // // // // // // // // //   constructor(private router: Router) {
// // // // // // // // // // // // // // //     this.router.events.subscribe(event => {
// // // // // // // // // // // // // // //       if (event instanceof NavigationEnd) {
// // // // // // // // // // // // // // //         this.pageCount.next(this.pageCount.value + 1);
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   startTracking() {
// // // // // // // // // // // // // // //     this.loginTime = Date.now();
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getLoginDuration(): number {
// // // // // // // // // // // // // // //     return Date.now() - this.loginTime; // Durée en millisecondes
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getPageCountObservable() {
// // // // // // // // // // // // // // //     return this.pageCount.asObservable();
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // import { Injectable } from '@angular/core';
// // // // // // // // // // // // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // // // // // // // // // // // import { BehaviorSubject } from 'rxjs';

// // // // // // // // // // // // // // // @Injectable({
// // // // // // // // // // // // // // //   providedIn: 'root'
// // // // // // // // // // // // // // // })
// // // // // // // // // // // // // // // export class TrackingService {
// // // // // // // // // // // // // // //   private loginTime: number = 0;
// // // // // // // // // // // // // // //   private pageCount: BehaviorSubject<number>;

// // // // // // // // // // // // // // //   constructor(private router: Router) {
// // // // // // // // // // // // // // //     // Récupération du nombre de pages visitées depuis sessionStorage
// // // // // // // // // // // // // // //     const storedPageCount = Number(sessionStorage.getItem('pageCount')) || 0;
// // // // // // // // // // // // // // //     this.pageCount = new BehaviorSubject<number>(storedPageCount);

// // // // // // // // // // // // // // //     this.router.events.subscribe(event => {
// // // // // // // // // // // // // // //       if (event instanceof NavigationEnd) {
// // // // // // // // // // // // // // //         this.incrementPageCount();
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   startTracking() {
// // // // // // // // // // // // // // //     this.loginTime = Date.now();
// // // // // // // // // // // // // // //     sessionStorage.setItem('loginTime', this.loginTime.toString()); // Stocker dans sessionStorage
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getLoginDuration(): number {
// // // // // // // // // // // // // // //     const storedTime = Number(sessionStorage.getItem('loginTime')) || Date.now();
// // // // // // // // // // // // // // //     return Date.now() - storedTime; // Durée en millisecondes
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   incrementPageCount() {
// // // // // // // // // // // // // // //     const newCount = this.pageCount.value + 1;
// // // // // // // // // // // // // // //     this.pageCount.next(newCount);
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageCount', newCount.toString()); // Mise à jour de sessionStorage
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getPageCountObservable() {
// // // // // // // // // // // // // // //     return this.pageCount.asObservable();
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // import { Injectable } from '@angular/core';
// // // // // // // // // // // // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // // // // // // // // // // // import { BehaviorSubject } from 'rxjs';

// // // // // // // // // // // // // // // @Injectable({
// // // // // // // // // // // // // // //   providedIn: 'root'
// // // // // // // // // // // // // // // })
// // // // // // // // // // // // // // // export class TrackingService {
// // // // // // // // // // // // // // //   private loginTime: number = 0;
// // // // // // // // // // // // // // //   private pageStartTime: number = 0;
// // // // // // // // // // // // // // //   private totalTimeSpent: number = 0;
// // // // // // // // // // // // // // //   private pageCount: BehaviorSubject<number>;

// // // // // // // // // // // // // // //   constructor(private router: Router) {
// // // // // // // // // // // // // // //     // Récupération des valeurs stockées
// // // // // // // // // // // // // // //     const storedTotalTime = Number(sessionStorage.getItem('totalTimeSpent')) || 0;
// // // // // // // // // // // // // // //     const storedPageCount = Number(sessionStorage.getItem('pageCount')) || 0;

// // // // // // // // // // // // // // //     this.totalTimeSpent = storedTotalTime;
// // // // // // // // // // // // // // //     this.pageCount = new BehaviorSubject<number>(storedPageCount);

// // // // // // // // // // // // // // //     this.router.events.subscribe(event => {
// // // // // // // // // // // // // // //       if (event instanceof NavigationEnd) {
// // // // // // // // // // // // // // //         this.trackPageTime();
// // // // // // // // // // // // // // //         this.incrementPageCount();
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   startTracking() {
// // // // // // // // // // // // // // //     this.loginTime = Date.now();
// // // // // // // // // // // // // // //     sessionStorage.setItem('loginTime', this.loginTime.toString());

// // // // // // // // // // // // // // //     // Démarrage du temps de page
// // // // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getLoginDuration(): number {
// // // // // // // // // // // // // // //     const storedTime = Number(sessionStorage.getItem('loginTime')) || Date.now();
// // // // // // // // // // // // // // //     return Date.now() - storedTime;
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getTotalTimeSpent(): number {
// // // // // // // // // // // // // // //     return this.totalTimeSpent + this.getCurrentPageTime();
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getCurrentPageTime(): number {
// // // // // // // // // // // // // // //     const storedPageStart = Number(sessionStorage.getItem('pageStartTime')) || Date.now();
// // // // // // // // // // // // // // //     return Date.now() - storedPageStart;
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   trackPageTime() {
// // // // // // // // // // // // // // //     const pageTime = this.getCurrentPageTime();
// // // // // // // // // // // // // // //     this.totalTimeSpent += pageTime;
// // // // // // // // // // // // // // //     sessionStorage.setItem('totalTimeSpent', this.totalTimeSpent.toString());

// // // // // // // // // // // // // // //     // Réinitialiser le temps de la nouvelle page
// // // // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   incrementPageCount() {
// // // // // // // // // // // // // // //     const newCount = this.pageCount.value + 1;
// // // // // // // // // // // // // // //     this.pageCount.next(newCount);
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageCount', newCount.toString());
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getPageCountObservable() {
// // // // // // // // // // // // // // //     return this.pageCount.asObservable();
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }


// // // // // // // // // // // // // // // import { Injectable } from '@angular/core';
// // // // // // // // // // // // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // // // // // // // // // // // import { BehaviorSubject } from 'rxjs';

// // // // // // // // // // // // // // // @Injectable({
// // // // // // // // // // // // // // //   providedIn: 'root'
// // // // // // // // // // // // // // // })
// // // // // // // // // // // // // // // export class TrackingService {
// // // // // // // // // // // // // // //   private pageStartTime: number = 0;
// // // // // // // // // // // // // // //   private pageCount: BehaviorSubject<number>;

// // // // // // // // // // // // // // //   constructor(private router: Router) {
// // // // // // // // // // // // // // //     // Récupération des valeurs stockées
// // // // // // // // // // // // // // //     const storedTotalTime = Number(sessionStorage.getItem('totalTimeSpent')) || 0;
// // // // // // // // // // // // // // //     const storedPageCount = Number(sessionStorage.getItem('pageCount')) || 0;

// // // // // // // // // // // // // // //     this.pageCount = new BehaviorSubject<number>(storedPageCount);

// // // // // // // // // // // // // // //     this.router.events.subscribe(event => {
// // // // // // // // // // // // // // //       if (event instanceof NavigationEnd) {
// // // // // // // // // // // // // // //         this.trackPageTime();
// // // // // // // // // // // // // // //         this.incrementPageCount();
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   startTracking() {
// // // // // // // // // // // // // // //     // Stocke l'heure de début de session si elle n'existe pas encore
// // // // // // // // // // // // // // //     if (!sessionStorage.getItem('loginTime')) {
// // // // // // // // // // // // // // //       sessionStorage.setItem('loginTime', Date.now().toString());
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     // Initialisation du temps sur la page actuelle
// // // // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getLoginDuration(): number {
// // // // // // // // // // // // // // //     const storedTime = Number(sessionStorage.getItem('loginTime')) || Date.now();
// // // // // // // // // // // // // // //     return Date.now() - storedTime;
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getTotalTimeSpent(): number {
// // // // // // // // // // // // // // //     const storedTotalTime = Number(sessionStorage.getItem('totalTimeSpent')) || 0;
// // // // // // // // // // // // // // //     return storedTotalTime + this.getCurrentPageTime();
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getCurrentPageTime(): number {
// // // // // // // // // // // // // // //     const storedPageStart = Number(sessionStorage.getItem('pageStartTime')) || Date.now();
// // // // // // // // // // // // // // //     return Date.now() - storedPageStart;
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   trackPageTime() {
// // // // // // // // // // // // // // //     // Ajoute le temps passé sur la page actuelle au total
// // // // // // // // // // // // // // //     const pageTime = this.getCurrentPageTime();
// // // // // // // // // // // // // // //     const storedTotalTime = Number(sessionStorage.getItem('totalTimeSpent')) || 0;

// // // // // // // // // // // // // // //     const newTotalTime = storedTotalTime + pageTime;
// // // // // // // // // // // // // // //     sessionStorage.setItem('totalTimeSpent', newTotalTime.toString());

// // // // // // // // // // // // // // //     // Réinitialiser le temps de la nouvelle page
// // // // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   incrementPageCount() {
// // // // // // // // // // // // // // //     const newCount = this.pageCount.value + 1;
// // // // // // // // // // // // // // //     this.pageCount.next(newCount);
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageCount', newCount.toString());
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getPageCountObservable() {
// // // // // // // // // // // // // // //     return this.pageCount.asObservable();
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // import { Injectable } from '@angular/core';
// // // // // // // // // // // // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // // // // // // // // // // // import { BehaviorSubject } from 'rxjs';

// // // // // // // // // // // // // // // @Injectable({
// // // // // // // // // // // // // // //   providedIn: 'root'
// // // // // // // // // // // // // // // })
// // // // // // // // // // // // // // // export class TrackingService {
// // // // // // // // // // // // // // //   private pageStartTime: number = 0;
// // // // // // // // // // // // // // //   private pageCount: BehaviorSubject<number>;

// // // // // // // // // // // // // // //   constructor(private router: Router) {
// // // // // // // // // // // // // // //     // Récupération des valeurs stockées
// // // // // // // // // // // // // // //     if (!sessionStorage.getItem('totalTimeSpent')) {
// // // // // // // // // // // // // // //       sessionStorage.setItem('totalTimeSpent', '0');
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //     if (!sessionStorage.getItem('pageCount')) {
// // // // // // // // // // // // // // //       sessionStorage.setItem('pageCount', '0');
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     this.pageCount = new BehaviorSubject<number>(Number(sessionStorage.getItem('pageCount')));

// // // // // // // // // // // // // // //     this.router.events.subscribe(event => {
// // // // // // // // // // // // // // //       if (event instanceof NavigationEnd) {
// // // // // // // // // // // // // // //         this.trackPageTime();
// // // // // // // // // // // // // // //         this.incrementPageCount();
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   startTracking() {
// // // // // // // // // // // // // // //     // Si première connexion, on enregistre l'heure de début
// // // // // // // // // // // // // // //     if (!sessionStorage.getItem('loginTime')) {
// // // // // // // // // // // // // // //       sessionStorage.setItem('loginTime', Date.now().toString());
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     // Démarrer le temps pour la page actuelle
// // // // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getLoginDuration(): number {
// // // // // // // // // // // // // // //     return Date.now() - Number(sessionStorage.getItem('loginTime'));
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getTotalTimeSpent(): number {
// // // // // // // // // // // // // // //     const storedTotalTime = Number(sessionStorage.getItem('totalTimeSpent')) || 0;
// // // // // // // // // // // // // // //     return storedTotalTime + this.getCurrentPageTime();
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getCurrentPageTime(): number {
// // // // // // // // // // // // // // //     return Date.now() - Number(sessionStorage.getItem('pageStartTime'));
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   trackPageTime() {
// // // // // // // // // // // // // // //     const currentPageTime = this.getCurrentPageTime();
// // // // // // // // // // // // // // //     const storedTotalTime = Number(sessionStorage.getItem('totalTimeSpent')) || 0;

// // // // // // // // // // // // // // //     // 🔥 Ajout du temps actuel au total
// // // // // // // // // // // // // // //     const newTotalTime = storedTotalTime + currentPageTime;
// // // // // // // // // // // // // // //     sessionStorage.setItem('totalTimeSpent', newTotalTime.toString());

// // // // // // // // // // // // // // //     // 🔄 Réinitialiser pour la nouvelle page
// // // // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   incrementPageCount() {
// // // // // // // // // // // // // // //     const newCount = this.pageCount.value + 1;
// // // // // // // // // // // // // // //     this.pageCount.next(newCount);
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageCount', newCount.toString());
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getPageCountObservable() {
// // // // // // // // // // // // // // //     return this.pageCount.asObservable();
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }


// // // // // // // // // // // // // // // import { Injectable } from '@angular/core';
// // // // // // // // // // // // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // // // // // // // // // // // import { BehaviorSubject } from 'rxjs';

// // // // // // // // // // // // // // // interface PageVisit {
// // // // // // // // // // // // // // //   url: string;
// // // // // // // // // // // // // // //   time: number;
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // @Injectable({
// // // // // // // // // // // // // // //   providedIn: 'root'
// // // // // // // // // // // // // // // })
// // // // // // // // // // // // // // // export class TrackingService {
// // // // // // // // // // // // // // //   private pageStartTime: number = 0;
// // // // // // // // // // // // // // //   private pageVisits: PageVisit[] = [];
// // // // // // // // // // // // // // //   private pageCount: BehaviorSubject<number>;

// // // // // // // // // // // // // // //   constructor(private router: Router) {
// // // // // // // // // // // // // // //     // Charger les données sauvegardées
// // // // // // // // // // // // // // //     this.loadTrackingData();

// // // // // // // // // // // // // // //     this.router.events.subscribe(event => {
// // // // // // // // // // // // // // //       if (event instanceof NavigationEnd) {
// // // // // // // // // // // // // // //         this.trackPageTime();
// // // // // // // // // // // // // // //         this.incrementPageCount(event.urlAfterRedirects);
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   private loadTrackingData() {
// // // // // // // // // // // // // // //     const storedPageVisits = sessionStorage.getItem('pageVisits');
// // // // // // // // // // // // // // //     if (storedPageVisits) {
// // // // // // // // // // // // // // //       this.pageVisits = JSON.parse(storedPageVisits);
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     const storedPageCount = Number(sessionStorage.getItem('pageCount')) || 0;
// // // // // // // // // // // // // // //     this.pageCount = new BehaviorSubject<number>(storedPageCount);
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   startTracking() {
// // // // // // // // // // // // // // //     if (!sessionStorage.getItem('loginTime')) {
// // // // // // // // // // // // // // //       sessionStorage.setItem('loginTime', Date.now().toString());
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getLoginDuration(): number {
// // // // // // // // // // // // // // //     return Date.now() - Number(sessionStorage.getItem('loginTime'));
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getTotalTimeSpent(): number {
// // // // // // // // // // // // // // //     return this.pageVisits.reduce((total, visit) => total + visit.time, 0);
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getCurrentPageTime(): number {
// // // // // // // // // // // // // // //     return Date.now() - Number(sessionStorage.getItem('pageStartTime'));
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   trackPageTime() {
// // // // // // // // // // // // // // //     const currentPageTime = this.getCurrentPageTime();
// // // // // // // // // // // // // // //     const currentUrl = window.location.href;

// // // // // // // // // // // // // // //     if (this.pageVisits.length > 0) {
// // // // // // // // // // // // // // //       this.pageVisits[this.pageVisits.length - 1].time = currentPageTime;
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));

// // // // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   incrementPageCount(url: string) {
// // // // // // // // // // // // // // //     const newCount = this.pageCount.value + 1;
// // // // // // // // // // // // // // //     this.pageCount.next(newCount);
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageCount', newCount.toString());

// // // // // // // // // // // // // // //     this.pageVisits.push({ url: url, time: 0 });
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getTrackingData(): any {
// // // // // // // // // // // // // // //     return {
// // // // // // // // // // // // // // //       "Nb pages visitées": this.pageCount.value,
// // // // // // // // // // // // // // //       "Informations sur les pages visitées": this.pageVisits
// // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getPageCountObservable() {
// // // // // // // // // // // // // // //     return this.pageCount.asObservable();
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }


// // // // // // // // // // // // // // // import { Injectable } from '@angular/core';
// // // // // // // // // // // // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // // // // // // // // // // // import { BehaviorSubject } from 'rxjs';

// // // // // // // // // // // // // // // interface PageVisit {
// // // // // // // // // // // // // // //   url: string;
// // // // // // // // // // // // // // //   time: number;
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // @Injectable({
// // // // // // // // // // // // // // //   providedIn: 'root'
// // // // // // // // // // // // // // // })
// // // // // // // // // // // // // // // export class TrackingService {
// // // // // // // // // // // // // // //   private pageStartTime: number = 0;
// // // // // // // // // // // // // // //   private pageVisits: PageVisit[] = [];
// // // // // // // // // // // // // // //   private pageCount: BehaviorSubject<number>;

// // // // // // // // // // // // // // //   constructor(private router: Router) {
// // // // // // // // // // // // // // //     this.loadTrackingData();

// // // // // // // // // // // // // // //     this.router.events.subscribe(event => {
// // // // // // // // // // // // // // //       if (event instanceof NavigationEnd) {
// // // // // // // // // // // // // // //         this.trackPageTime();
// // // // // // // // // // // // // // //         this.incrementPageCount(event.urlAfterRedirects);
// // // // // // // // // // // // // // //         this.showTrackingData();  // ✅ Appel après chaque changement de page
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   private loadTrackingData() {
// // // // // // // // // // // // // // //     const storedPageVisits = sessionStorage.getItem('pageVisits');
// // // // // // // // // // // // // // //     if (storedPageVisits) {
// // // // // // // // // // // // // // //       this.pageVisits = JSON.parse(storedPageVisits);
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     const storedPageCount = Number(sessionStorage.getItem('pageCount')) || 0;
// // // // // // // // // // // // // // //     this.pageCount = new BehaviorSubject<number>(storedPageCount);
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   startTracking() {
// // // // // // // // // // // // // // //     if (!sessionStorage.getItem('loginTime')) {
// // // // // // // // // // // // // // //       sessionStorage.setItem('loginTime', Date.now().toString());
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getLoginDuration(): number {
// // // // // // // // // // // // // // //     return Date.now() - Number(sessionStorage.getItem('loginTime'));
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getTotalTimeSpent(): number {
// // // // // // // // // // // // // // //     return this.pageVisits.reduce((total, visit) => total + visit.time, 0);
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getCurrentPageTime(): number {
// // // // // // // // // // // // // // //     return Date.now() - Number(sessionStorage.getItem('pageStartTime'));
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   trackPageTime() {
// // // // // // // // // // // // // // //     if (this.pageVisits.length > 0) {
// // // // // // // // // // // // // // //       const lastPageVisit = this.pageVisits[this.pageVisits.length - 1];
// // // // // // // // // // // // // // //       lastPageVisit.time = Math.floor(this.getCurrentPageTime() / 1000);
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));

// // // // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   incrementPageCount(url: string) {
// // // // // // // // // // // // // // //     const newCount = this.pageCount.value + 1;
// // // // // // // // // // // // // // //     this.pageCount.next(newCount);
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageCount', newCount.toString());

// // // // // // // // // // // // // // //     const formattedUrl = url.startsWith('/') ? url : '/' + url;

// // // // // // // // // // // // // // //     this.pageVisits.push({ url: formattedUrl, time: 0 });
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getTrackingData(): any {
// // // // // // // // // // // // // // //     return {
// // // // // // // // // // // // // // //       "Nb pages visitées": this.pageCount.value,
// // // // // // // // // // // // // // //       "Informations sur les pages visitées": this.pageVisits.map((visit, index) => ({
// // // // // // // // // // // // // // //         [`url n°${index + 1}`]: visit.url,
// // // // // // // // // // // // // // //         "time": visit.time
// // // // // // // // // // // // // // //       }))
// // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getPageCountObservable() {
// // // // // // // // // // // // // // //     return this.pageCount.asObservable();
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   showTrackingData() {
// // // // // // // // // // // // // // //     console.log("📊 Données de suivi :", JSON.stringify(this.getTrackingData(), null, 2));
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // import { Injectable } from '@angular/core';
// // // // // // // // // // // // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // // // // // // // // // // // import { BehaviorSubject } from 'rxjs';
// // // // // // // // // // // // // // // import { IpService } from './ip.service';

// // // // // // // // // // // // // // // interface PageVisit {
// // // // // // // // // // // // // // //   url: string;
// // // // // // // // // // // // // // //   time: number;
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // @Injectable({
// // // // // // // // // // // // // // //   providedIn: 'root'
// // // // // // // // // // // // // // // })
// // // // // // // // // // // // // // // export class TrackingService {
// // // // // // // // // // // // // // //   private pageStartTime: number = 0;
// // // // // // // // // // // // // // //   private pageVisits: PageVisit[] = [];
// // // // // // // // // // // // // // //   private pageCount: BehaviorSubject<number>;
// // // // // // // // // // // // // // //   private userIp: string = '';

// // // // // // // // // // // // // // //   constructor(private router: Router, private ipService: IpService) {
// // // // // // // // // // // // // // //     this.loadTrackingData();

// // // // // // // // // // // // // // //     this.ipService.getIp().subscribe((data: any) => {
// // // // // // // // // // // // // // //       this.userIp = data.ip;
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     this.router.events.subscribe(event => {
// // // // // // // // // // // // // // //       if (event instanceof NavigationEnd) {
// // // // // // // // // // // // // // //         this.trackPageTime();
// // // // // // // // // // // // // // //         this.incrementPageCount(event.urlAfterRedirects);
// // // // // // // // // // // // // // //         this.showTrackingData();
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   private loadTrackingData() {
// // // // // // // // // // // // // // //     const storedPageVisits = sessionStorage.getItem('pageVisits');
// // // // // // // // // // // // // // //     if (storedPageVisits) {
// // // // // // // // // // // // // // //       this.pageVisits = JSON.parse(storedPageVisits);
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     const storedPageCount = Number(sessionStorage.getItem('pageCount')) || 0;
// // // // // // // // // // // // // // //     this.pageCount = new BehaviorSubject<number>(storedPageCount);
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   startTracking() {
// // // // // // // // // // // // // // //     if (!sessionStorage.getItem('loginTime')) {
// // // // // // // // // // // // // // //       sessionStorage.setItem('loginTime', Date.now().toString());
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getLoginDuration(): number {
// // // // // // // // // // // // // // //     return Date.now() - Number(sessionStorage.getItem('loginTime'));
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getTotalTimeSpent(): number {
// // // // // // // // // // // // // // //     return this.pageVisits.reduce((total, visit) => total + visit.time, 0);
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getCurrentPageTime(): number {
// // // // // // // // // // // // // // //     return Math.floor((Date.now() - Number(sessionStorage.getItem('pageStartTime'))) / 1000);
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   trackPageTime() {
// // // // // // // // // // // // // // //     if (this.pageVisits.length > 0) {
// // // // // // // // // // // // // // //       this.pageVisits[this.pageVisits.length - 1].time = this.getCurrentPageTime();
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));

// // // // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   incrementPageCount(url: string) {
// // // // // // // // // // // // // // //     const newCount = this.pageCount.value + 1;
// // // // // // // // // // // // // // //     this.pageCount.next(newCount);
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageCount', newCount.toString());

// // // // // // // // // // // // // // //     const formattedUrl = url.startsWith('/') ? url : '/' + url;

// // // // // // // // // // // // // // //     this.pageVisits.push({ url: formattedUrl, time: 0 });
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getTrackingData(): any {
// // // // // // // // // // // // // // //     return {
// // // // // // // // // // // // // // //       "Adresse IP": this.userIp,
// // // // // // // // // // // // // // //       "Nb pages visitées": this.pageCount.value,
// // // // // // // // // // // // // // //       "Informations sur les pages visitées": this.pageVisits.map((visit, index) => ({
// // // // // // // // // // // // // // //         [`url n°${index + 1}`]: visit.url,
// // // // // // // // // // // // // // //         "time": visit.time
// // // // // // // // // // // // // // //       }))
// // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getPageCountObservable() {
// // // // // // // // // // // // // // //     return this.pageCount.asObservable();
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   showTrackingData() {
// // // // // // // // // // // // // // //     console.log("📊 Données de suivi :", JSON.stringify(this.getTrackingData(), null, 2));
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }


// // // // // // // // // // // // // // // import { Injectable } from '@angular/core';
// // // // // // // // // // // // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // // // // // // // // // // // import { BehaviorSubject } from 'rxjs';
// // // // // // // // // // // // // // // import { IpService } from './ip.service';

// // // // // // // // // // // // // // // interface PageVisit {
// // // // // // // // // // // // // // //   url: string;
// // // // // // // // // // // // // // //   time: number;
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // @Injectable({
// // // // // // // // // // // // // // //   providedIn: 'root'
// // // // // // // // // // // // // // // })
// // // // // // // // // // // // // // // export class TrackingService {
// // // // // // // // // // // // // // //   private pageStartTime: number = 0;
// // // // // // // // // // // // // // //   private pageVisits: PageVisit[] = [];
// // // // // // // // // // // // // // //   private pageCount: BehaviorSubject<number>;
// // // // // // // // // // // // // // //   private userIp: string = '';

// // // // // // // // // // // // // // //   constructor(private router: Router, private ipService: IpService) {
// // // // // // // // // // // // // // //     this.loadTrackingData();

// // // // // // // // // // // // // // //     this.ipService.getIp().subscribe(ip => {
// // // // // // // // // // // // // // //       this.userIp = ip;
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     this.router.events.subscribe(event => {
// // // // // // // // // // // // // // //       if (event instanceof NavigationEnd) {
// // // // // // // // // // // // // // //         this.trackPageTime();
// // // // // // // // // // // // // // //         this.incrementPageCount(event.urlAfterRedirects);
// // // // // // // // // // // // // // //         this.showTrackingData();
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   private loadTrackingData() {
// // // // // // // // // // // // // // //     const storedPageVisits = sessionStorage.getItem('pageVisits');
// // // // // // // // // // // // // // //     if (storedPageVisits) {
// // // // // // // // // // // // // // //       this.pageVisits = JSON.parse(storedPageVisits);
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     const storedPageCount = Number(sessionStorage.getItem('pageCount')) || 0;
// // // // // // // // // // // // // // //     this.pageCount = new BehaviorSubject<number>(storedPageCount);
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   startTracking() {
// // // // // // // // // // // // // // //     if (!sessionStorage.getItem('loginTime')) {
// // // // // // // // // // // // // // //       sessionStorage.setItem('loginTime', Date.now().toString());
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getLoginDuration(): number {
// // // // // // // // // // // // // // //     return Math.floor((Date.now() - Number(sessionStorage.getItem('loginTime'))) / 1000);
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getTotalTimeSpent(): number {
// // // // // // // // // // // // // // //     return this.pageVisits.reduce((total, visit) => total + visit.time, 0);
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getCurrentPageTime(): number {
// // // // // // // // // // // // // // //     return Math.floor((Date.now() - Number(sessionStorage.getItem('pageStartTime'))) / 1000);
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   trackPageTime() {
// // // // // // // // // // // // // // //     if (this.pageVisits.length > 0) {
// // // // // // // // // // // // // // //       this.pageVisits[this.pageVisits.length - 1].time = this.getCurrentPageTime();
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));

// // // // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   incrementPageCount(url: string) {
// // // // // // // // // // // // // // //     const newCount = this.pageCount.value + 1;
// // // // // // // // // // // // // // //     this.pageCount.next(newCount);
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageCount', newCount.toString());

// // // // // // // // // // // // // // //     const formattedUrl = url.startsWith('/') ? url : '/' + url;

// // // // // // // // // // // // // // //     this.pageVisits.push({ url: formattedUrl, time: 0 });
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getTrackingData(): any {
// // // // // // // // // // // // // // //     return {
// // // // // // // // // // // // // // //       "Adresse IP": this.userIp,
// // // // // // // // // // // // // // //       "Nb pages visitées": this.pageCount.value,
// // // // // // // // // // // // // // //       "Informations sur les pages visitées": this.pageVisits.map((visit, index) => ({
// // // // // // // // // // // // // // //         [`url n°${index + 1}`]: visit.url,
// // // // // // // // // // // // // // //         "time": visit.time
// // // // // // // // // // // // // // //       }))
// // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getPageCountObservable() {
// // // // // // // // // // // // // // //     return this.pageCount.asObservable();
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   showTrackingData() {
// // // // // // // // // // // // // // //     console.log("📊 Données de suivi :", JSON.stringify(this.getTrackingData(), null, 2));
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // import { Injectable } from '@angular/core';
// // // // // // // // // // // // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // // // // // // // // // // // import { BehaviorSubject } from 'rxjs';
// // // // // // // // // // // // // // // import { IpService } from './ip.service';

// // // // // // // // // // // // // // // interface PageVisit {
// // // // // // // // // // // // // // //   url: string;
// // // // // // // // // // // // // // //   time: number;
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // @Injectable({
// // // // // // // // // // // // // // //   providedIn: 'root'
// // // // // // // // // // // // // // // })
// // // // // // // // // // // // // // // export class TrackingService {
// // // // // // // // // // // // // // //   private pageStartTime: number = 0;
// // // // // // // // // // // // // // //   private pageVisits: PageVisit[] = [];
// // // // // // // // // // // // // // //   private pageCount: BehaviorSubject<number>;
// // // // // // // // // // // // // // //   private userIp: string = '';

// // // // // // // // // // // // // // //   constructor(private router: Router, private ipService: IpService) {
// // // // // // // // // // // // // // //     this.loadTrackingData();

// // // // // // // // // // // // // // //     this.ipService.getIp().subscribe(ip => {
// // // // // // // // // // // // // // //       this.userIp = ip;
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     this.router.events.subscribe(event => {
// // // // // // // // // // // // // // //       if (event instanceof NavigationEnd) {
// // // // // // // // // // // // // // //         this.trackPageTime();
// // // // // // // // // // // // // // //         this.incrementPageCount(event.urlAfterRedirects);
// // // // // // // // // // // // // // //         this.showTrackingData();
// // // // // // // // // // // // // // //       }
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     this.startTracking();
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   private loadTrackingData() {
// // // // // // // // // // // // // // //     const storedPageVisits = sessionStorage.getItem('pageVisits');
// // // // // // // // // // // // // // //     if (storedPageVisits) {
// // // // // // // // // // // // // // //       this.pageVisits = JSON.parse(storedPageVisits);
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     const storedPageCount = Number(sessionStorage.getItem('pageCount')) || 0;
// // // // // // // // // // // // // // //     this.pageCount = new BehaviorSubject<number>(storedPageCount);
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   startTracking() {
// // // // // // // // // // // // // // //     if (!sessionStorage.getItem('loginTime')) {
// // // // // // // // // // // // // // //       sessionStorage.setItem('loginTime', Date.now().toString());
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());

// // // // // // // // // // // // // // //     if (this.pageVisits.length === 0) {
// // // // // // // // // // // // // // //       this.pageVisits.push({ url: '/', time: 0 });
// // // // // // // // // // // // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getLoginDuration(): number {
// // // // // // // // // // // // // // //     return Math.floor((Date.now() - Number(sessionStorage.getItem('loginTime'))) / 1000);
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getTotalTimeSpent(): number {
// // // // // // // // // // // // // // //     return this.pageVisits.reduce((total, visit) => total + visit.time, 0);
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getCurrentPageTime(): number {
// // // // // // // // // // // // // // //     return Math.floor((Date.now() - this.pageStartTime) / 1000);
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   trackPageTime() {
// // // // // // // // // // // // // // //     if (this.pageVisits.length > 0) {
// // // // // // // // // // // // // // //       const lastVisit = this.pageVisits[this.pageVisits.length - 1];
// // // // // // // // // // // // // // //       lastVisit.time = this.getCurrentPageTime();
// // // // // // // // // // // // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   incrementPageCount(url: string) {
// // // // // // // // // // // // // // //     const newCount = this.pageCount.value + 1;
// // // // // // // // // // // // // // //     this.pageCount.next(newCount);
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageCount', newCount.toString());

// // // // // // // // // // // // // // //     const formattedUrl = url.startsWith('/') ? url : '/' + url;

// // // // // // // // // // // // // // //     this.pageVisits.push({ url: formattedUrl, time: 0 });
// // // // // // // // // // // // // // //     sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getTrackingData(): any {
// // // // // // // // // // // // // // //     return {
// // // // // // // // // // // // // // //       "Adresse IP": this.userIp,
// // // // // // // // // // // // // // //       "Nb pages visitées": this.pageCount.value,
// // // // // // // // // // // // // // //       "Informations sur les pages visitées": this.pageVisits.map((visit, index) => ({
// // // // // // // // // // // // // // //         [`url n°${index + 1}`]: visit.url,
// // // // // // // // // // // // // // //         "time": visit.time
// // // // // // // // // // // // // // //       }))
// // // // // // // // // // // // // // //     };
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   getPageCountObservable() {
// // // // // // // // // // // // // // //     return this.pageCount.asObservable();
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   showTrackingData() {
// // // // // // // // // // // // // // //     console.log("📊 Données de suivi :", JSON.stringify(this.getTrackingData(), null, 2));
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // import { Injectable } from '@angular/core';
// // // // // // // // // // // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // // // // // // // // // // import { BehaviorSubject } from 'rxjs';
// // // // // // // // // // // // // // import { IpService } from './ip.service';

// // // // // // // // // // // // // // interface PageVisit {
// // // // // // // // // // // // // //   url: string;
// // // // // // // // // // // // // //   time: number;
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // @Injectable({
// // // // // // // // // // // // // //   providedIn: 'root'
// // // // // // // // // // // // // // })
// // // // // // // // // // // // // // export class TrackingService {
// // // // // // // // // // // // // //   private pageStartTime: number = 0;
// // // // // // // // // // // // // //   private pageVisits: PageVisit[] = [];
// // // // // // // // // // // // // //   private pageCount: BehaviorSubject<number>;
// // // // // // // // // // // // // //   private userIp: string = '';

// // // // // // // // // // // // // //   constructor(private router: Router, private ipService: IpService) {
// // // // // // // // // // // // // //     this.loadTrackingData();

// // // // // // // // // // // // // //     this.ipService.getIp().subscribe(ip => {
// // // // // // // // // // // // // //       this.userIp = ip;
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     this.router.events.subscribe(event => {
// // // // // // // // // // // // // //       if (event instanceof NavigationEnd) {
// // // // // // // // // // // // // //         this.trackPageTime();
// // // // // // // // // // // // // //         this.incrementPageCount(event.urlAfterRedirects);
// // // // // // // // // // // // // //         this.showTrackingData();
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     this.startTracking();
// // // // // // // // // // // // // //   }

// // // // // // // // // // // // // //   private loadTrackingData() {
// // // // // // // // // // // // // //     const storedPageVisits = sessionStorage.getItem('pageVisits');
// // // // // // // // // // // // // //     if (storedPageVisits) {
// // // // // // // // // // // // // //       this.pageVisits = JSON.parse(storedPageVisits);
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     const storedPageCount = Number(sessionStorage.getItem('pageCount')) || 0;
// // // // // // // // // // // // // //     this.pageCount = new BehaviorSubject<number>(storedPageCount);
// // // // // // // // // // // // // //   }

// // // // // // // // // // // // // //   startTracking() {
// // // // // // // // // // // // // //     if (!sessionStorage.getItem('loginTime')) {
// // // // // // // // // // // // // //       sessionStorage.setItem('loginTime', Date.now().toString());
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());

// // // // // // // // // // // // // //     if (this.pageVisits.length === 0) {
// // // // // // // // // // // // // //       this.pageVisits.push({ url: '/', time: 0 });
// // // // // // // // // // // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   }

// // // // // // // // // // // // // //   getLoginDuration(): number {
// // // // // // // // // // // // // //     return Math.floor((Date.now() - Number(sessionStorage.getItem('loginTime'))) / 1000);
// // // // // // // // // // // // // //   }

// // // // // // // // // // // // // //   getTotalTimeSpent(): number {
// // // // // // // // // // // // // //     return this.pageVisits.reduce((total, visit) => total + visit.time, 0);
// // // // // // // // // // // // // //   }

// // // // // // // // // // // // // //   getCurrentPageTime(): number {
// // // // // // // // // // // // // //     return Math.floor((Date.now() - this.pageStartTime) / 1000);
// // // // // // // // // // // // // //   }

// // // // // // // // // // // // // //   trackPageTime() {
// // // // // // // // // // // // // //     if (this.pageVisits.length > 0) {
// // // // // // // // // // // // // //       const lastVisit = this.pageVisits[this.pageVisits.length - 1];
// // // // // // // // // // // // // //       lastVisit.time = this.getCurrentPageTime();
// // // // // // // // // // // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // // // // //   }

// // // // // // // // // // // // // //   incrementPageCount(url: string) {
// // // // // // // // // // // // // //     const newCount = this.pageCount.value + 1;
// // // // // // // // // // // // // //     this.pageCount.next(newCount);
// // // // // // // // // // // // // //     sessionStorage.setItem('pageCount', newCount.toString());

// // // // // // // // // // // // // //     const formattedUrl = url.startsWith('/') ? url : '/' + url;

// // // // // // // // // // // // // //     this.pageVisits.push({ url: formattedUrl, time: 0 });
// // // // // // // // // // // // // //     sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // // // // //   }

// // // // // // // // // // // // // //   getTrackingData(): any {
// // // // // // // // // // // // // //     return {
// // // // // // // // // // // // // //       "Adresse IP": this.userIp,
// // // // // // // // // // // // // //       "Nb pages visitées": this.pageCount.value,
// // // // // // // // // // // // // //       "Informations sur les pages visitées": this.pageVisits.map((visit, index) => ({
// // // // // // // // // // // // // //         [`url n°${index + 1}`]: visit.url,
// // // // // // // // // // // // // //         "time": visit.time
// // // // // // // // // // // // // //       }))
// // // // // // // // // // // // // //     };
// // // // // // // // // // // // // //   }

// // // // // // // // // // // // // //   getPageCountObservable() {
// // // // // // // // // // // // // //     return this.pageCount.asObservable();
// // // // // // // // // // // // // //   }

// // // // // // // // // // // // // //   showTrackingData() {
// // // // // // // // // // // // // //     console.log("📊 Données de suivi :", JSON.stringify(this.getTrackingData(), null, 2));
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // }


// // // // // // // // // // // // // import { Injectable } from '@angular/core';
// // // // // // // // // // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // // // // // // // // // import { BehaviorSubject } from 'rxjs';
// // // // // // // // // // // // // import { IpService } from './ip.service';

// // // // // // // // // // // // // interface PageVisit {
// // // // // // // // // // // // //   url: string;
// // // // // // // // // // // // //   time: number;
// // // // // // // // // // // // // }

// // // // // // // // // // // // // @Injectable({
// // // // // // // // // // // // //   providedIn: 'root'
// // // // // // // // // // // // // })
// // // // // // // // // // // // // export class TrackingService {
// // // // // // // // // // // // //   private pageStartTime: number = 0;
// // // // // // // // // // // // //   private pageVisits: PageVisit[] = [];
// // // // // // // // // // // // //   private pageCount: BehaviorSubject<number>;
// // // // // // // // // // // // //   private userIp: string = '';

// // // // // // // // // // // // //   constructor(private router: Router, private ipService: IpService) {
// // // // // // // // // // // // //     this.loadTrackingData();

// // // // // // // // // // // // //     this.ipService.getIp().subscribe(ip => {
// // // // // // // // // // // // //       this.userIp = ip;
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     this.router.events.subscribe(event => {
// // // // // // // // // // // // //       if (event instanceof NavigationEnd) {
// // // // // // // // // // // // //         this.trackPageTime();  // ✅ Mettre à jour le temps avant d'ajouter la nouvelle page
// // // // // // // // // // // // //         this.incrementPageCount(event.urlAfterRedirects);
// // // // // // // // // // // // //         this.showTrackingData();
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     this.startTracking();
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   private loadTrackingData() {
// // // // // // // // // // // // //     const storedPageVisits = sessionStorage.getItem('pageVisits');
// // // // // // // // // // // // //     if (storedPageVisits) {
// // // // // // // // // // // // //       this.pageVisits = JSON.parse(storedPageVisits);
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     const storedPageCount = Number(sessionStorage.getItem('pageCount')) || 0;
// // // // // // // // // // // // //     this.pageCount = new BehaviorSubject<number>(storedPageCount);
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   startTracking() {
// // // // // // // // // // // // //     if (!sessionStorage.getItem('loginTime')) {
// // // // // // // // // // // // //       sessionStorage.setItem('loginTime', Date.now().toString());
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());

// // // // // // // // // // // // //     if (this.pageVisits.length === 0) {
// // // // // // // // // // // // //       this.pageVisits.push({ url: '/', time: 0 });
// // // // // // // // // // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   getLoginDuration(): number {
// // // // // // // // // // // // //     return Math.floor((Date.now() - Number(sessionStorage.getItem('loginTime'))) / 1000);
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   getTotalTimeSpent(): number {
// // // // // // // // // // // // //     return this.pageVisits.reduce((total, visit) => total + visit.time, 0);
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   getCurrentPageTime(): number {
// // // // // // // // // // // // //     return Math.floor((Date.now() - this.pageStartTime) / 1000);
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   trackPageTime() {
// // // // // // // // // // // // //     if (this.pageVisits.length > 0) {
// // // // // // // // // // // // //       const lastVisit = this.pageVisits[this.pageVisits.length - 1];
// // // // // // // // // // // // //       lastVisit.time = this.getCurrentPageTime();  // ✅ Mise à jour correcte du temps
// // // // // // // // // // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   incrementPageCount(url: string) {
// // // // // // // // // // // // //     const newCount = this.pageCount.value + 1;
// // // // // // // // // // // // //     this.pageCount.next(newCount);
// // // // // // // // // // // // //     sessionStorage.setItem('pageCount', newCount.toString());

// // // // // // // // // // // // //     const formattedUrl = url.startsWith('/') ? url : '/' + url;

// // // // // // // // // // // // //     // ✅ Vérifier si la nouvelle URL est identique à la dernière avant de l'ajouter
// // // // // // // // // // // // //     if (this.pageVisits.length > 0 && this.pageVisits[this.pageVisits.length - 1].url === formattedUrl) {
// // // // // // // // // // // // //       return;
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     this.pageVisits.push({ url: formattedUrl, time: 0 });
// // // // // // // // // // // // //     sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   getTrackingData(): any {
// // // // // // // // // // // // //     return {
// // // // // // // // // // // // //       "Adresse IP": this.userIp,
// // // // // // // // // // // // //       "Nb pages visitées": this.pageCount.value,
// // // // // // // // // // // // //       "Informations sur les pages visitées": this.pageVisits.map((visit, index) => ({
// // // // // // // // // // // // //         [`url n°${index + 1}`]: visit.url,
// // // // // // // // // // // // //         "time": visit.time
// // // // // // // // // // // // //       }))
// // // // // // // // // // // // //     };
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   getPageCountObservable() {
// // // // // // // // // // // // //     return this.pageCount.asObservable();
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   showTrackingData() {
// // // // // // // // // // // // //     console.log("📊 Données de suivi :", JSON.stringify(this.getTrackingData(), null, 2));
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // }

// // // // // // // // // // // // import { Injectable } from '@angular/core';
// // // // // // // // // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // // // // // // // // import { BehaviorSubject } from 'rxjs';
// // // // // // // // // // // // import { IpService } from './ip.service';

// // // // // // // // // // // // interface PageVisit {
// // // // // // // // // // // //   url: string;
// // // // // // // // // // // //   time: number;
// // // // // // // // // // // // }

// // // // // // // // // // // // @Injectable({
// // // // // // // // // // // //   providedIn: 'root'
// // // // // // // // // // // // })
// // // // // // // // // // // // export class TrackingService {
// // // // // // // // // // // //   private pageStartTime: number = 0;
// // // // // // // // // // // //   private pageVisits: PageVisit[] = [];
// // // // // // // // // // // //   private pageCount: BehaviorSubject<number>;
// // // // // // // // // // // //   private userIp: string = '';

// // // // // // // // // // // //   constructor(private router: Router, private ipService: IpService) {
// // // // // // // // // // // //     this.loadTrackingData();

// // // // // // // // // // // //     this.ipService.getIp().subscribe(ip => {
// // // // // // // // // // // //       this.userIp = ip;
// // // // // // // // // // // //     });

// // // // // // // // // // // //     this.router.events.subscribe(event => {
// // // // // // // // // // // //       if (event instanceof NavigationEnd) {
// // // // // // // // // // // //         this.trackPageTime(); // ✅ Appel du calcul du temps avant d’ajouter la nouvelle page
// // // // // // // // // // // //         this.incrementPageCount(event.urlAfterRedirects);
// // // // // // // // // // // //         this.showTrackingData(); // Affiche les données après chaque changement de page
// // // // // // // // // // // //       }
// // // // // // // // // // // //     });

// // // // // // // // // // // //     this.startTracking(); // Démarre le suivi de la première page
// // // // // // // // // // // //   }

// // // // // // // // // // // //   private loadTrackingData() {
// // // // // // // // // // // //     const storedPageVisits = sessionStorage.getItem('pageVisits');
// // // // // // // // // // // //     if (storedPageVisits) {
// // // // // // // // // // // //       this.pageVisits = JSON.parse(storedPageVisits);
// // // // // // // // // // // //     }

// // // // // // // // // // // //     const storedPageCount = Number(sessionStorage.getItem('pageCount')) || 0;
// // // // // // // // // // // //     this.pageCount = new BehaviorSubject<number>(storedPageCount);
// // // // // // // // // // // //   }

// // // // // // // // // // // //   startTracking() {
// // // // // // // // // // // //     if (!sessionStorage.getItem('loginTime')) {
// // // // // // // // // // // //       sessionStorage.setItem('loginTime', Date.now().toString());
// // // // // // // // // // // //     }

// // // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());

// // // // // // // // // // // //     if (this.pageVisits.length === 0) {
// // // // // // // // // // // //       this.pageVisits.push({ url: '/', time: 0 });
// // // // // // // // // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }

// // // // // // // // // // // //   getLoginDuration(): number {
// // // // // // // // // // // //     return Math.floor((Date.now() - Number(sessionStorage.getItem('loginTime'))) / 1000);
// // // // // // // // // // // //   }

// // // // // // // // // // // //   getTotalTimeSpent(): number {
// // // // // // // // // // // //     return this.pageVisits.reduce((total, visit) => total + visit.time, 0);
// // // // // // // // // // // //   }

// // // // // // // // // // // //   getCurrentPageTime(): number {
// // // // // // // // // // // //     return Math.floor((Date.now() - this.pageStartTime) / 1000); // ✅ Vérification du temps actuel
// // // // // // // // // // // //   }

// // // // // // // // // // // //   trackPageTime() {
// // // // // // // // // // // //     console.log("trackPageTime called");
// // // // // // // // // // // //     if (this.pageVisits.length > 0) {
// // // // // // // // // // // //       const lastVisit = this.pageVisits[this.pageVisits.length - 1];
// // // // // // // // // // // //       lastVisit.time = this.getCurrentPageTime();  // ✅ Mise à jour correcte du temps
// // // // // // // // // // // //       console.log(`Time spent on ${lastVisit.url}: ${lastVisit.time} seconds`);
// // // // // // // // // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // // //     }

// // // // // // // // // // // //     this.pageStartTime = Date.now(); // Réinitialisation du temps de départ pour la nouvelle page
// // // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // // //   }

// // // // // // // // // // // //   incrementPageCount(url: string) {
// // // // // // // // // // // //     const newCount = this.pageCount.value + 1;
// // // // // // // // // // // //     this.pageCount.next(newCount);
// // // // // // // // // // // //     sessionStorage.setItem('pageCount', newCount.toString());

// // // // // // // // // // // //     const formattedUrl = url.startsWith('/') ? url : '/' + url;

// // // // // // // // // // // //     // Vérifier si la nouvelle URL est identique à la dernière avant de l’ajouter
// // // // // // // // // // // //     if (this.pageVisits.length > 0 && this.pageVisits[this.pageVisits.length - 1].url === formattedUrl) {
// // // // // // // // // // // //       console.log("Duplicate URL detected, not adding");
// // // // // // // // // // // //       return;
// // // // // // // // // // // //     }

// // // // // // // // // // // //     console.log(`New page visit: ${formattedUrl}`);
// // // // // // // // // // // //     this.pageVisits.push({ url: formattedUrl, time: 0 });
// // // // // // // // // // // //     sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // // //   }

// // // // // // // // // // // //   getTrackingData(): any {
// // // // // // // // // // // //     return {
// // // // // // // // // // // //       "Adresse IP": this.userIp,
// // // // // // // // // // // //       "Nb pages visitées": this.pageCount.value,
// // // // // // // // // // // //       "Informations sur les pages visitées": this.pageVisits.map((visit, index) => ({
// // // // // // // // // // // //         [`url n°${index + 1}`]: visit.url,
// // // // // // // // // // // //         "time": visit.time
// // // // // // // // // // // //       }))
// // // // // // // // // // // //     };
// // // // // // // // // // // //   }

// // // // // // // // // // // //   getPageCountObservable() {
// // // // // // // // // // // //     return this.pageCount.asObservable();
// // // // // // // // // // // //   }

// // // // // // // // // // // //   showTrackingData() {
// // // // // // // // // // // //     console.log("📊 Données de suivi :", JSON.stringify(this.getTrackingData(), null, 2));
// // // // // // // // // // // //   }
// // // // // // // // // // // // }

// // // // // // // // // // // import { Injectable } from '@angular/core';
// // // // // // // // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // // // // // // // import { BehaviorSubject } from 'rxjs';
// // // // // // // // // // // import { IpService } from './ip.service';

// // // // // // // // // // // interface PageVisit {
// // // // // // // // // // //   url: string;
// // // // // // // // // // //   time: number;
// // // // // // // // // // // }

// // // // // // // // // // // @Injectable({
// // // // // // // // // // //   providedIn: 'root'
// // // // // // // // // // // })
// // // // // // // // // // // export class TrackingService {
// // // // // // // // // // //   private pageStartTime: number = 0;
// // // // // // // // // // //   private pageVisits: PageVisit[] = [];
// // // // // // // // // // //   private pageCount: BehaviorSubject<number>;
// // // // // // // // // // //   private userIp: string = '';

// // // // // // // // // // //   constructor(private router: Router, private ipService: IpService) {
// // // // // // // // // // //     this.loadTrackingData();

// // // // // // // // // // //     this.ipService.getIp().subscribe(ip => {
// // // // // // // // // // //       this.userIp = ip;
// // // // // // // // // // //     });

// // // // // // // // // // //     // Capturer le changement de route et déclencher le suivi
// // // // // // // // // // //     this.router.events.subscribe(event => {
// // // // // // // // // // //       if (event instanceof NavigationEnd) {
// // // // // // // // // // //         this.trackPageTime();
// // // // // // // // // // //         this.incrementPageCount(event.urlAfterRedirects);
// // // // // // // // // // //         this.showTrackingData();
// // // // // // // // // // //       }
// // // // // // // // // // //     });

// // // // // // // // // // //     // Lancement du suivi dès le début
// // // // // // // // // // //     this.startTracking(); 
// // // // // // // // // // //   }

// // // // // // // // // // //   private loadTrackingData() {
// // // // // // // // // // //     const storedPageVisits = sessionStorage.getItem('pageVisits');
// // // // // // // // // // //     if (storedPageVisits) {
// // // // // // // // // // //       this.pageVisits = JSON.parse(storedPageVisits);
// // // // // // // // // // //     }

// // // // // // // // // // //     const storedPageCount = Number(sessionStorage.getItem('pageCount')) || 0;
// // // // // // // // // // //     this.pageCount = new BehaviorSubject<number>(storedPageCount);
// // // // // // // // // // //   }

// // // // // // // // // // //   startTracking() {
// // // // // // // // // // //     if (!sessionStorage.getItem('loginTime')) {
// // // // // // // // // // //       sessionStorage.setItem('loginTime', Date.now().toString());
// // // // // // // // // // //     }

// // // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());

// // // // // // // // // // //     if (this.pageVisits.length === 0) {
// // // // // // // // // // //       this.pageVisits.push({ url: '/', time: 0 });
// // // // // // // // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // //     }
// // // // // // // // // // //   }

// // // // // // // // // // //   getLoginDuration(): number {
// // // // // // // // // // //     return Math.floor((Date.now() - Number(sessionStorage.getItem('loginTime'))) / 1000);
// // // // // // // // // // //   }

// // // // // // // // // // //   getTotalTimeSpent(): number {
// // // // // // // // // // //     return this.pageVisits.reduce((total, visit) => total + visit.time, 0);
// // // // // // // // // // //   }

// // // // // // // // // // //   getCurrentPageTime(): number {
// // // // // // // // // // //     return Math.floor((Date.now() - this.pageStartTime) / 1000);
// // // // // // // // // // //   }

// // // // // // // // // // //   trackPageTime() {
// // // // // // // // // // //     console.log("trackPageTime called");

// // // // // // // // // // //     // Si une page a déjà été visitée, calculer son temps
// // // // // // // // // // //     if (this.pageVisits.length > 0) {
// // // // // // // // // // //       const lastVisit = this.pageVisits[this.pageVisits.length - 1];
// // // // // // // // // // //       lastVisit.time = this.getCurrentPageTime();  // Calculer et mettre à jour le temps passé sur la page courante
// // // // // // // // // // //       console.log(`Time spent on ${lastVisit.url}: ${lastVisit.time} seconds`);
// // // // // // // // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // //     }

// // // // // // // // // // //     this.pageStartTime = Date.now(); // Réinitialiser le temps de départ pour la nouvelle page
// // // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // // //   }

// // // // // // // // // // //   incrementPageCount(url: string) {
// // // // // // // // // // //     const newCount = this.pageCount.value + 1;
// // // // // // // // // // //     this.pageCount.next(newCount);
// // // // // // // // // // //     sessionStorage.setItem('pageCount', newCount.toString());

// // // // // // // // // // //     const formattedUrl = url.startsWith('/') ? url : '/' + url;

// // // // // // // // // // //     // Vérification si la nouvelle URL est identique à la précédente avant de l’ajouter
// // // // // // // // // // //     if (this.pageVisits.length > 0 && this.pageVisits[this.pageVisits.length - 1].url === formattedUrl) {
// // // // // // // // // // //       console.log("Duplicate URL detected, not adding");
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     console.log(`New page visit: ${formattedUrl}`);
// // // // // // // // // // //     this.pageVisits.push({ url: formattedUrl, time: 0 });
// // // // // // // // // // //     sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // // //   }

// // // // // // // // // // //   getTrackingData(): any {
// // // // // // // // // // //     return {
// // // // // // // // // // //       "Adresse IP": this.userIp,
// // // // // // // // // // //       "Nb pages visitées": this.pageCount.value,
// // // // // // // // // // //       "Informations sur les pages visitées": this.pageVisits.map((visit, index) => ({
// // // // // // // // // // //         [`url n°${index + 1}`]: visit.url,
// // // // // // // // // // //         "time": visit.time
// // // // // // // // // // //       }))
// // // // // // // // // // //     };
// // // // // // // // // // //   }

// // // // // // // // // // //   getPageCountObservable() {
// // // // // // // // // // //     return this.pageCount.asObservable();
// // // // // // // // // // //   }

// // // // // // // // // // //   showTrackingData() {
// // // // // // // // // // //     console.log("📊 Données de suivi :", JSON.stringify(this.getTrackingData(), null, 2));
// // // // // // // // // // //   }
// // // // // // // // // // // }

// // // // // // // // // // import { Injectable } from '@angular/core';
// // // // // // // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // // // // // // import { BehaviorSubject } from 'rxjs';
// // // // // // // // // // import { IpService } from './ip.service';

// // // // // // // // // // interface PageVisit {
// // // // // // // // // //   url: string;
// // // // // // // // // //   time: number;
// // // // // // // // // // }

// // // // // // // // // // @Injectable({
// // // // // // // // // //   providedIn: 'root'
// // // // // // // // // // })
// // // // // // // // // // export class TrackingService {
// // // // // // // // // //   private pageStartTime: number = 0;
// // // // // // // // // //   private pageVisits: PageVisit[] = [];
// // // // // // // // // //   private pageCount: BehaviorSubject<number>;
// // // // // // // // // //   private userIp: string = '';

// // // // // // // // // //   constructor(private router: Router, private ipService: IpService) {
// // // // // // // // // //     this.loadTrackingData();

// // // // // // // // // //     this.ipService.getIp().subscribe(ip => {
// // // // // // // // // //       this.userIp = ip;
// // // // // // // // // //     });

// // // // // // // // // //     // Capturer le changement de route et déclencher le suivi
// // // // // // // // // //     this.router.events.subscribe(event => {
// // // // // // // // // //       if (event instanceof NavigationEnd) {
// // // // // // // // // //         this.trackPageTime();  // Mettre à jour le temps de la page précédente
// // // // // // // // // //         this.incrementPageCount(event.urlAfterRedirects);  // Incrémenter le compteur de pages
// // // // // // // // // //         this.showTrackingData();  // Afficher les données de suivi
// // // // // // // // // //       }
// // // // // // // // // //     });

// // // // // // // // // //     // Lancement du suivi dès le début
// // // // // // // // // //     this.startTracking(); 
// // // // // // // // // //   }

// // // // // // // // // //   private loadTrackingData() {
// // // // // // // // // //     const storedPageVisits = sessionStorage.getItem('pageVisits');
// // // // // // // // // //     if (storedPageVisits) {
// // // // // // // // // //       this.pageVisits = JSON.parse(storedPageVisits);
// // // // // // // // // //     }

// // // // // // // // // //     const storedPageCount = Number(sessionStorage.getItem('pageCount')) || 0;
// // // // // // // // // //     this.pageCount = new BehaviorSubject<number>(storedPageCount);
// // // // // // // // // //   }

// // // // // // // // // //   startTracking() {
// // // // // // // // // //     if (!sessionStorage.getItem('loginTime')) {
// // // // // // // // // //       sessionStorage.setItem('loginTime', Date.now().toString());
// // // // // // // // // //     }

// // // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());

// // // // // // // // // //     if (this.pageVisits.length === 0) {
// // // // // // // // // //       this.pageVisits.push({ url: '/', time: 0 });
// // // // // // // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // //     }
// // // // // // // // // //   }

// // // // // // // // // //   getLoginDuration(): number {
// // // // // // // // // //     return Math.floor((Date.now() - Number(sessionStorage.getItem('loginTime'))) / 1000);
// // // // // // // // // //   }

// // // // // // // // // //   getTotalTimeSpent(): number {
// // // // // // // // // //     return this.pageVisits.reduce((total, visit) => total + visit.time, 0);
// // // // // // // // // //   }

// // // // // // // // // //   getCurrentPageTime(): number {
// // // // // // // // // //     return Math.floor((Date.now() - this.pageStartTime) / 1000);
// // // // // // // // // //   }

// // // // // // // // // //   trackPageTime() {
// // // // // // // // // //     console.log("trackPageTime called");

// // // // // // // // // //     // Si une page a déjà été visitée, calculer son temps
// // // // // // // // // //     if (this.pageVisits.length > 0) {
// // // // // // // // // //       const lastVisit = this.pageVisits[this.pageVisits.length - 1];
// // // // // // // // // //       lastVisit.time = this.getCurrentPageTime();  // Calculer et mettre à jour le temps passé sur la page courante
// // // // // // // // // //       console.log(`Time spent on ${lastVisit.url}: ${lastVisit.time} seconds`);
// // // // // // // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // //     }

// // // // // // // // // //     this.pageStartTime = Date.now(); // Réinitialiser le temps de départ pour la nouvelle page
// // // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // // //   }

// // // // // // // // // //   incrementPageCount(url: string) {
// // // // // // // // // //     const newCount = this.pageCount.value + 1;
// // // // // // // // // //     this.pageCount.next(newCount);
// // // // // // // // // //     sessionStorage.setItem('pageCount', newCount.toString());

// // // // // // // // // //     const formattedUrl = url.startsWith('/') ? url : '/' + url;

// // // // // // // // // //     // Vérification si la nouvelle URL est identique à la précédente avant de l’ajouter
// // // // // // // // // //     if (this.pageVisits.length > 0 && this.pageVisits[this.pageVisits.length - 1].url === formattedUrl) {
// // // // // // // // // //       console.log("Duplicate URL detected, not adding");
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     console.log(`New page visit: ${formattedUrl}`);
// // // // // // // // // //     this.pageVisits.push({ url: formattedUrl, time: 0 });
// // // // // // // // // //     sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // // //   }

// // // // // // // // // //   getTrackingData(): any {
// // // // // // // // // //     return {
// // // // // // // // // //       "Adresse IP": this.userIp,
// // // // // // // // // //       "Nb pages visitées": this.pageCount.value,
// // // // // // // // // //       "Informations sur les pages visitées": this.pageVisits.map((visit, index) => ({
// // // // // // // // // //         [`url n°${index + 1}`]: visit.url,
// // // // // // // // // //         "time": visit.time
// // // // // // // // // //       }))
// // // // // // // // // //     };
// // // // // // // // // //   }

// // // // // // // // // //   getPageCountObservable() {
// // // // // // // // // //     return this.pageCount.asObservable();
// // // // // // // // // //   }

// // // // // // // // // //   showTrackingData() {
// // // // // // // // // //     console.log("📊 Données de suivi :", JSON.stringify(this.getTrackingData(), null, 2));
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // import { Injectable } from '@angular/core';
// // // // // // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // // // // // import { BehaviorSubject } from 'rxjs';
// // // // // // // // // import { IpService } from './ip.service';

// // // // // // // // // interface PageVisit {
// // // // // // // // //   url: string;
// // // // // // // // //   time: number;
// // // // // // // // // }

// // // // // // // // // @Injectable({
// // // // // // // // //   providedIn: 'root'
// // // // // // // // // })
// // // // // // // // // export class TrackingService {
// // // // // // // // //   private pageStartTime: number = 0;
// // // // // // // // //   private pageVisits: PageVisit[] = [];
// // // // // // // // //   private pageCount: BehaviorSubject<number>;
// // // // // // // // //   private userIp: string = '';

// // // // // // // // //   constructor(private router: Router, private ipService: IpService) {
// // // // // // // // //     this.loadTrackingData();

// // // // // // // // //     this.ipService.getIp().subscribe(ip => {
// // // // // // // // //       this.userIp = ip;
// // // // // // // // //       console.log("Adresse IP récupérée : ", this.userIp); // Affiche l'IP récupérée
// // // // // // // // //     });

// // // // // // // // //     // Capturer le changement de route et déclencher le suivi
// // // // // // // // //     this.router.events.subscribe(event => {
// // // // // // // // //       if (event instanceof NavigationEnd) {
// // // // // // // // //         this.trackPageTime();  // Mettre à jour le temps de la page précédente
// // // // // // // // //         this.incrementPageCount(event.urlAfterRedirects);  // Incrémenter le compteur de pages
// // // // // // // // //         this.showTrackingData();  // Afficher les données de suivi
// // // // // // // // //       }
// // // // // // // // //     });

// // // // // // // // //     // Lancement du suivi dès le début
// // // // // // // // //     this.startTracking(); 
// // // // // // // // //   }

// // // // // // // // //   private loadTrackingData() {
// // // // // // // // //     const storedPageVisits = sessionStorage.getItem('pageVisits');
// // // // // // // // //     if (storedPageVisits) {
// // // // // // // // //       this.pageVisits = JSON.parse(storedPageVisits);
// // // // // // // // //     }

// // // // // // // // //     const storedPageCount = Number(sessionStorage.getItem('pageCount')) || 0;
// // // // // // // // //     this.pageCount = new BehaviorSubject<number>(storedPageCount);
// // // // // // // // //   }

// // // // // // // // //   startTracking() {
// // // // // // // // //     if (!sessionStorage.getItem('loginTime')) {
// // // // // // // // //       sessionStorage.setItem('loginTime', Date.now().toString());
// // // // // // // // //     }

// // // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());

// // // // // // // // //     if (this.pageVisits.length === 0) {
// // // // // // // // //       this.pageVisits.push({ url: '/', time: 0 });
// // // // // // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // //     }

// // // // // // // // //     console.log("Suivi démarré. Temps de départ : ", this.pageStartTime); // Affiche le temps de départ
// // // // // // // // //   }

// // // // // // // // //   getLoginDuration(): number {
// // // // // // // // //     return Math.floor((Date.now() - Number(sessionStorage.getItem('loginTime'))) / 1000);
// // // // // // // // //   }

// // // // // // // // //   getTotalTimeSpent(): number {
// // // // // // // // //     return this.pageVisits.reduce((total, visit) => total + visit.time, 0);
// // // // // // // // //   }

// // // // // // // // //   getCurrentPageTime(): number {
// // // // // // // // //     const currentTime = Date.now();
// // // // // // // // //     const timeSpent = Math.floor((currentTime - this.pageStartTime) / 1000);
// // // // // // // // //     console.log("Temps passé sur la page actuelle : ", timeSpent, " secondes"); // Affiche le temps actuel de la page
// // // // // // // // //     return timeSpent;
// // // // // // // // //   }

// // // // // // // // //   trackPageTime() {
// // // // // // // // //     console.log("trackPageTime called");

// // // // // // // // //     // Si une page a déjà été visitée, calculer son temps
// // // // // // // // //     if (this.pageVisits.length > 0) {
// // // // // // // // //       const lastVisit = this.pageVisits[this.pageVisits.length - 1];
// // // // // // // // //       const timeSpentOnPage = this.getCurrentPageTime(); // Obtenez le temps passé sur la page
// // // // // // // // //       lastVisit.time = timeSpentOnPage;  // Mettre à jour le temps
// // // // // // // // //       console.log(`Temps passé sur la page ${lastVisit.url}: ${timeSpentOnPage} secondes`);  // Affiche le temps de la page précédente
// // // // // // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // //     }

// // // // // // // // //     this.pageStartTime = Date.now(); // Réinitialiser le temps de départ pour la nouvelle page
// // // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // // //   }

// // // // // // // // //   incrementPageCount(url: string) {
// // // // // // // // //     const newCount = this.pageCount.value + 1;
// // // // // // // // //     this.pageCount.next(newCount);
// // // // // // // // //     sessionStorage.setItem('pageCount', newCount.toString());

// // // // // // // // //     const formattedUrl = url.startsWith('/') ? url : '/' + url;

// // // // // // // // //     // Vérification si la nouvelle URL est identique à la précédente avant de l’ajouter
// // // // // // // // //     if (this.pageVisits.length > 0 && this.pageVisits[this.pageVisits.length - 1].url === formattedUrl) {
// // // // // // // // //       console.log("URL en double détectée, pas d'ajout.");
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     console.log(`Nouvelle page visitée : ${formattedUrl}`);
// // // // // // // // //     this.pageVisits.push({ url: formattedUrl, time: 0 });
// // // // // // // // //     sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // // //   }

// // // // // // // // //   getTrackingData(): any {
// // // // // // // // //     return {
// // // // // // // // //       "Adresse IP": this.userIp,
// // // // // // // // //       "Nb pages visitées": this.pageCount.value,
// // // // // // // // //       "Informations sur les pages visitées": this.pageVisits.map((visit, index) => ({
// // // // // // // // //         [`url n°${index + 1}`]: visit.url,
// // // // // // // // //         "time": visit.time
// // // // // // // // //       }))
// // // // // // // // //     };
// // // // // // // // //   }

// // // // // // // // //   getPageCountObservable() {
// // // // // // // // //     return this.pageCount.asObservable();
// // // // // // // // //   }

// // // // // // // // //   showTrackingData() {
// // // // // // // // //     console.log("📊 Données de suivi :", JSON.stringify(this.getTrackingData(), null, 2));
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // import { Injectable } from '@angular/core';
// // // // // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // // // // import { BehaviorSubject } from 'rxjs';
// // // // // // // // import { IpService } from './ip.service';

// // // // // // // // interface PageVisit {
// // // // // // // //   url: string;
// // // // // // // //   time: number;
// // // // // // // // }

// // // // // // // // @Injectable({
// // // // // // // //   providedIn: 'root'
// // // // // // // // })
// // // // // // // // export class TrackingService {
// // // // // // // //   private pageStartTime: number = 0;
// // // // // // // //   private pageVisits: PageVisit[] = [];
// // // // // // // //   private pageCount: BehaviorSubject<number>;
// // // // // // // //   private userIp: string = '';

// // // // // // // //   constructor(private router: Router, private ipService: IpService) {
// // // // // // // //     this.loadTrackingData();

// // // // // // // //     // Récupérer l'IP de l'utilisateur au début
// // // // // // // //     this.ipService.getIp().subscribe(ip => {
// // // // // // // //       this.userIp = ip;
// // // // // // // //       console.log("Adresse IP récupérée : ", this.userIp); // Affiche l'IP récupérée
// // // // // // // //     });

// // // // // // // //     // Capturer les événements de navigation pour suivre les pages visitées
// // // // // // // //     this.router.events.subscribe(event => {
// // // // // // // //       if (event instanceof NavigationEnd) {
// // // // // // // //         this.trackPageTime();  // Mettre à jour le temps de la page précédente
// // // // // // // //         this.incrementPageCount(event.urlAfterRedirects);  // Incrémenter le compteur de pages
// // // // // // // //         this.showTrackingData();  // Afficher les données de suivi à chaque changement de page
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //     // Démarrer le suivi dès le premier chargement
// // // // // // // //     this.startTracking(); 
// // // // // // // //   }

// // // // // // // //   private loadTrackingData() {
// // // // // // // //     const storedPageVisits = sessionStorage.getItem('pageVisits');
// // // // // // // //     if (storedPageVisits) {
// // // // // // // //       this.pageVisits = JSON.parse(storedPageVisits);
// // // // // // // //     }

// // // // // // // //     const storedPageCount = Number(sessionStorage.getItem('pageCount')) || 0;
// // // // // // // //     this.pageCount = new BehaviorSubject<number>(storedPageCount);
// // // // // // // //   }

// // // // // // // //   startTracking() {
// // // // // // // //     if (!sessionStorage.getItem('loginTime')) {
// // // // // // // //       sessionStorage.setItem('loginTime', Date.now().toString());
// // // // // // // //     }

// // // // // // // //     this.pageStartTime = Date.now();
// // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());

// // // // // // // //     if (this.pageVisits.length === 0) {
// // // // // // // //       this.pageVisits.push({ url: '/', time: 0 });
// // // // // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // //     }

// // // // // // // //     console.log("Suivi démarré. Temps de départ : ", this.pageStartTime); // Affiche le temps de départ
// // // // // // // //   }

// // // // // // // //   getLoginDuration(): number {
// // // // // // // //     return Math.floor((Date.now() - Number(sessionStorage.getItem('loginTime'))) / 1000);
// // // // // // // //   }

// // // // // // // //   getTotalTimeSpent(): number {
// // // // // // // //     return this.pageVisits.reduce((total, visit) => total + visit.time, 0);
// // // // // // // //   }

// // // // // // // //   getCurrentPageTime(): number {
// // // // // // // //     const currentTime = Date.now();
// // // // // // // //     const timeSpent = Math.floor((currentTime - this.pageStartTime) / 1000);
// // // // // // // //     console.log("Temps passé sur la page actuelle : ", timeSpent, " secondes"); // Affiche le temps actuel de la page
// // // // // // // //     return timeSpent;
// // // // // // // //   }

// // // // // // // //   trackPageTime() {
// // // // // // // //     console.log("trackPageTime called");

// // // // // // // //     // Si une page a déjà été visitée, calculer son temps et le mettre à jour
// // // // // // // //     if (this.pageVisits.length > 0) {
// // // // // // // //       const lastVisit = this.pageVisits[this.pageVisits.length - 1];
// // // // // // // //       const timeSpentOnPage = this.getCurrentPageTime(); // Obtenez le temps passé sur la page
// // // // // // // //       lastVisit.time = timeSpentOnPage;  // Mettre à jour le temps
// // // // // // // //       console.log(`Temps passé sur la page ${lastVisit.url}: ${timeSpentOnPage} secondes`);  // Affiche le temps de la page précédente
// // // // // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // //     }

// // // // // // // //     this.pageStartTime = Date.now(); // Réinitialiser le temps de départ pour la nouvelle page
// // // // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // // // //   }

// // // // // // // //   incrementPageCount(url: string) {
// // // // // // // //     const newCount = this.pageCount.value + 1;
// // // // // // // //     this.pageCount.next(newCount);
// // // // // // // //     sessionStorage.setItem('pageCount', newCount.toString());

// // // // // // // //     const formattedUrl = url.startsWith('/') ? url : '/' + url;

// // // // // // // //     // Vérification si la nouvelle URL est identique à la précédente avant de l’ajouter
// // // // // // // //     if (this.pageVisits.length > 0 && this.pageVisits[this.pageVisits.length - 1].url === formattedUrl) {
// // // // // // // //       console.log("URL en double détectée, pas d'ajout.");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     console.log(`Nouvelle page visitée : ${formattedUrl}`);
// // // // // // // //     this.pageVisits.push({ url: formattedUrl, time: 0 });
// // // // // // // //     sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // // // //   }

// // // // // // // //   getTrackingData(): any {
// // // // // // // //     return {
// // // // // // // //       "Adresse IP": this.userIp,
// // // // // // // //       "Nb pages visitées": this.pageCount.value,
// // // // // // // //       "Informations sur les pages visitées": this.pageVisits.map((visit, index) => ({
// // // // // // // //         [`url n°${index + 1}`]: visit.url,
// // // // // // // //         "time": visit.time
// // // // // // // //       }))
// // // // // // // //     };
// // // // // // // //   }

// // // // // // // //   getPageCountObservable() {
// // // // // // // //     return this.pageCount.asObservable();
// // // // // // // //   }

// // // // // // // //   showTrackingData() {
// // // // // // // //     console.log("📊 Données de suivi :", JSON.stringify(this.getTrackingData(), null, 2));
// // // // // // // //   }
// // // // // // // // }



// // // // // // import { Injectable } from '@angular/core';
// // // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // // import { BehaviorSubject } from 'rxjs';
// // // // // // import { IpService } from './ip.service';

// // // // // // interface PageVisit {
// // // // // //   url: string;
// // // // // //   time: number;
// // // // // // }

// // // // // // @Injectable({
// // // // // //   providedIn: 'root'
// // // // // // })
// // // // // // export class TrackingService {
// // // // // //   private pageStartTime: number = 0;
// // // // // //   private pageVisits: PageVisit[] = [];
// // // // // //   private pageCount: BehaviorSubject<number>;
// // // // // //   private userIp: string = '';
// // // // // //   private currentPageTime: number = 0;

// // // // // //   constructor(private router: Router, private ipService: IpService) {
// // // // // //     this.loadTrackingData();

// // // // // //     // Récupérer l'IP de l'utilisateur au début
// // // // // //     this.ipService.getIp().subscribe(ip => {
// // // // // //       this.userIp = ip;
// // // // // //       console.log("Adresse IP récupérée : ", this.userIp); // Affiche l'IP récupérée
// // // // // //     });

// // // // // //     // Capturer les événements de navigation pour suivre les pages visitées
// // // // // //     this.router.events.subscribe(event => {
// // // // // //       if (event instanceof NavigationEnd) {
// // // // // //         this.trackPageTime();  // Mettre à jour le temps de la page précédente
// // // // // //         this.incrementPageCount(event.urlAfterRedirects);  // Incrémenter le compteur de pages
// // // // // //         this.showTrackingData();  // Afficher les données de suivi à chaque changement de page
// // // // // //       }
// // // // // //     });

// // // // // //     // Démarrer le suivi dès le premier chargement
// // // // // //     this.startTracking();
// // // // // //   }

// // // // // //   private loadTrackingData() {
// // // // // //     const storedPageVisits = sessionStorage.getItem('pageVisits');
// // // // // //     if (storedPageVisits) {
// // // // // //       this.pageVisits = JSON.parse(storedPageVisits);
// // // // // //     }

// // // // // //     const storedPageCount = Number(sessionStorage.getItem('pageCount')) || 0;
// // // // // //     this.pageCount = new BehaviorSubject<number>(storedPageCount);
// // // // // //   }

// // // // // //   startTracking() {
// // // // // //     if (!sessionStorage.getItem('loginTime')) {
// // // // // //       sessionStorage.setItem('loginTime', Date.now().toString());
// // // // // //     }

// // // // // //     this.pageStartTime = Date.now();
// // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());

// // // // // //     if (this.pageVisits.length === 0) {
// // // // // //       this.pageVisits.push({ url: '/', time: 0 });
// // // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // //     }

// // // // // //     console.log("Suivi démarré. Temps de départ : ", this.pageStartTime); // Affiche le temps de départ
// // // // // //   }

// // // // // //   getLoginDuration(): number {
// // // // // //     return Math.floor((Date.now() - Number(sessionStorage.getItem('loginTime'))) / 1000);
// // // // // //   }

// // // // // //   getTotalTimeSpent(): number {
// // // // // //     return this.pageVisits.reduce((total, visit) => total + visit.time, 0);
// // // // // //   }

// // // // // //   getCurrentPageTime(): number {
// // // // // //     // Calculer le temps passé sur la page actuelle
// // // // // //     const timeSpent = Math.floor((Date.now() - this.pageStartTime) / 1000);
// // // // // //     console.log("Temps passé sur la page actuelle : ", timeSpent, " secondes"); // Affiche le temps actuel de la page
// // // // // //     return timeSpent;
// // // // // //   }

// // // // // //   trackPageTime() {
// // // // // //     console.log("trackPageTime called");

// // // // // //     // Si une page a déjà été visitée, calculer son temps et le mettre à jour
// // // // // //     if (this.pageVisits.length > 0) {
// // // // // //       const lastVisit = this.pageVisits[this.pageVisits.length - 1];
// // // // // //       const timeSpentOnPage = this.getCurrentPageTime(); // Obtenez le temps passé sur la page
// // // // // //       lastVisit.time = timeSpentOnPage;  // Mettre à jour le temps
// // // // // //       console.log(`Temps passé sur la page ${lastVisit.url}: ${timeSpentOnPage} secondes`);  // Affiche le temps de la page précédente
// // // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // //     }

// // // // // //     this.pageStartTime = Date.now(); // Réinitialiser le temps de départ pour la nouvelle page
// // // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // // //   }

// // // // // //   incrementPageCount(url: string) {
// // // // // //     const newCount = this.pageCount.value + 1;
// // // // // //     this.pageCount.next(newCount);
// // // // // //     sessionStorage.setItem('pageCount', newCount.toString());

// // // // // //     const formattedUrl = url.startsWith('/') ? url : '/' + url;

// // // // // //     // Vérification si la nouvelle URL est identique à la précédente avant de l’ajouter
// // // // // //     if (this.pageVisits.length > 0 && this.pageVisits[this.pageVisits.length - 1].url === formattedUrl) {
// // // // // //       console.log("URL en double détectée, pas d'ajout.");
// // // // // //       return;
// // // // // //     }

// // // // // //     console.log(`Nouvelle page visitée : ${formattedUrl}`);
// // // // // //     this.pageVisits.push({ url: formattedUrl, time: 0 });
// // // // // //     sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // // //   }

// // // // // //   getTrackingData(): any {
// // // // // //     return {
// // // // // //       "Adresse IP": this.userIp,
// // // // // //       "Nb pages visitées": this.pageCount.value,
// // // // // //       "Informations sur les pages visitées": this.pageVisits.map((visit, index) => ({
// // // // // //         [`url n°${index + 1}`]: visit.url,
// // // // // //         "time": visit.time
// // // // // //       }))
// // // // // //     };
// // // // // //   }

// // // // // //   getPageCountObservable() {
// // // // // //     return this.pageCount.asObservable();
// // // // // //   }

// // // // // //   showTrackingData() {
// // // // // //     console.log("📊 Données de suivi :", JSON.stringify(this.getTrackingData(), null, 2));
// // // // // //   }
// // // // // // }

// // // // // import { Injectable } from '@angular/core';
// // // // // import { Router, NavigationEnd } from '@angular/router';
// // // // // import { BehaviorSubject } from 'rxjs';
// // // // // import { IpService } from './ip.service';

// // // // // interface PageVisit {
// // // // //   url: string;
// // // // //   time: number;
// // // // // }

// // // // // @Injectable({
// // // // //   providedIn: 'root'
// // // // // })
// // // // // export class TrackingService {
// // // // //   private pageStartTime: number = 0;
// // // // //   private pageVisits: PageVisit[] = [];
// // // // //   private pageCount: BehaviorSubject<number>;
// // // // //   private userIp: string = '';
// // // // //   private currentPageTime: number = 0;

// // // // //   constructor(private router: Router, private ipService: IpService) {
// // // // //     this.loadTrackingData();

// // // // //     // Récupérer l'IP de l'utilisateur
// // // // //     this.ipService.getIp().subscribe(ip => {
// // // // //       this.userIp = ip;
// // // // //       console.log("Adresse IP récupérée : ", this.userIp);
// // // // //     });

// // // // //     // Capturer les événements de navigation
// // // // //     this.router.events.subscribe(event => {
// // // // //       if (event instanceof NavigationEnd) {
// // // // //         this.trackPageTime();  // Mettre à jour le temps de la page précédente
// // // // //         this.incrementPageCount(event.urlAfterRedirects);  // Incrémenter le compteur de pages
// // // // //         this.showTrackingData();  // Afficher les données de suivi à chaque changement de page
// // // // //       }
// // // // //     });

// // // // //     // Démarrer le suivi dès le premier chargement
// // // // //     this.startTracking();
// // // // //   }

// // // // //   private loadTrackingData() {
// // // // //     const storedPageVisits = sessionStorage.getItem('pageVisits');
// // // // //     if (storedPageVisits) {
// // // // //       this.pageVisits = JSON.parse(storedPageVisits);
// // // // //     }

// // // // //     const storedPageCount = Number(sessionStorage.getItem('pageCount')) || 0;
// // // // //     this.pageCount = new BehaviorSubject<number>(storedPageCount);
// // // // //   }

// // // // //   startTracking() {
// // // // //     if (!sessionStorage.getItem('loginTime')) {
// // // // //       sessionStorage.setItem('loginTime', Date.now().toString());
// // // // //     }

// // // // //     this.pageStartTime = Date.now();
// // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());

// // // // //     if (this.pageVisits.length === 0) {
// // // // //       this.pageVisits.push({ url: '/', time: 0 });
// // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // //     }

// // // // //     console.log("Suivi démarré. Temps de départ : ", this.pageStartTime); // Affiche le temps de départ
// // // // //   }

// // // // //   getLoginDuration(): number {
// // // // //     return Math.floor((Date.now() - Number(sessionStorage.getItem('loginTime'))) / 1000);
// // // // //   }

// // // // //   getTotalTimeSpent(): number {
// // // // //     return this.pageVisits.reduce((total, visit) => total + visit.time, 0);
// // // // //   }

// // // // //   getCurrentPageTime(): number {
// // // // //     const timeSpent = Math.floor((Date.now() - this.pageStartTime) / 1000);
// // // // //     console.log("Temps passé sur la page actuelle : ", timeSpent, " secondes"); // Affiche le temps actuel de la page
// // // // //     return timeSpent;
// // // // //   }

// // // // //   trackPageTime() {
// // // // //     console.log("trackPageTime called");

// // // // //     // Si une page a déjà été visitée, calculer son temps et le mettre à jour
// // // // //     if (this.pageVisits.length > 0) {
// // // // //       const lastVisit = this.pageVisits[this.pageVisits.length - 1];
// // // // //       const timeSpentOnPage = this.getCurrentPageTime(); // Obtenez le temps passé sur la page
// // // // //       lastVisit.time = timeSpentOnPage;  // Mettre à jour le temps
// // // // //       console.log(`Temps passé sur la page ${lastVisit.url}: ${timeSpentOnPage} secondes`);  // Affiche le temps de la page précédente
// // // // //       sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // //     }

// // // // //     this.pageStartTime = Date.now(); // Réinitialiser le temps de départ pour la nouvelle page
// // // // //     sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
// // // // //   }

// // // // //   incrementPageCount(url: string) {
// // // // //     const newCount = this.pageCount.value + 1;
// // // // //     this.pageCount.next(newCount);
// // // // //     sessionStorage.setItem('pageCount', newCount.toString());

// // // // //     const formattedUrl = url.startsWith('/') ? url : '/' + url;

// // // // //     if (this.pageVisits.length > 0 && this.pageVisits[this.pageVisits.length - 1].url === formattedUrl) {
// // // // //       console.log("URL en double détectée, pas d'ajout.");
// // // // //       return;
// // // // //     }

// // // // //     console.log(`Nouvelle page visitée : ${formattedUrl}`);
// // // // //     this.pageVisits.push({ url: formattedUrl, time: 0 });
// // // // //     sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
// // // // //   }

// // // // //   getTrackingData(): any {
// // // // //     return {
// // // // //       "Adresse IP": this.userIp,
// // // // //       "Nb pages visitées": this.pageCount.value,
// // // // //       "Informations sur les pages visitées": this.pageVisits.map((visit, index) => ({
// // // // //         [`url n°${index + 1}`]: visit.url,
// // // // //         "time": visit.time
// // // // //       }))
// // // // //     };
// // // // //   }

// // // // //   getPageCountObservable() {
// // // // //     return this.pageCount.asObservable();
// // // // //   }

// // // // //   showTrackingData() {
// // // // //     console.log("📊 Données de suivi :", JSON.stringify(this.getTrackingData(), null, 2));
// // // // //   }
// // // // // }