// // // // // import { Component, OnInit  } from '@angular/core';
// // // // // import { RouterOutlet } from '@angular/router';
// // // // // import { NavBarComponent } from './components/nav-bar/nav-bar.component';
// // // // // import { FooterComponent } from './components/footer/footer.component';
// // // // // import { IpService } from './services/ip.service';
// // // // // import { TrackingService } from './services/tracking.service';


// // // // // @Component({
// // // // //   selector: 'app-root',
// // // // //   templateUrl: './app.component.html',
// // // // //   styleUrls: ['./app.component.css'],
// // // // //   standalone: true,
// // // // //   imports: [RouterOutlet, NavBarComponent, FooterComponent],
// // // // // })
// // // // // // export class AppComponent  implements OnInit, OnDestroy {
// // // // // //   title = 'Auth0 Angular SDK Sample';
// // // // // //   userIp: string = '';
// // // // // //   loginDuration: number = 0;
// // // // // //   pageCount: number = 0;

// // // // // //   constructor(private ipService: IpService, private trackingService: TrackingService) {}

// // // // // //   ngOnInit() {
// // // // // //     // Récupération de l'adresse IP
// // // // // //     this.ipService.getIp().subscribe((data: any) => {
// // // // // //       this.userIp = data.ip;
// // // // // //       console.log("Adresse IP :", this.userIp);
// // // // // //     });

// // // // // //     // Démarrage du tracking du temps de connexion
// // // // // //     this.trackingService.startTracking();

// // // // // //     // Suivi du nombre de pages visitées
// // // // // //     this.trackingService.getPageCountObservable().subscribe(count => {
// // // // // //       this.pageCount = count;
// // // // // //       console.log("Pages visitées :", this.pageCount);
// // // // // //     });
// // // // // //   }

// // // // // //   ngOnDestroy() {
// // // // // //     // Calcul du temps passé avant de quitter l'application
// // // // // //     this.loginDuration = this.trackingService.getLoginDuration();
// // // // // //     console.log("Temps passé sur le site :", this.loginDuration / 1000, "secondes");
// // // // // //   }
// // // // // // }

// // // // // // export class AppComponent implements OnInit {
// // // // // //   userIp: string = '';
// // // // // //   loginDuration: number = 0;
// // // // // //   pageCount: number = 0;

// // // // // //   constructor(private ipService: IpService, private trackingService: TrackingService) {}

// // // // // //   ngOnInit() {
// // // // // //     // 1️⃣ Récupération de l'adresse IP
// // // // // //     this.ipService.getIp().subscribe((data: any) => {
// // // // // //       this.userIp = data.ip;
// // // // // //       console.log("Adresse IP :", this.userIp);
// // // // // //     });

// // // // // //     // 2️⃣ Démarrage du tracking du temps
// // // // // //     this.trackingService.startTracking();
// // // // // //     this.updateLoginDuration();

// // // // // //     // 3️⃣ Suivi du nombre de pages visitées
// // // // // //     this.trackingService.getPageCountObservable().subscribe(count => {
// // // // // //       this.pageCount = count;
// // // // // //       console.log("Pages visitées :", this.pageCount);
// // // // // //     });

// // // // // //     // Mise à jour de la durée toutes les secondes (affichage en live)
// // // // // //     setInterval(() => this.updateLoginDuration(), 1000);
// // // // // //   }

// // // // // //   updateLoginDuration() {
// // // // // //     this.loginDuration = this.trackingService.getLoginDuration();
// // // // // //     console.log("Temps passé sur le site :", Math.floor(this.loginDuration / 1000), "secondes");
// // // // // //   }
// // // // // // }

// // // // // // export class AppComponent implements OnInit {
// // // // // //   userIp: string = '';
// // // // // //   totalLoginDuration: number = 0;
// // // // // //   currentPageDuration: number = 0;
// // // // // //   pageCount: number = 0;

// // // // // //   constructor(private ipService: IpService, private trackingService: TrackingService) {}

// // // // // //   ngOnInit() {
// // // // // //     // 1️⃣ Récupération de l'adresse IP
// // // // // //     this.ipService.getIp().subscribe((data: any) => {
// // // // // //       this.userIp = data.ip;
// // // // // //       console.log("Adresse IP :", this.userIp);
// // // // // //     });

// // // // // //     // 2️⃣ Démarrage du tracking
// // // // // //     this.trackingService.startTracking();

// // // // // //     // 3️⃣ Suivi du nombre de pages visitées
// // // // // //     this.trackingService.getPageCountObservable().subscribe(count => {
// // // // // //       this.pageCount = count;
// // // // // //       console.log("Pages visitées :", this.pageCount);
// // // // // //     });

// // // // // //     // 4️⃣ Mise à jour des temps en direct
// // // // // //     setInterval(() => this.updateTimers(), 1000);
// // // // // //   }

// // // // // //   updateTimers() {
// // // // // //     this.totalLoginDuration = this.trackingService.getTotalTimeSpent();
// // // // // //     this.currentPageDuration = this.trackingService.getCurrentPageTime();
// // // // // //     console.log(`⏳ Temps total: ${Math.floor(this.totalLoginDuration / 1000)}s, ⏱️ Temps sur page: ${Math.floor(this.currentPageDuration / 1000)}s`);
// // // // // //   }
// // // // // // }

// // // // // // export class AppComponent implements OnInit {
// // // // // //   userIp: string = '';
// // // // // //   totalLoginDuration: number = 0;
// // // // // //   currentPageDuration: number = 0;
// // // // // //   pageCount: number = 0;

// // // // // //   constructor(private ipService: IpService, private trackingService: TrackingService) {}

// // // // // //   ngOnInit() {
// // // // // //     // 1️⃣ Récupération de l'adresse IP
// // // // // //     this.ipService.getIp().subscribe((data: any) => {
// // // // // //       this.userIp = data.ip;
// // // // // //       console.log("Adresse IP :", this.userIp);
// // // // // //     });

// // // // // //     // 2️⃣ Démarrage du tracking
// // // // // //     this.trackingService.startTracking();

// // // // // //     // 3️⃣ Suivi du nombre de pages visitées
// // // // // //     this.trackingService.getPageCountObservable().subscribe(count => {
// // // // // //       this.pageCount = count;
// // // // // //       console.log("Pages visitées :", this.pageCount);
// // // // // //     });

// // // // // //     // 4️⃣ Mise à jour des timers en direct
// // // // // //     setInterval(() => this.updateTimers(), 1000);
// // // // // //   }

// // // // // //   updateTimers() {
// // // // // //     this.totalLoginDuration = this.trackingService.getTotalTimeSpent();
// // // // // //     this.currentPageDuration = this.trackingService.getCurrentPageTime();
// // // // // //     console.log(`⏳ Temps total: ${Math.floor(this.totalLoginDuration / 1000)}s, ⏱️ Temps sur page: ${Math.floor(this.currentPageDuration / 1000)}s`);
// // // // // //   }
// // // // // // }

// // // // // // export class AppComponent implements OnInit {
// // // // // //   userIp: string = '';
// // // // // //   totalLoginDuration: number = 0;
// // // // // //   currentPageDuration: number = 0;
// // // // // //   pageCount: number = 0;

// // // // // //   constructor(private ipService: IpService, private trackingService: TrackingService) {}

// // // // // //   ngOnInit() {
// // // // // //     // 1️⃣ Récupération de l'adresse IP
// // // // // //     this.ipService.getIp().subscribe((data: any) => {
// // // // // //       this.userIp = data.ip;
// // // // // //       console.log("Adresse IP :", this.userIp);
// // // // // //     });

// // // // // //     // 2️⃣ Démarrage du tracking
// // // // // //     this.trackingService.startTracking();

// // // // // //     // 3️⃣ Suivi du nombre de pages visitées
// // // // // //     this.trackingService.getPageCountObservable().subscribe(count => {
// // // // // //       this.pageCount = count;
// // // // // //       console.log("Pages visitées :", this.pageCount);
// // // // // //     });

// // // // // //     // 4️⃣ Mise à jour en temps réel
// // // // // //     setInterval(() => this.updateTimers(), 1000);
// // // // // //   }

// // // // // //   updateTimers() {
// // // // // //     this.totalLoginDuration = this.trackingService.getTotalTimeSpent();
// // // // // //     this.currentPageDuration = this.trackingService.getCurrentPageTime();
// // // // // //     console.log(`⏳ Temps total: ${Math.floor(this.totalLoginDuration / 1000)}s, ⏱️ Temps sur page: ${Math.floor(this.currentPageDuration / 1000)}s`);
// // // // // //   }
// // // // // // }

export class AppComponent implements OnInit {
  userIp: string = '';
  totalLoginDuration: number = 0;
  currentPageDuration: number = 0;
  pageCount: number = 0;

  constructor(private ipService: IpService, private trackingService: TrackingService) {}

  ngOnInit() {
    this.ipService.getIp().subscribe((data: any) => {
      this.userIp = data.ip;
      console.log("Adresse IP :", this.userIp);
    });

    this.trackingService.startTracking();

    this.trackingService.getPageCountObservable().subscribe(count => {
      this.pageCount = count;
      console.log("Pages visitées :", this.pageCount);
    });

    setInterval(() => this.updateTimers(), 1000);
  }

  updateTimers() {
    this.totalLoginDuration = this.trackingService.getTotalTimeSpent();
    this.currentPageDuration = this.trackingService.getCurrentPageTime();
    console.log(`⏳ Temps total: ${Math.floor(this.totalLoginDuration / 1000)}s, ⏱️ Temps sur page: ${Math.floor(this.currentPageDuration / 1000)}s`);
  }

  showTrackingData() {
    console.log("📊 Données de suivi :", this.trackingService.getTrackingData());
  }
}