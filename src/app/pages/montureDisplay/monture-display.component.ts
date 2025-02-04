import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';  // Assurez-vous que le service est créé pour récupérer les produits
import { Monture } from 'src/models/monture.model';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { HomeContentComponent } from 'src/app/components/home-content/home-content.component';
import { HeroComponent } from 'src/app/components/hero/hero.component';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

@Component({
  selector: 'app-monture-display',
  templateUrl: './monture-display.component.html',
  styleUrls: ['./monture-display.component.css'],
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
export class MontureDisplayComponent implements OnInit {
  montureId: string = '';
  monture: Monture; // Remplacer par une interface monture si tu en as une

  constructor(
    private route: ActivatedRoute, // Récupérer l'ID depuis la route
    private apiService: ApiService // Service pour récupérer le produit
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID du produit depuis l'URL
    this.route.paramMap.subscribe(params => {
      this.montureId = params.get('id'); // L'ID du produit est récupéré ici
      this.loadMonture();
    });
  }

  add_to_shop(montureId:string){
    console.log("Add to shop : ",montureId)
  }
  // Méthode pour charger les informations du produit
  loadMonture(): void {
    this.apiService.getMonturesById(this.montureId).subscribe(
      (data) => {
        this.monture = data;
        console.log(this.monture)
      },
      (error) => {
        console.error('Error loading monture:', error);
      }
    );
  }
}
