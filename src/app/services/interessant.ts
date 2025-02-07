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
  private pageStartTime: number = 0;
  private pageVisits: PageVisit[] = [];
  private pageCount: BehaviorSubject<number>;
  private userIp: string = '';

  constructor(private router: Router, private ipService: IpService) {
    this.loadTrackingData();

    this.ipService.getIp().subscribe(ip => {
      this.userIp = ip;
      console.log("Adresse IP récupérée : ", this.userIp); // Affiche l'IP récupérée
    });

    // Capturer le changement de route et déclencher le suivi
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.trackPageTime();  // Mettre à jour le temps de la page précédente
        this.incrementPageCount(event.urlAfterRedirects);  // Incrémenter le compteur de pages
        this.showTrackingData();  // Afficher les données de suivi
      }
    });

    // Lancement du suivi dès le début
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

    if (this.pageVisits.length === 0) {
      this.pageVisits.push({ url: '/', time: 0 });
      sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
    }

    console.log("Suivi démarré. Temps de départ : ", this.pageStartTime); // Affiche le temps de départ
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
    console.log("Temps passé sur la page actuelle : ", timeSpent, " secondes"); // Affiche le temps actuel de la page
    return timeSpent;
  }

  trackPageTime() {
    console.log("trackPageTime called");

    // Si une page a déjà été visitée, calculer son temps
    if (this.pageVisits.length > 0) {
      const lastVisit = this.pageVisits[this.pageVisits.length - 1];
      const timeSpentOnPage = this.getCurrentPageTime(); // Obtenez le temps passé sur la page
      lastVisit.time = timeSpentOnPage;  // Mettre à jour le temps
      console.log(`Temps passé sur la page ${lastVisit.url}: ${timeSpentOnPage} secondes`);  // Affiche le temps de la page précédente
      sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
    }

    this.pageStartTime = Date.now(); // Réinitialiser le temps de départ pour la nouvelle page
    sessionStorage.setItem('pageStartTime', this.pageStartTime.toString());
  }

  incrementPageCount(url: string) {
    const newCount = this.pageCount.value + 1;
    this.pageCount.next(newCount);
    sessionStorage.setItem('pageCount', newCount.toString());

    const formattedUrl = url.startsWith('/') ? url : '/' + url;

    // Vérification si la nouvelle URL est identique à la précédente avant de l’ajouter
    if (this.pageVisits.length > 0 && this.pageVisits[this.pageVisits.length - 1].url === formattedUrl) {
      console.log("URL en double détectée, pas d'ajout.");
      return;
    }

    console.log(`Nouvelle page visitée : ${formattedUrl}`);
    this.pageVisits.push({ url: formattedUrl, time: 0 });
    sessionStorage.setItem('pageVisits', JSON.stringify(this.pageVisits));
  }

  getTrackingData(): any {
    return {
      "Adresse IP": this.userIp,
      "Nb pages visitées": this.pageCount.value,
      "Informations sur les pages visitées": this.pageVisits.map((visit, index) => ({
        [`url n°${index + 1}`]: visit.url,
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