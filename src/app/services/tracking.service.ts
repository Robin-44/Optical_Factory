import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IpService } from './ip.service';

interface PageVisit {
  url: string;
  time: number;
}

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private Actualtemp = 0;
  private Previoustemp = 0;
  private previousPageStartTime: number = 0;  // (Ligne 11) Stocke le temps de départ de la page précédente
  private pageStartTime: number = 0;  // Stocke le temps de départ de la page actuelle
  private pageVisits: PageVisit[] = [];
  private pageCount: BehaviorSubject<number>;
  private userIp: string = '';

  constructor(private router: Router, private ipService: IpService) {
    this.loadTrackingData();

    // Récupérer l'IP de l'utilisateur au début
    this.ipService.getIp().subscribe(ip => {
      this.userIp = ip;
    });

    // Capturer les événements de navigation pour suivre les pages visitées
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.trackPageTime();  // (Ligne 31) Mettre à jour le temps de la page précédente
        this.incrementPageCount(event.urlAfterRedirects);  // Incrémenter le compteur de pages
        this.showTrackingData();  // Afficher les données de suivi à chaque changement de page
      }
    });

    // Démarrer le suivi dès le premier chargement
    this.startTracking();
  }

  private loadTrackingData() {
    const storedPageVisits = sessionStorage.getItem('pageVisits');
    if (storedPageVisits) {
      this.pageVisits = JSON.parse(storedPageVisits);
    }

    const storedPageCount = Number(sessionStorage.getItem('pageCount')) || 0;
    this.pageCount = new BehaviorSubject<number>(storedPageCount);
  }

  startTracking() {
    if (!sessionStorage.getItem('loginTime')) {
      sessionStorage.setItem('loginTime', Date.now().toString());
    }

    this.pageStartTime = Date.now();
    sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());

    console.log("Suivi démarré. Temps de départ : ", this.pageStartTime);
  }

  getLoginDuration(): number {
    return Math.floor((Date.now() - Number(sessionStorage.getItem('loginTime'))) / 1000);
  }

  getTotalTimeSpent(): number {
    return this.pageVisits.reduce((total, visit) => total + visit.time, 0);
  }

  getCurrentPageTime(): number {
    const currentTime = Date.now();
    const timeSpent = Math.floor((currentTime - this.pageStartTime) / 1000);
    console.log("Temps passé sur la page actuelle : ", timeSpent, " secondes");
    this.Actualtemp = timeSpent;
    return timeSpent;
  }

  trackPageTime() {
    if (this.pageVisits.length > 0) {
      const lastVisit = this.pageVisits[this.pageVisits.length - 1];
      const timeSpentOnPage = this.getCurrentPageTime();  // (Ligne 73) Obtenez le temps passé sur la page précédente
      lastVisit.time = timeSpentOnPage;  // (Ligne 74) Mise à jour correcte du temps
      console.log(`Temps passé sur la page ${lastVisit.url}: ${timeSpentOnPage} secondes`);
      sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
    }

    // (Ligne 80) Stocker le temps de départ de la page précédente avant de réinitialiser
    this.previousPageStartTime = this.pageStartTime;
    console.log("Previous---" + this.previousPageStartTime)


    // (Ligne 83) Mettre à jour le temps de départ pour la nouvelle page
    this.pageStartTime = Date.now();
    console.log("Actual-----" + this.pageStartTime)
    sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
    const timeSpentOnPreviousPage = Math.floor((this.pageStartTime - this.previousPageStartTime) / 1000);
    console.log("timeSpentOnPreviousPage : " + timeSpentOnPreviousPage)
  }

  incrementPageCount(url: string) {
    const newCount = this.pageCount.value + 1;
    this.pageCount.next(newCount);
    sessionStorage.setItem('pageCount', newCount.toString());

    const formattedUrl = url.startsWith('/') ? url : '/' + url;

    console.log(`Nouvelle page visitée : ${formattedUrl}`);

    // (Ligne 103) Calculer le temps réellement passé sur la page précédente
    const timeSpentOnPreviousPage = Math.floor((this.pageStartTime - this.previousPageStartTime) / 1000);

    // (Ligne 106) Ajouter la nouvelle page avec le temps calculé correctement
    this.pageVisits.push({ url: formattedUrl, time: timeSpentOnPreviousPage });

    sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
  }

  getTrackingData(): any {
    return {
      "Adresse IP": this.userIp,
      "Nb pages visitées": this.pageCount.value,
      "Informations sur les pages visitées": this.pageVisits.map((visit, index) => ({
        [`url`]: visit.url,
        "time": visit.time
      }))
    };
  }

  getPageCountObservable() {
    return this.pageCount.asObservable();
  }

  showTrackingData() {
    console.log("📊 Données de suivi :", JSON.stringify(this.getTrackingData(), null, 2));
  }
}
