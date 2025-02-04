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
import { FormsModule } from '@angular/forms';
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
        CommonModule,
        FormsModule
      ]
})
export class HomeComponent implements OnInit {
  montures: Monture[] = []; 
  filteredMontures: Monture[] = [];  // Montures filtrées en fonction des critères
  tendances: Monture[] = []; 
  innovations: Monture[] = []; 
  selection_opticians: Monture[] = []; 
  best_sales: Monture[] = []; 
  selectedCategory: string = '';
  selectedPriceRange: string = '';
  selectedBrand: string = '';
  selectedName: string = '';
  brands: string[]; // Exemple de marques
  
  constructor(public router: Router, public auth: AuthService, public apiService: ApiService) {}

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        this.router.navigate(['/login']); 
      }
    });
    this.loadMontures();
  }

  loadMontures() {
    this.apiService.getMontures$().subscribe(
      (data) => {
        this.montures = data;
        this.filteredMontures = [...this.montures]; // Initialisez filteredMontures avec toutes les montures
        
        this.tendances = this.montures.filter(m => m.selected?.includes("tendance"));
        this.best_sales = this.montures.filter(m => m.selected?.includes("best_sales"));
        this.selection_opticians = this.montures.filter(m => m.selected?.includes("selection_optician"));
        this.innovations = this.montures.filter(m => m.selected?.includes("innovations"));
        const marquesSet = new Set(this.montures.map(m => m.Marque)); 
        
        this.brands = Array.from(marquesSet); // Convertir le Set en tableau
      },
      (error) => {
        console.error("Error fetching montures", error);
      }
    );
  }
 
  filterMontures() {
    let filtered = this.montures;

    // Filtrage par catégorie
    if (this.selectedCategory) {
      filtered = filtered.filter(m => m.selected?.includes(this.selectedCategory));
    }

    // Filtrage par prix
    if (this.selectedPriceRange === 'low') {
      filtered = filtered.filter(m => m.Prix < 50);
    } else if (this.selectedPriceRange === 'mid') {
      filtered = filtered.filter(m => m.Prix >= 50 && m.Prix <= 150);
    } else if (this.selectedPriceRange === 'high') {
      filtered = filtered.filter(m => m.Prix > 150);
    }

    // Filtrage par marque
    if (this.selectedBrand) {
      filtered = filtered.filter(m => m.Marque === this.selectedBrand);
    }

    // Filtrage par nom
    if (this.selectedName) {
      filtered = filtered.filter(m => m.Modele.toLowerCase().includes(this.selectedName.toLowerCase()));
    }

    this.filteredMontures = filtered;
  }

  goToMonturePage(montureId: string): void {
    this.router.navigate([`/monture/${montureId}`]);
  }
}
