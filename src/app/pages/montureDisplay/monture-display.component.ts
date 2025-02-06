import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';  // Assurez-vous que le service est créé pour récupérer les produits
import { Monture } from 'src/models/monture.model';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { HomeContentComponent } from 'src/app/components/home-content/home-content.component';
import { HeroComponent } from 'src/app/components/hero/hero.component';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { Basket } from 'src/models/basket.model';

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
  @Output() quantityUpdated = new EventEmitter<Number>();
  montureId: string = ''
  quantity:number = 0;
  monture: Monture; // Remplacer par une interface monture si tu en as une

  constructor(
    private route: ActivatedRoute, // Récupérer l'ID depuis la route
    private apiService: ApiService // Service pour récupérer le produit
  ) { }
  ngOnInit(): void {
    // Récupérer les données de la monture à partir de l'ID de la route
    this.route.paramMap.subscribe(params => {
      this.montureId = params.get('id'); // L'ID du produit est récupéré ici
      this.loadMonture();
    });
    this.loadCountQuantityMontures();
  }
  
  add_to_shop(montureId: string) {
    this.quantity+=1
    const new_basket: Basket = {
      montureId: montureId,
      quantity: this.quantity
    };
    this.apiService.postAddToOrder(new_basket).subscribe(response => {
      console.log('Réponse du serveur:', response);
    });
  }
  

  
  loadCountQuantityMontures() {
    // Charger la quantité actuelle dans le panier à partir de l'API
    this.apiService.getCountBasketByMonture(this.montureId).subscribe(response => {
      this.quantity = response.quantity;  // Mettre à jour la quantité à partir de la réponse de l'API
      console.log('Quantité récupérée du panier en BDD:', this.quantity);
    });
  }
  
  loadMonture(): void {
    this.apiService.getMonturesById(this.montureId).subscribe(
      (data) => {
        this.monture = data;
      },
      (error) => {
        console.error('Error loading monture:', error);
      }
    );
  }
  


}
