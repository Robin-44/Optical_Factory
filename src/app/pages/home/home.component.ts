import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Monture } from '../../../models/monture.model'; 
import { HomeContentComponent } from 'src/app/components/home-content/home-content.component';
import { HeroComponent } from 'src/app/components/hero/hero.component';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    HomeContentComponent,
    HeroComponent,
    NavBarComponent,
    LoadingComponent,
    AsyncPipe,
    NgIf,
    CommonModule
  ]
})

export class HomeComponent implements OnInit {
  montures: Monture[] = []; 
  tendances: Monture[] = []; 
  innovations: Monture[] = []; 
  selection_opticians: Monture[] = []; 
  best_sales: Monture[] = []; 

  constructor(public router: Router, public auth: AuthService, public apiService: ApiService) {}

  ngOnInit() {
    // Vérifiez si l'utilisateur est déjà authentifié et redirigez-le
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      console.log(isAuthenticated)
      if (!isAuthenticated) {
        // Si l'utilisateur est authentifié, redirigez-le vers la page d'accueil
        this.router.navigate(['/login']); 
      }
    });
    this.loadMontures();
  }
  goToMonturePage(montureId: string): void {
    this.router.navigate([`/monture/${montureId}`]);  // Navigue vers la page produit avec l'ID
  }

  // Charger les montures
  loadMontures() {
    this.apiService.getMontures$().subscribe(
      (data) => {
        this.montures = data;
  
        // Création des tableaux filtrés
        this.tendances = this.montures.filter(m => m.selected?.includes("tendance"));
        this.best_sales = this.montures.filter(m => m.selected?.includes("best_sales"));
        this.selection_opticians = this.montures.filter(m => m.selected?.includes("selection_optician"));
        this.innovations = this.montures.filter(m => m.selected?.includes("innovations"));
  
        console.log("Montures tendances :", this.tendances);
        console.log("Meilleures ventes :", this.best_sales);
        console.log("Sélection opticien :", this.selection_opticians);
      },
      (error) => {
        console.error("Error fetching montures", error);
      }
    );
  }
  


}
